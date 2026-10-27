import { useState, type FormEvent } from "react";
import { TASK_TAGS, type TaskInput } from "../types";

interface TaskFormProps {
  initialTask?: TaskInput;
  submitLabel: string;
  onSubmit: (task: TaskInput) => Promise<void>;
}

const fieldClass =
  "w-full rounded-md border border-[#b8b6b6] bg-white px-5 py-4 text-base text-[#292929] outline-none transition focus:border-[#974fd0] focus:ring-2 focus:ring-[#974fd0]/20";

const TaskForm = ({
  initialTask,
  submitLabel,
  onSubmit,
}: TaskFormProps) => {
  const [form, setForm] = useState<TaskInput>(
    initialTask ?? { title: "", description: "", tag: TASK_TAGS[0] },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not save your task. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col items-start gap-6 rounded-xl border border-[#e5e1e8] bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="w-full">
        <label htmlFor="title" className="mb-2 block font-medium text-[#292929]">
          Task title
        </label>
        <input
          id="title"
          type="text"
          className={fieldClass}
          placeholder="e.g. Project defence, assignment"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
          maxLength={120}
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="description"
          className="mb-2 block font-medium text-[#292929]"
        >
          Description
        </label>
        <textarea
          id="description"
          className={fieldClass}
          placeholder="Briefly describe your task"
          rows={5}
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          maxLength={1000}
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="tag" className="mb-2 block font-medium text-[#292929]">
          Priority
        </label>
        <select
          id="tag"
          className={fieldClass}
          value={form.tag}
          onChange={(event) =>
            setForm((current) => ({ ...current, tag: event.target.value }))
          }
          required
        >
          {TASK_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#974fd0] py-3.5 font-medium text-white transition hover:bg-[#803db8] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-44"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
