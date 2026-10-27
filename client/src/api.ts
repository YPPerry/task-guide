import type { Task, TaskInput } from "./types";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

interface ApiResponse<T> {
  task: T;
}

interface TasksResponse {
  tasks: Task[];
}

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await request<ApiResponse<Task>>("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return response.task;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await request<TasksResponse>("/tasks");
  return response.tasks;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await request<ApiResponse<Task>>(`/tasks/${id}`);
  return response.task;
};

export const updateTask = async (
  id: string,
  task: TaskInput,
): Promise<Task> => {
  const response = await request<ApiResponse<Task>>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
  return response.task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await request<{ message: string }>(`/tasks/${id}`, { method: "DELETE" });
};

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Something went wrong.";
};
