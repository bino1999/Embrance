const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const diaryController = require("../controllers/diaryController");

router.post("/diary-entry", catchErrors(diaryController.createDiaryEntry));
router.get("/diary-entries", catchErrors(diaryController.getAllDiaryEntries));
router.get("/diary-entry/:id", catchErrors(diaryController.getDiaryEntryById));
router.put("/diary-entry/:id", catchErrors(diaryController.updateDiaryEntryById));
router.delete("/diary-entry/:id", catchErrors(diaryController.deleteDiaryEntryById));
router.get("/entrys/:userId", catchErrors(diaryController.getDiaryEntriesByUserId)); // New route for fetching diary entries by user ID


module.exports = router;
