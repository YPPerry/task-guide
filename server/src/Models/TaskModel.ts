// task.ts-- WHAT A TASK LOOKS LIKE IN THE DATABASE

import { model, Schema } from "mongoose";

export const TASK_TAGS = ["Urgent", "Important"];
//flow
//1.describe the task's shape with a typescript interface
//2.describe the same shape with a mongoose schema
//3.create the model- the object we use to create/find/update/delete tasks.
// step 1:the ts shape of a task

export interface ITask {
  title: string;
  description: string;
  tag: string;
}

// step 2:the database structure and rules for a task
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    tag: {
      type: String,
      required: [true, "Priority is required"],
      enum: { values: TASK_TAGS, message: "Priority must be Urgent or Important." },
    },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt
);
// step 3:the model."Task" becomes the "tasks" collection in mongodb

const Task = model<ITask>("Task", taskSchema);

export default Task;
