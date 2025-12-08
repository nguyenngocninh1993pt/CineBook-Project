import React, { useState } from 'react';
import './accordion.css';

export const Accordion = ({ children }) => {
  return <div className="accordion">{children}</div>;
};

export const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-trigger" onClick={() => setOpen(!open)}>
        {title}
        <span className={`accordion-chevron ${open ? 'open' : ''}`}>&#9660;</span>
      </div>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};
