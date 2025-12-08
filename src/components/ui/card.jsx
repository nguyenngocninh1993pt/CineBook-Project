import React from 'react';
import './card.css';

export const Card = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`card ${className}`} {...props}>
    {children}
  </div>
));

export const CardHeader = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`card-header ${className}`} {...props}>
    {children}
  </div>
));

export const CardTitle = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <h3 ref={ref} className={`card-title ${className}`} {...props}>
    {children}
  </h3>
));

export const CardDescription = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <p ref={ref} className={`card-description ${className}`} {...props}>
    {children}
  </p>
));

export const CardContent = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`card-content ${className}`} {...props}>
    {children}
  </div>
));

export const CardFooter = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`card-footer ${className}`} {...props}>
    {children}
  </div>
));
