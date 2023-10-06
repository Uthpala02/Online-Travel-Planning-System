const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
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
  languages: {
    type: [String],
    required: true,
  },
  availability: {
    type: [String],
    required: true,
  },
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
