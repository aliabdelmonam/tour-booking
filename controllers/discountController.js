import Discount from "../models/discountModel.js";
// const Tour = require("../models/tourModel"); // Assuming you have a Tour model
// const Booking = require("../models/bookingModel"); // Assuming you have a Booking model

// Create a new discount
export const createDiscount = async (req, res) => {
  try {
    const {
      code,
      type,
      value,
      startDate,
      endDate,
      createdAt,
      updatedAt,
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

    const newDiscount = await Discount.create({
      code,
      type,
      value,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      discountType,
      eligibleUsers,
      applicableTours,
      usageLimit,
      usageCount: 0,
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

// Validate if a discount can be applied
export const validateDiscount = async (req, res) => {
  try {
    const { code, tourId, userId } = req.body;

    const discount = await Discount.findOne({ code });

    // Check if discount exists
    if (!discount) {
      return res.status(404).json({
        status: "fail",
        message: "Discount code not found",
      });
    }

    // Check validity period
    const now = new Date();
    if (now < discount.startDate || now > discount.endDate) {
      return res.status(400).json({
        status: "fail",
        message: "Discount code has expired or not yet active",
      });
    }

    // Check usage limit
    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
      return res.status(400).json({
        status: "fail",
        message: "Discount usage limit reached",
      });
    }

    // Check if tour is eligible
    if (discount.applicableTours && discount.applicableTours.length > 0) {
      if (!discount.applicableTours.includes(tourId)) {
        return res.status(400).json({
          status: "fail",
          message: "Discount not applicable for this tour",
        });
      }
    }

    // Check if user is eligible (if user-specific discount)
    if (discount.discountType === "user-specific" && discount.eligibleUsers) {
      if (!discount.eligibleUsers.includes(userId)) {
        return res.status(400).json({
          status: "fail",
          message: "Discount not applicable for this user",
        });
      }
    }

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

// Apply discount to a tour price (not modifying the tour, just calculating)

// export const applyDiscount = async (req, res) => {
//   try {
//     const { tourId, discountCode } = req.body;

//     // Find tour and discount
//     const tour = await Tour.findById(tourId); // Assuming Tour model is imported
//     const discount = await Discount.findOne({ code: discountCode });

//     if (!tour || !discount) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Tour or discount not found",
//       });
//     }

//     // Calculate discounted price
//     let discountedPrice = tour.price;
//     if (discount.type === "percentage") {
//       discountedPrice = tour.price * (1 - discount.value / 100);
//     } else if (discount.type === "fixed") {
//       discountedPrice = Math.max(0, tour.price - discount.value);
//     }

//     // We don't modify the tour price in the database
//     // We just return the calculated discounted price but we will update the Final price in the tour later

//     res.status(200).json({
//       status: "success",
//       data: {
//         tour: tour,
//         originalPrice: tour.price,
//         discountedPrice: discountedPrice,
//         discount: discount,
//         savings: tour.price - discountedPrice,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

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

// Update discount
export const updateDiscount = async (req, res) => {
  try {
    // Prevent changing the discount code if already in use
    if (req.body.code) {
      const discount = await Discount.findById(req.params.id);
      if (discount && discount.usageCount > 0) {
        return res.status(400).json({
          status: "fail",
          message:
            "Cannot change discount code for discounts that have been used",
        });
      }
    }

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

    res.status(200).json({
      status: "success",
      data: {
        discount: updatedDiscount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

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

    await Discount.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
