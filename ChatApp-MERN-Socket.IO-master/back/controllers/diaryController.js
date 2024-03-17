const mongoose = require("mongoose");
const DiaryEntry = mongoose.model("DiaryEntry");

// Create a new diary entry
exports.createDiaryEntry = async (req, res) => {
  const { user, entry, sentiment } = req.body;

  try {
    const newDiaryEntry = new DiaryEntry({
      user,
      entry,
      sentiment,
    });

    await newDiaryEntry.save();

    res.json({
      message: "Diary entry created successfully!",
      diaryEntry: newDiaryEntry,
    });
  } catch (error) {
    console.error('Error creating diary entry:', error.message);
    res.status(500).json({ message: "Failed to create diary entry" });
  }
};

// Get all diary entries
exports.getAllDiaryEntries = async (req, res) => {
  try {
    const diaryEntries = await DiaryEntry.find({}).populate("user", "name");
    res.json(diaryEntries);
  } catch (error) {
    console.error('Error fetching diary entries:', error.message);
    res.status(500).json({ message: "Failed to fetch diary entries" });
  }
};

// Get diary entry by ID
exports.getDiaryEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const diaryEntry = await DiaryEntry.findById(id).populate("user", "name");
    if (!diaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.json(diaryEntry);
  } catch (error) {
    console.error('Error fetching diary entry by ID:', error.message);
    res.status(500).json({ message: "Failed to fetch diary entry" });
  }
};

// Update diary entry by ID
exports.updateDiaryEntryById = async (req, res) => {
  const { id } = req.params;
  const { entry, sentiment } = req.body;

  try {
    const updatedDiaryEntry = await DiaryEntry.findByIdAndUpdate(
      id,
      { entry, sentiment },
      { new: true }
    );

    if (!updatedDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.json({
      message: "Diary entry updated successfully!",
      diaryEntry: updatedDiaryEntry,
    });
  } catch (error) {
    console.error('Error updating diary entry by ID:', error.message);
    res.status(500).json({ message: "Failed to update diary entry" });
  }
};

// Delete diary entry by ID
exports.deleteDiaryEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDiaryEntry = await DiaryEntry.findByIdAndDelete(id);
    if (!deletedDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.json({ message: "Diary entry deleted successfully!" });
  } catch (error) {
    console.error('Error deleting diary entry by ID:', error.message);
    res.status(500).json({ message: "Failed to delete diary entry" });
  }
};

exports.getDiaryEntriesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const diaryEntries = await DiaryEntry.find({ user: userId }).populate("user", "name");
    res.json(diaryEntries);
  } catch (error) {
    console.error('Error fetching diary entries by user ID:', error.message);
    res.status(500).json({ message: "Failed to fetch diary entries" });
  }
};

