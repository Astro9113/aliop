import React from 'react';

export function isNanInput(label, inputData) {
  if (inputData) {
    return (
            <label>{inputData}</label>
        );
  } else if (!inputData) {
    return (
            <label>{' '}</label>
        );
  }
}
