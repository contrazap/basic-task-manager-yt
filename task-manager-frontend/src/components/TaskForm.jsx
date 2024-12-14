import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, fetchTasks } from "../features/tasks/tasksSlice";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, description, status })).then(() => {
      dispatch(fetchTasks());
    });
    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        className="input-field"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        className="input-field"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="dropdown"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value={"Pending"}>Pending</option>
        <option value={"In Progress"}>In Progress</option>
        <option value={"Completed"}>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
