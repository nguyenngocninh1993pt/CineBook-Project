import React from 'react';
import './badge.css';

export const Badge = ({ variant = 'default', className = '', children, ...props }) => {
  let variantClass = '';
  switch (variant) {
    case 'secondary':
      variantClass = 'badge-secondary';
      break;
    case 'destructive':
      variantClass = 'badge-destructive';
      break;
    case 'outline':
      variantClass = 'badge-outline';
      break;
    default:
      variantClass = 'badge-default';
  }

  return (
    <div className={`badge ${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
