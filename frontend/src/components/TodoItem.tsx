import React from 'react';
import { Todo } from '../services/api';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
      </div>
      <div className="todo-actions">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id, todo.completed)}
        >
          {todo.completed && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 4L6 11L3 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        {!todo.completed && (
          <button className="delete-btn" onClick={() => onDelete(todo.id)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M3 5h14M8 5V3h4v2M6 5v12a2 2 0 002 2h4a2 2 0 002-2V5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
