import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import './breadcrumb.css';

export const Breadcrumb = ({ children, className = '', ...props }) => {
  return (
    <nav aria-label="breadcrumb" className={className} {...props}>
      {children}
    </nav>
  );
};

export const BreadcrumbList = ({ children, className = '', ...props }) => {
  return (
    <ol className={`breadcrumb-list ${className}`} {...props}>
      {children}
    </ol>
  );
};

export const BreadcrumbItem = ({ children, className = '', ...props }) => {
  return (
    <li className={`breadcrumb-item ${className}`} {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbLink = ({ href, children, className = '', ...props }) => {
  return (
    <a href={href} className={`breadcrumb-link ${className}`} {...props}>
      {children}
    </a>
  );
};

export const BreadcrumbPage = ({ children, className = '', ...props }) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`breadcrumb-page ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const BreadcrumbSeparator = ({ children, className = '', ...props }) => {
  return (
    <li className={`breadcrumb-separator ${className}`} aria-hidden="true" role="presentation" {...props}>
      {children || <ChevronRight size={16} />}
    </li>
  );
};

export const BreadcrumbEllipsis = ({ className = '', ...props }) => {
  return (
    <span className={`breadcrumb-ellipsis ${className}`} aria-hidden="true" role="presentation" {...props}>
      <MoreHorizontal size={16} />
      <span className="sr-only">More</span>
    </span>
  );
};
