import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage, getTask, updateTask } from "../api";
import PageHeader from "../components/PageHeader";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let isActive = true;
    getTask(id)
      .then((loadedTask) => {
        if (isActive) setTask(loadedTask);
      })
      .catch((loadError: unknown) => {
        if (isActive) setError(getErrorMessage(loadError));
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-10 sm:px-8 lg:px-12">
      <PageHeader title="Edit task" />
      {!id ? (
        <p role="alert" className="text-red-700">
          A task ID is required.
        </p>
      ) : isLoading ? (
        <p role="status" className="text-[#737171]">
          Loading task...
        </p>
      ) : error ? (
        <div role="alert" className="space-y-4">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="font-medium text-[#974fd0] hover:underline"
          >
            Back to tasks
          </button>
        </div>
      ) : task ? (
        <TaskForm
          key={task._id}
          initialTask={{
            title: task.title,
            description: task.description,
            tag: task.tag,
          }}
          submitLabel="Save changes"
          onSubmit={async (updatedTask) => {
            await updateTask(task._id, updatedTask);
            navigate("/tasks", {
              state: { notice: "Task updated successfully." },
            });
          }}
        />
      ) : null}
    </main>
  );
};

export default EditTask;
