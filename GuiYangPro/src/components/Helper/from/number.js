import React from 'react';

export function numberInput(textClass, labelName, inputRef, placeHolder, onBlurFunc) {
  if (onBlurFunc) {
    return (
        <div className={textClass} key={inputRef}>
            <label>{labelName}</label>
            <input type="number" className="form-control" ref={inputRef} style={{width: '330px'}} placeholder={placeHolder} onBlur={onBlurFunc} defaultValue={placeHolder}/>
        </div>
        );
  } else if (!onBlurFunc) {
    return (
            <div className={textClass} key={inputRef}>
                <label>{labelName}</label>
                <input type="number" className="form-control" ref={inputRef} style={{width: '330px'}} placeholder={placeHolder} defaultValue={placeHolder}/>
            </div>
        );
  }
}
