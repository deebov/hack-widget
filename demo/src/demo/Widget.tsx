import { useState } from 'react';
import Chat from './Chat';
import React from 'react';

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <img
        src="https://storage.googleapis.com/ultimatedemo/custom/hackathon/group_8.jpg"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="widget-btn"
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="widget-container">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Widget;
