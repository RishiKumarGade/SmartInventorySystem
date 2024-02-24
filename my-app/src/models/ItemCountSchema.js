import mongoose from 'mongoose';

const itemCountSchema = new mongoose.Schema({
    collaborativeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborative",
      },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
    },
    count:{
        type:Number,
        default:1,
    },
})

const ItemCount = mongoose.models.itemcounts || mongoose.model('itemcounts',itemCountSchema);

export default ItemCount;
