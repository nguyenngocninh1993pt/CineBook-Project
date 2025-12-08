import React from 'react';
import './aspect-ratio.css';

export const AspectRatio = ({ ratio = 1, children, className = '', style = {}, ...props }) => {
  const padding = `${100 / ratio}%`; // tỷ lệ chiều cao theo width
  return (
    <div className={`aspect-ratio ${className}`} style={{ ...style, paddingTop: padding }} {...props}>
      <div className="aspect-ratio-inner">
        {children}
      </div>
    </div>
  );
};
