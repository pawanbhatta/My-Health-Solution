const router = require("express").Router();
const commentController = require("../controllers/commentController");
const isAuthenticated = require("../middlewares/auth");

// Create a question
router.post("/", isAuthenticated, commentController.create);

// Get all questions
// router.get("/", isAuthenticated, commentController.getAllQuestions);

// Update a question
router.put("/update/:id", isAuthenticated, commentController.update);

// Delete a question
router.delete("/delete/:id", isAuthenticated, commentController.delete);

// // Get all questions of a question
router.get(
  "/allQuestions/:qid",
  isAuthenticated,
  commentController.getCommentsOfQuestion
);

module.exports = router;
