import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { todoAPI, Todo } from '../services/api';
import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';
import AddTodoButton from '../components/AddTodoButton';
import ThemeToggle from '../components/ThemeToggle';
import './Home.css';

type FilterType = 'all' | 'active' | 'completed';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { logout, user } = useAuth();

  const fetchTodos = async () => {
    try {
      const data = await todoAPI.getTodos(filter);
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      await todoAPI.updateTodo(id, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoAPI.deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await todoAPI.createTodo(newTodoTitle);
      setNewTodoTitle('');
      setShowAddModal(false);
      fetchTodos();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Simple To Do List</h1>
        <div className="header-actions">
          <ThemeToggle />
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <div className="todos-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>

      <div className="bottom-nav">
        <button className="nav-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="18" cy="6" r="2" fill="currentColor" />
          </svg>
        </button>
        <AddTodoButton onClick={() => setShowAddModal(true)} />
        <button className="nav-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Todo</h2>
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                autoFocus
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
