const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "Title needs at last 3 chars"],
    },
    description: String,
    image: {
      type: String,
      required: [true, "image is required"],
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
      required: [true, "movie id is required"],
    },
  },
  { timestamp: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
