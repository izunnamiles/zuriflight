const mongoose = require('mongoose');

const FlightSchema = mongoose.Schema({
  title: String,
  time: String,
  price: Number,
  date: Date,
},
  {
    timestamps: true
  }
);



module.exports = mongoose.model('Flight', FlightSchema);