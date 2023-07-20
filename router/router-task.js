const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
  deleteAll,
  editTask

} = require("../controller/controller-task");

router.route("/").get(getAllTask).post(createTask).delete(deleteAll);
router.route("/:id").patch(updateTask).get(getSingleTask).delete(deleteTask).put(editTask);

module.exports = router;
