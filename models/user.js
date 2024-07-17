const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true },
  age: { type: Number, required: true },
  address: AddressSchema,
  password: { type: String }
});

UserSchema.index({ name: 1, email: 1 });

const UserModel = model('User', UserSchema);

module.exports = UserModel;
