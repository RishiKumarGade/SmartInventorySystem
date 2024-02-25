import mongoose from "mongoose";

const processchema = new mongoose.Schema({
  collaborativeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collaborative",
  },
  type: {
    type: String,
    required: [true, "please provide a Type"],
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      count:{
        type:Number,
      }
    },
  ],
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  toCreate:{
    type: String,
  },
  toCreateCount:{
    type: Number,
  },
  toCreatePrice:{
    type: Number,
  }
});

const Process =
  mongoose.models.processes || mongoose.model("processes", processchema);

export default Process;
