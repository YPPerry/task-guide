import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteTask, getErrorMessage, getTasks } from "../api";
import type { Task } from "../types";

const MyTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;

  useEffect(() => {
    let isActive = true;
    getTasks()
      .then((loadedTasks) => {
        if (isActive) setTasks(loadedTasks);
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
  }, []);

  const handleDelete = async (id: string) => {
    setError("");
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-5 py-10 sm:px-8 lg:px-12">
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-semibold text-[#292929] sm:text-4xl">
          My Tasks
        </h1>
        <Link
          to="/new"
          className="flex items-center gap-2 font-medium text-[#974fd0] hover:text-[#803db8]"
        >
          <IoMdAdd className="text-2xl" aria-hidden="true" />
          <span className="text-lg">Add New Task</span>
        </Link>
      </div>

      {notice && (
        <p
          role="status"
          className="w-full rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800"
        >
          {notice}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
        >
          {error}
        </p>
      )}

      <section aria-label="Task list" className="flex w-full flex-col gap-4">
        {isLoading ? (
          <p role="status" className="text-[#737171]">
            Loading your tasks...
          </p>
        ) : tasks.length === 0 ? (
          <div className="w-full rounded-xl border border-dashed border-[#c9c3cf] px-6 py-12 text-center">
            <h2 className="text-xl font-medium text-[#292929]">No tasks yet</h2>
            <p className="mt-2 text-[#737171]">
              Create your first task and keep everything in one place.
            </p>
            <Link
              to="/new"
              className="mt-5 inline-flex rounded-lg bg-[#974fd0] px-5 py-3 font-medium text-white hover:bg-[#803db8]"
            >
              Create a task
            </Link>
          </div>
        ) : (
          tasks.map((task) => (
            <article
              key={task._id}
              className="w-full rounded-xl border border-[#e5e1e8] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#e5e1e8] pb-4 sm:flex-row sm:items-center">
                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                    task.tag === "Urgent"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {task.tag}
                </span>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/edit/${task._id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#974fd0] px-4 py-2 font-medium text-white hover:bg-[#803db8]"
                    aria-label={`Edit ${task.title}`}
                  >
                    <FaRegEdit aria-hidden="true" />
                    <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDelete(task._id)}
                    disabled={deletingId === task._id}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#974fd0] px-4 py-2 font-medium text-[#974fd0] hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`Delete ${task.title}`}
                  >
                    <FaRegTrashCan aria-hidden="true" />
                    <span>
                      {deletingId === task._id ? "Deleting..." : "Delete"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-semibold text-[#292929] sm:text-2xl">
                  {task.title}
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-[#737171]">
                  {task.description}
                </p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default MyTask;
