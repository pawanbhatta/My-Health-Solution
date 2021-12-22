const router = require("express").Router();
const questionController = require("../controllers/questionController");
const isAuthenticated = require("../middlewares/auth");

// Create a question
router.post("/", isAuthenticated, questionController.create);

// Get all questions
router.get("/", isAuthenticated, questionController.getAllQuestions);

// Delete a question
router.delete("/delete/:id", isAuthenticated, questionController.delete);

// // Get all questions of loggedIn person
router.get(
  "/allQuestions",
  isAuthenticated,
  questionController.getQuestionsOfPerson
);

module.exports = router;
