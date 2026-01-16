import React from 'react';
import './AddTodoButton.css';

interface AddTodoButtonProps {
  onClick: () => void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onClick }) => {
  return (
    <button className="add-btn" onClick={onClick}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <line
          x1="16"
          y1="8"
          x2="16"
          y2="24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="16"
          x2="24"
          y2="16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default AddTodoButton;
