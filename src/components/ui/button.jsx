import React from 'react';
import './button.css';

export const Button = ({ variant = 'default', size = 'default', asChild = false, className = '', children, ...props }) => {
  const Comp = asChild ? 'span' : 'button'; // Nếu muốn render child slot, dùng span
  return (
    <Comp
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};
