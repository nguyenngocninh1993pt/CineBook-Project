import React from 'react';
import './alert.css';

export const Alert = ({ variant = 'default', className = '', children, ...props }) => {
  return (
    <div
      role="alert"
      className={`alert ${variant === 'destructive' ? 'alert-destructive' : 'alert-default'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ className = '', children, ...props }) => {
  return (
    <h5 className={`alert-title ${className}`} {...props}>
      {children}
    </h5>
  );
};

export const AlertDescription = ({ className = '', children, ...props }) => {
  return (
    <div className={`alert-description ${className}`} {...props}>
      {children}
    </div>
  );
};
