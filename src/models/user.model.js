import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

const  UserModel= mongoose.models?.users || mongoose.model('users', UserSchema);

export default UserModel;