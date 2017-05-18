import React from 'react';

export function textInput(textClass, labelName, inputRef, placeHolder, onBlurFunc) {
  if (onBlurFunc) {
    return (
          <div className={textClass}>
              <label>{labelName}{' '}</label><br/>
              <input type="text" className="form-control" ref={inputRef} style={{width: '100%'}} placeholder={placeHolder} onBlur={onBlurFunc} defaultValue={placeHolder}/>
          </div>
      );
  } else if (!onBlurFunc) {
    return (
          <div className={textClass} style={{marginBottom: '50px'}}>
              <label>{labelName}{' '}</label><br/>
              <input type="text" className="form-control" ref={inputRef} style={{width: '100%'}} placeholder={placeHolder} defaultValue={placeHolder}/>
          </div>
      );
  }
}
