import React from 'react';

export function passwdInput(textClass, labelName, inputRef) {
  return (
  <div className={textClass}>
    <label>{labelName}{' '}</label><br/>
    <input type="password" className="form-control" ref={inputRef} style={{width: '330px'}}/>
  </div>
  );
}
