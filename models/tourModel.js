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
    required: [true, 'A tour may have two prices befor , after discount']
  },
  discountID: {
    type: String,
    required: [true, 'A tour may have a discount with id']
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A tour must have a guide']
  }
});



const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
