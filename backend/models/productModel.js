import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: { type: Array, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true }, // Start date
    endDate: { type: Date }, // End date (optional)
    time: {
        startTime: { type: String, required: true }, // Format: "HH:MM" (24-hour)
        endTime: { type: String, required: true }    // Format: "HH:MM" (24-hour)
    },
    location: { type: String, required: true },
    age: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    price: {
        perSession: { type: Number },
        fullCourse: { type: Number },
        earlyBird: { type: Number },
        halfDay: { type: Number },
        fullDay: { type: Number }
    },
    description: { type: String, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;