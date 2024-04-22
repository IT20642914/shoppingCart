import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    ProductId: {
        type: String,
        required: true
    },
    CustomerID: {
        type: String,
        required: true
    },
    CustomerName: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    UnitPrice: {
        type: Number,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    DelivryAdddress:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Shoppingcarts", cartSchema);
