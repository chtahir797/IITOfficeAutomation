import React, { useState } from "react";

export function ImagePopup ({ imageUrl, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoom = (amount) => {
    const newZoom = Math.min(Math.max(zoomLevel + amount, 0.1), 2);
    setZoomLevel(newZoom);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="max-w-3xl mx-auto p-6 rounded-lg bg-white overflow-hidden"
        style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.3s" }}
        onWheel={(e) => {
          e.preventDefault();
          const scrollAmount = e.deltaY > 0 ? -0.1 : 0.1;
          handleZoom(scrollAmount);
        }}
      >
        <img
          src={imageUrl}
          alt="Large Preview"
          className="w-full h-auto max-h-96 object-contain cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleZoom(0.2);
          }}
        />
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-4 py-2 text-white font-light tracking-wider bg-red-500 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export const Navigate = ({ handleNextPage, handlePreviousPage, showNextButton, showPreviousButton }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {showNextButton && (
        <button
          className="px-4 py-1 mr-2 text-white font-light tracking-wider bg-gray-900 rounded"
          type="button"
          onClick={handleNextPage}
        >
          Next
        </button>
      )}
      {showPreviousButton && (
        <button
          className="px-4 py-1 ml-2 text-white font-light tracking-wider bg-gray-900 rounded"
          type="button"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
      )}
    </div>
  );
};



export function SearchAndFilter({ searchText, onSearchTextChange, filterDate, onFilterDateChange }) {
  return (
    <div className="flex mt-3 mb-3">
      <input
        className="w-full px-4 py-2 mr-4 text-gray-700 bg-gray-200 rounded"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
        type="date"
        value={filterDate ? new Date(filterDate).toISOString().split('T')[0] : ''}
        onChange={(e) => onFilterDateChange(e.target.value)}
      />
    </div>
  );
}