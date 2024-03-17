const mongoose = require("mongoose");

const diaryEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    entry: {
      type: String,
      required: true
    },
    sentiment: {
      type: String,
      enum: ['Positive', 'Neutral', 'Negative'],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DiaryEntry", diaryEntrySchema);
