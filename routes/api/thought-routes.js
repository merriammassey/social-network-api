const router = require("express").Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

//combine routes for api methods
// GET all thoughts at /api/thoughts
router.route("/").get(getAllThought);

// POST at /api/thoughts/:userId
router.route("/:userId").post(createThought);

// GET, DELETE, and UPDATE one Thought and POST Reaction at /api/thoughts/:userId/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//POST Reaction at /api/thoughts/:userId/:thoughtId
router.route("/:thoughtId/reactions").put(addReaction);

//DELETE Reaction at /api/thoughts/:userId/:thoughtId/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
