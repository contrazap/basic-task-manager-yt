import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../features/tasks/tasksSlice";

// eslint-disable-next-line react/prop-types
const TaskList = ({ filter = "All" }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        id: editingTask,
        title: editTitle,
        description: editDescription,
        status: editStatus,
      })
    ).then(() => dispatch(fetchTasks()));
    setEditingTask(null);
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task._id} className="task-item">
          {editingTask === task._id ? (
            <form className="task-edit-form" onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Task title"
                value={editTitle}
                className="input-field"
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                placeholder="Task description"
                value={editDescription}
                className="input-field"
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <select
                className="dropdown"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value={"Pending"}>Pending</option>
                <option value={"In Progress"}>In Progress</option>
                <option value={"Completed"}>Completed</option>
              </select>
              <button type="submit">Save</button>
              <button
                className="cancel-btn"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <div className="task-item-content">
                <h3 className="task-item-title">{task.title}</h3>
                <p className="task-item-desc">{task.description}</p>
                <p className="task-item-status">{task.status}</p>
              </div>
              <div className="button-group">
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
