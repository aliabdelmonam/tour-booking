import Discount from "../models/discountModel.js";
import Tour from "../models/tourModel.js";
// import Booking from "../models/bookingModel.js";

// Create a new discount
export const createDiscount = async (req, res) => {
  try {
    const {
      code,
      type,
      value,
      startDate,
      endDate,
      discountType,
      eligibleUsers,
      applicableTours,
      usageLimit,
    } = req.body;

    // Check if discount code already exists
    const existingDiscount = await Discount.findOne({ code });
    if (existingDiscount) {
      return res.status(400).json({
        status: "fail",
        message: "Discount code already exists",
      });
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        status: "fail",
        message: "Start date must be before end date",
      });
    }
    
    if(Date.now() > new Date(endDate)){
      return res.status(400).json({
        status: "fail",
        message: "End date must be after current date",
      });
    }

    const newDiscount = await Discount.create({
      code,
      type,
      value,
      startDate,
      endDate,
      discountType,
      eligibleUsers,
      applicableTours,
      usageLimit,
    });

    res.status(201).json({
      status: "success",
      data: {
        discount: newDiscount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


export const validateDiscount = async (req, res) => {
  try {
    const { discountCode, tourId, userId } = req.body;

    const discount = await validateDiscountHelper(discountCode, tourId, userId);

    res.status(200).json({
      status: "success",
      data: {
        discount,
        isValid: true,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const validateDiscountHelper = async (discountCode, tourId, userId) => {
  const discount = await Discount.findOne({ code: discountCode });

  if (!discount) {
    throw new Error("Discount code not found");
  }

  const now = new Date();
  if (now < discount.startDate || now > discount.endDate) {
    throw new Error("Discount code has expired or not yet active");
  }

  if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
    throw new Error("Discount usage limit reached");
  }

  if (discount.discountType === "tour-specific" && discount.applicableTours.length > 0) {
    if (!discount.applicableTours.includes(tourId)) {
      throw new Error("Discount not applicable for this tour");
    }
  }

  if (discount.discountType === "user-specific" && discount.eligibleUsers.length > 0) {
    if (!discount.eligibleUsers.includes(userId)) {
      throw new Error("Discount not applicable for this user");
    }
  }

  if (discount.discountType === "user-and-tour-specific" && discount.eligibleUsers.length > 0 && discount.applicableTours.length > 0) {
    if (!discount.eligibleUsers.includes(userId) || !discount.applicableTours.includes(tourId)) {
      throw new Error("Discount not applicable for this user and tour combination");
    }
  }

  return discount;
};

// (Not completed : Waiting for tour module to be completed)
// Apply discount to a tour price (not modifying the tour, just calculating)
export const applyDiscount = async (req, res) => {
  try {
    const { discountCode, tourId, userId } = req.body;

    // Validate the discount
    const discount = await validateDiscountHelper(discountCode, tourId, userId);

    // Find the tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }
    
    
    // Calculate discounted price
    let discountedPrice = tour.originalPrice;
    if (discount.type === "percentage") {
      discountedPrice = tour.originalPrice * (1 - discount.value / 100);
    } else if (discount.type === "fixed") {
      discountedPrice = Math.max(0, tour.originalPrice - discount.value);
    }
    
    // tour.updateDiscountCode(discount.code);
    // tour.updateFinalPrice(discountedPrice);
    
    tour.discountCode = discount.code;
    tour.finalPrice = discountedPrice;
    await tour.save();

    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
        originalPrice: tour.originalPrice,
        discountedPrice: discountedPrice,
        discount: discount,
        savings: tour.originalPrice - discountedPrice,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all discounts
export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json({
      status: "success",
      results: discounts.length,
      data: {
        discounts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a specific discount
export const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({
        status: "fail",
        message: "No discount found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// (Not completed : Waiting for tour module to be completed)
// Update discount
export const updateDiscount = async (req, res) => {
  try {
    // Prevent changing the discount code if already in use
    // if (req.body.code) {
    //   const discount = await Discount.findById(req.params.id);
    //   if (discount && discount.usageCount > 0) {
    //     return res.status(400).json({
    //       status: "fail",
    //       message:
    //         "Cannot change discount code for discounts that have been used",
    //     });
    //   }
    // }

    // Update the updatedAt field to the current date
    req.body.updatedAt = new Date();
    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        status: "fail",
        message: "No discount found with that ID",
      });
    }
    
    // Check if the discount code has been used in a tour so we must edit the new price and update the usage count
    const tours = await Tour.find({ discountCode: req.body.code });
    if (tours.length > 0) {
      for (const tour of tours) {
        if (req.body.type === "percentage") {
          tour.finalPrice = tour.originalPrice * (1 - req.body.value / 100);
        } else if (req.body.type === "fixed") {
          tour.finalPrice = Math.max(0, tour.originalPrice - req.body.value);
        }
        await tour.save();
      }
    }

    res.status(200).json({
      status: "success",
      discount: {
        discount: updatedDiscount,
      },
      tours: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// (Not completed : Waiting for tour module to be completed)
// Delete discount
export const deleteDiscount = async (req, res) => {
  try {
    // Check if discount has been used in active bookings
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({
        status: "fail",
        message: "No discount found with that ID",
      });
    }

    /**
     *  
        // Optional: Check if discount is used in active bookings
        if (discount.usageCount > 0) {
          // We might want to check for active bookings using this discount
          const activeBookings = await Booking.find({ // Assuming we have a Booking model
            appliedDiscount: req.params.id,
            status: { $nin: ["completed", "cancelled"] },
          });

          if (activeBookings.length > 0) {
            return res.status(400).json({
              status: "fail",
              message: "Cannot delete discount that is used in active bookings",
            });
          }
        }
     */

    // Check if the discount code has been used in a tour so we must edit the new price and remove the id from tour
    const tours = await Tour.find({ discountCode: req.body.code });
    if (tours.length > 0) {
      for (const tour of tours) {
        tour.discountCode = null; // Remove the discount ID from the tour
        tour.finalPrice = tour.originalPrice; // Reset the final price to the original price
        await tour.save();
      }
    }
    
    // await Discount.findByIdAndDelete(req.params.id);
    // we will not delete the discount but we will set its end date to the current date and set the usage count to 0
    discount.endDate = new Date();
    await discount.save();

    res.status(200).json({
      status: "success",
      data: {
        discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateDiscountUsage = async (req, res) => {
  try {
    const { discountCode } = req.body;

    // Find the discount
    const discount = await Discount.findOne({ code: discountCode });
    if (!discount) {
      return res.status(404).json({
        status: "fail",
        message: "Discount not found",
      });
    }

    // Increment the usage count
    discount.usageCount += 1;
    await discount.save();

    res.status(200).json({
      status: "success",
      data: {
        discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}
