import React, { useState } from 'react';

interface TableOfContentsProps {
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ className = '' }) => {
  const [selectedItem, setSelectedItem] = useState<string>('File issues from screenshots');

  const menuItems = [
    'File issues from screenshots',
    'Let Agents handle routine work',
    'Use Spark to prototype live',
    'Choose the best model for the task',
    'Navigate conversation branches',
    'Combine web and IDE strategically',
    'Build your AI-native dev workflow',
    'Ready to try it?',
  ];

  return (
    <div className={`w-80 bg-white border-r border-gray-200 p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Table of Contents
      </h2>
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedItem(item)}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                selectedItem === item
                  ? 'bg-menu-highlight text-gray-900 border border-green-300'
                  : 'text-gray-700 hover:bg-menu-highlight-hover hover:text-gray-900'
              }
            `}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;