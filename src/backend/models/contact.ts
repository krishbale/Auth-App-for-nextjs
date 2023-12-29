import mongoose, { SchemaOptions } from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: { type: Date, default: Date.now },
    },
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
