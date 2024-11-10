'use client'
import { getTodos, createTodo, deleteTodoById, updateTodoById } from '@/app/services/todoActions';
import { ITodo } from '@/app/types/ITodo';
import React, { useState, useEffect } from 'react';


//למה טודוס לא נותן מאפ
const page: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]|Partial<ITodo>[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos||[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // In case of error, set an empty array
    }
  };

  const handleCreateTodo = async (task: string) => {
    console.log("task in create",task);
    const newTodo: Partial<ITodo> = { task }; // No completed status
    const createdTodo = await createTodo(task); // Use createTodo from actions
    console.log("created todo 1",createdTodo);

    if (createdTodo) {
    console.log("created todo 2",createdTodo);
      setTodos([...todos, createdTodo]);
      setNewTask('');
    }
  };

  const handleUpdateTodo = async (id: string, newTask: string) => {
    const updatedTodo = await updateTodoById(id, { task: newTask });
    if (updatedTodo) {
      setTodos(todos.map(todo => String(todo._id) == id ? updatedTodo : todo));
      setEditingId(null);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const deletedTodo = await deleteTodoById(id);
    if (deletedTodo) {
      setTodos(todos.filter(todo => String(todo._id) !== id));
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6">
      <div className="w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-bold text-yellow-700 flex justify-center items-center">
          🐥 My Duck-Themed Todo List 🐥
        </h1>
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border-2 border-yellow-500 rounded-md focus:outline-none focus:ring focus:border-yellow-600"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTask.trim()) handleCreateTodo(newTask.trim());
            }}
            onBlur={() => newTask.trim() && handleCreateTodo(newTask.trim())}
          />
          <button
            className="absolute right-3 top-2 text-yellow-700 font-bold text-xl"
            onClick={() => newTask.trim() && handleCreateTodo(newTask.trim())}
          >
            +
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={String(todo._id)} className="flex items-center space-x-2">
              <span className="text-2xl">🦆</span>
              {editingId ==String(todo._id) ? (
                <input
                  type="text"
                  className="flex-1 p-1 border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-600"
                  value={todo.task}
                  onChange={(e) =>
                    setTodos(todos.map(t => (t._id === todo._id ? { ...t, task: e.target.value } : t)))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateTodo(String(todo._id) , todo.task);
                  }}
                  onBlur={() => handleUpdateTodo(String(todo._id) , todo.task)}
                />
              ) : (
                <span
                  className="flex-1"
                  onClick={() => setEditingId(String(todo._id) )}
                >
                  {todo.task}
                </span>
              )}

              <button
                onClick={() => handleDeleteTodo(String(todo._id) )}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
