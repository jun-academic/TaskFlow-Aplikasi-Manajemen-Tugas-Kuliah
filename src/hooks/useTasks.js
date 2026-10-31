import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import initialTasks from "../data/initialTasks";

const TasksContext = createContext(null);

const STORAGE_KEY = "taskflow_tasks";

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem(STORAGE_KEY);

            return savedTasks
                ? JSON.parse(savedTasks)
                : initialTasks;
        } catch (error) {
            console.error("Gagal membaca data tugas:", error);
            return initialTasks;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(tasks)
            );
        } catch (error) {
            console.error("Gagal menyimpan data tugas:", error);
        }
    }, [tasks]);

    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            ...taskData,
        };

        setTasks((currentTasks) => [
            ...currentTasks,
            newTask,
        ]);
    };

    const updateTask = (id, updatedData) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, ...updatedData }
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

function useTasks() {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error(
            "useTasks harus digunakan di dalam TasksProvider"
        );
    }

    return context;
}

export default useTasks;