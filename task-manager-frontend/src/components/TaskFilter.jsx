import { useState } from "react";
import TaskList from "./TaskList";

const TaskFilter = () => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="task-filter-container">
      <div className="task-filter-actions">
        <select
          className="dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="clear-btn" onClick={() => setFilter("All")}>
          Clear Filters
        </button>
      </div>
      <TaskList filter={filter} />
    </div>
  );
};

export default TaskFilter;
