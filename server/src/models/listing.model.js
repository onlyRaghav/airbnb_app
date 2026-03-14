import mongoose from "mongoose"

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timeStamps: true
});

export default mongoose.model("listing", listingSchema);