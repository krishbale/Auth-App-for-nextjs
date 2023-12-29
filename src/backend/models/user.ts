import mongoose, { SchemaOptions } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'author'],
    required: true
  },

  date: {
    type: Date,
    Default: Date.now
  },

  tokens: [
    {
      token: {
        type: String,
        required: true

      }

    }

  ]

})



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

const User = mongoose.models.User 
|| mongoose.model('USER', userSchema)
export default User
