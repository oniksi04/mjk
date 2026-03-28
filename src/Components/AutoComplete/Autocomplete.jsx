import React from 'react';
import './Autocomplete.css';

/**
 * Filters items whose name starts with the query (case-insensitive).
 * "ce" → "Celta Vigo" ✓, "Barcelona" ✗
 */
const filterSuggestions = (items, query) => {
  const q = query.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().split(' ').some(word => word.startsWith(q))
  ).slice(0, 5);
};

const Autocomplete = ({ value, onChange, suggestions, onSelect, onSubmit, allData, placeholder }) => {

  const handleInternalSubmit = (e) => {
    e.preventDefault();
    onSubmit(e); // parent handles invalid check and toast
  };

  return (
    <form onSubmit={handleInternalSubmit} className="ac-form">
      <div className="ac-input-group">
        <input
          className="ac-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Start typing..."}
          autoComplete="off"
        />
        <button type="submit" className="ac-submit-btn" disabled={!value}>
          Submit
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="ac-suggestions">
          {suggestions.map((item) => (
            <li
              key={item.id || item.name}
              className="ac-suggestion-item"
              onClick={() => onSelect(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export { filterSuggestions };
export default Autocomplete;