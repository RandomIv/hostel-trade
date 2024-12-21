import React from 'react';
const DropdownInput = ({ name, label, data, handleInputChange }) => {
  return (
    <>
      <select
        name={name}
        value={label}
        onChange={handleInputChange}
        style={{
          padding: '8px',
          width: '100%',
          borderRadius: '10px',
          border: '1px solid #ccc',
        }}
      >
        {data.map((item, index) => (
          <option key={index} value={item.number}>
            {item.number}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropdownInput;
