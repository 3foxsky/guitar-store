import React from 'react';

const Input = ({onChange, onBlur, onFocus, type, name, value, placeholder}) => {
  return (
    <div class="formBlock">
      <input 
        name={name}
        type={type} 
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder} 
        value={value}
      />
      <div class="error_label">This field is required</div>
    </div>
  );
};

export default Input;
