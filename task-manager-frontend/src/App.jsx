import "./App.css";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <div className="content-wrapper">
        <TaskForm />
        <TaskFilter />
      </div>
    </div>
  );
}

export default App;
