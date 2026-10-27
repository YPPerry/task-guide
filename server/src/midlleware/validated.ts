// validated.ts CHECKS THAT :id IN THE URL IS A VALID MONGODB TO

import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

// RUNS BEFORE THE CONTROLLER ON ROUTES
// VALID ID --> call nex() THE CONTROLLER RUN
// INVALID ID --> STOP HERE AND SEND A 400 (BAD REQUEST)

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: `Invalid task ID:${id}` });
    return;
  }
  next();
};
