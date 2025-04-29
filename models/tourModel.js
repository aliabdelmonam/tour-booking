import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name']
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description']
  },
  startingDate: {
    type: Date,
    required: [true, 'A tour must have a starting date']
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxUsers: {
    type: Number,
    required: [true, 'A tour must have a maximum number of users']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  originalPrice: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  finalPrice: {
    type: Number,
    required: [true, 'A tour may have two prices: before and after discount']
  },
  discountCode: {
    type: String,
    required: [true, 'A tour must have a discount ID']
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A tour must have a guide']
  }
});

// Method to update the tour name
tourSchema.methods.updateName = function (name) {
  this.name = name;
  return this.save();
};

// Method to update the tour description
tourSchema.methods.updateDescription = function (description) {
  this.description = description;
  return this.save();
};

// Method to update the starting date of the tour
tourSchema.methods.updateStartingDate = function (startingDate) {
  this.startingDate = startingDate;
  return this.save();
};

// Method to update the duration of the tour
tourSchema.methods.updateDuration = function (duration) {
  this.duration = duration;
  return this.save();
};

// Method to update the max users for the tour
tourSchema.methods.updateMaxUsers = function (maxUsers) {
  this.maxUsers = maxUsers;
  return this.save();
};

// Method to update the ratings average
tourSchema.methods.updateRatingsAverage = function (ratingsAverage) {
  this.ratingsAverage = ratingsAverage;
  return this.save();
};

// Method to update the original price of the tour
tourSchema.methods.updateOriginalPrice = function (originalPrice) {
  this.originalPrice = originalPrice;
  return this.save();
};

// Method to update the final price after a discount
tourSchema.methods.updateFinalPrice = function (finalPrice) {
  this.finalPrice = finalPrice;
  return this.save();
};

// Method to update the discount ID
tourSchema.methods.updateDiscountCode = function (discountCode) {
  this.discountCode = discountCode;
  return this.save();
};

// Method to update the guide (if needed)
tourSchema.methods.updateGuide = function (guideId) {
  this.guide = guideId;
  return this.save();
};

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
