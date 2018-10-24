import React from 'react';
import cn from 'classnames';

const Input = ({onChange, onBlur, onFocus, type, name, value, placeholder, error, touched}) => {
  return (
    <div className="formBlock">
      <input
        className={cn(
          'border',
          'border-solid',
          {
            'border-grey': !error && !touched,
            'border-red': error && touched 
          }
        )} 
        name={name}
        type={type} 
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder} 
        value={value}
      />
      {touched && error ?
        <div className="error_label">{error}</div>
        :
        null
      }
    </div>
  );
};

export default Input;
