import Tour from "../models/tourModel.js";
import axios from "axios";
import User from "../models/userModel.js";

export async function createTour(req, res)  {

  try {
    const tour = await Tour.create(req.body);
    const { name, description, duration, price, guide } = req.body;
    const mongoId = tour._id.toString();
    try {
        const guideName = await User.findById(guide).select('name');
        // console.log("guide Name",guideName.name);
        await axios.post("http://localhost:8000/upsert_tour", {
          name: name,
          description: description,
          duration: duration,
          price: price,
          guide: guideName.name,
          tour_id: mongoId
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "fail",
            message: "Failed to create tour in Pinecone",
        });
    }
    res.status(201).json({
      status: 'success',
      data: { tour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}


export async function getAllTours(req, res) {  //all tours
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}


export async function getTour(req, res) {//single tour
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      throw new Error("No tour found with that ID");
    }
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}


export async function deleteTour(req, res) {//delete by id 
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      throw new Error("No tour found with that ID");
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}

