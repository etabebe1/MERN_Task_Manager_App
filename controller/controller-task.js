const taskModel = require("../models/model-task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/error");

const getAllTask = asyncWrapper(async (req, res) => {
  const task = await taskModel.find({});
  // response
  res.status(200).json({ success: true, data: { nbHits: task.length, task } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await taskModel.create(req.body);
  // response
  res.status(200).json({ success: true, data: { task } });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await taskModel.findOne({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Cannot found an item with id  ${taskID}`, 404)
    );

    // const error = new Error("Not Found");
    // error.status = 404;
    // return next(error);
    //
    //
    // return res.status(404).json({
    //   msg: `Cannot found an item with id ${taskID}`,
    // });
  } else {
    res.status(200).json({ task });
  }
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.deleteOne({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Cannot found an item with id ${taskID}`, 404)
    );
  } else {
    res.status(200).json({ success: true, data: { task } });
  }
});

const deleteAll = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.deleteAll({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Cannot found an item with id ${taskID}`, 404)
    );
  } else {
    res.status(200).json({ task });
  }
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`Cannot found an item with id ${taskID}`, 404)
    );
  } else {
    res.status(200).json(task);
  }
});

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  if (!task) {
    return next(
      createCustomError(`Cannot found an item with id ${taskID}`, 404)
    );
  } else {
    res.status(200).json(task);
  }
});

module.exports = {
  getAllTask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAll,
  editTask,
};
