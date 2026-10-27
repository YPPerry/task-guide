import PageHeader from "../components/PageHeader";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api";

const NewTask = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-10 sm:px-8 lg:px-12">
      <PageHeader title="Create a task" />
      <TaskForm
        submitLabel="Create task"
        onSubmit={async (task) => {
          await createTask(task);
          navigate("/tasks", { state: { notice: "Task created successfully." } });
        }}
      />
    </main>
  );
};

export default NewTask;
