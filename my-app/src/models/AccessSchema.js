import mongoose from 'mongoose';

const accessSchema = new mongoose.Schema({
    collaborativeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborative",
      },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
})

const Access = mongoose.models.accesses || mongoose.model('accesses',accessSchema);

export default Access;
