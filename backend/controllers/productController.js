import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            startTime,
            endTime,
            ageMin,
            ageMax,
            pricePerSession,
            priceFullCourse,
            priceEarlyBird,
            priceHalfDay,
            priceFullDay
        } = req.body;

        // Parse the dates from the request
        const date = new Date(req.body.date);
        const endDate = req.body.endDate ? new Date(req.body.endDate) : null;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            date,
            endDate,
            time: {
                startTime,
                endTime
            },
            location,
            age: {
                min: Number(ageMin),
                max: Number(ageMax)
            },
            price: {
                perSession: pricePerSession ? Number(pricePerSession) : undefined,
                fullCourse: priceFullCourse ? Number(priceFullCourse) : undefined,
                earlyBird: priceEarlyBird ? Number(priceEarlyBird) : undefined,
                halfDay: priceHalfDay ? Number(priceHalfDay) : undefined,
                fullDay: priceFullDay ? Number(priceFullDay) : undefined
            },
            image: imagesURL
        }

        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        await productModel.findByIdAndDelete(productId);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }