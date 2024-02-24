import mongoose from 'mongoose';

const collaborativeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'please provide a id'],
        ref:'User'
    },
    readWriteAccess:[{userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'}}]

})

const Collaborative = mongoose.models.collaboratives || mongoose.model('collaboratives',collaborativeSchema);

export default Collaborative;
