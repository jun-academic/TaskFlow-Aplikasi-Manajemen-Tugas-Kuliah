import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { TasksProvider } from "./hooks/useTasks";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  );
}

export default App;