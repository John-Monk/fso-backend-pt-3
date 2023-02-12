import React from 'react';
import { useEffect } from 'react';

export default function Alert({ style, message, hideAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={style}>
      <p>{message}</p>
    </div>
  );
}