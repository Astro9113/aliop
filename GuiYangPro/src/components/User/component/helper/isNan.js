import React from 'react';

export function isNanInput(inputData) {
  if (inputData) {
    return (
            <td>{inputData}</td>
        );
  } else if (!inputData) {
    return (
            <td>{' '}</td>
        );
  }
}
