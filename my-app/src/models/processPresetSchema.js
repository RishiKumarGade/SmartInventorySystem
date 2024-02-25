import mongoose from "mongoose";

const processPresetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "please provide a Type"],
  },
  items: [
    {
      type: {
        type: String,
      },
      count:{
        type:Number,
      }
    },
  ],
  toCreate: {
    type: String,
    required: [true, "please provide a Type"]
  },
});

const ProcessPreset =
  mongoose.models.processpresets || mongoose.model("processpresets", processPresetSchema);

export default ProcessPreset;
