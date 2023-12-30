import mongoose, { SchemaOptions } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.SECRECT_KEY!)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
  } catch (err) {
    console.log(err)
  }
}

let User:any;
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", userSchema);
}
export default User;
