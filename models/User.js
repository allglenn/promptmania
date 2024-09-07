import { Schema,model,models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "user"
    },
    image: {
        type: String,
        default: "/images/default.jpg"
    }
}, {
    timestamps: true
});

export default models.User || model("User", userSchema);