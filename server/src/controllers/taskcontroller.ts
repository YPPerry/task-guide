// TaskControllers.ts - THE LOGIC FOR EACH TASK ENDPOINT
// EACH FUNCTION FOLLOWS THE SAME SIMPLE FLOW
// 1. READ WHAT WE NEED FROM THE REQUEST (req.body/req.params)
// 2. ASK THE DATABASE (THROUGH THE TASK MODEL)
// 3. SEND BACK A RESPONSE WITH A STATUS CODE +JSON
// STATUS CODES THAT MIGHT BE USED:

import { Request, Response } from "express";
import Task from "../Models/TaskModel";
// POST - CREATE A NEW TASK
export const createTask = async (req: Request, res: Response) => {
  // 1.Put in the fields/keys into the req.body
  const { title, description, tag } = req.body;
  if (!title || !description || !tag) {
    res.status(400).json({ message: "All fields must be filled." });
    return;
  }
  const task = await Task.create({ title, description, tag });

  res.status(201).json({ message: "Task created successfully.", task });
};

// GET -> EVERY TASK

export const getAllTask = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
};

// PATCH -> UPDATE A TASK
export const updateTask = async (req: Request, res: Response) => {
  const { title, description, tag } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      tag,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!task) {
    res.status(404).json({ message: "Task not found." });
    return;
  }
  res.status(200).json({ message: "Task updated successfully", task });
};
// DELETE->DELETE A TASK
export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(200).json({ message: "Task deleted successfully" });
};
// GET-> GET ONE TASK

export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(200).json({ task });
};
