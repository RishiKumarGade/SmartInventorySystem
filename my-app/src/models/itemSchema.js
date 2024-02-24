import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    collaborativeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborative",
    },
    type:{
        type:String,
        required:true,
    },
    isRaw:{
        type:Boolean,
        default:true,
    },
    weight:{
        type:String
    },
    height:{
        type:String
    },
    price:{
        type:Number
    },

})

const Item = mongoose.models.items || mongoose.model('items',itemSchema);

export default Item;
