const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
UserSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email })
    if (exists) {
      throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = this.create({email, password: hash})
    return user
}


module.exports = mongoose.model("User",UserSchema);