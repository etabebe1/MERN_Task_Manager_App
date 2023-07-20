const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: "String",
    trim: true,
    required: [true, "the name section is empty"],
    maxLength: [30, "name shouldn't exceed 20"],
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", TaskSchema);
