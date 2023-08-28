import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: "https://static.animecorner.me/2023/01/onimai-episode-2-1.jpg"
    },
    bio:{
        type: String,
        maxLength: 100
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    blue:{
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: "dummy_string"
    },
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;