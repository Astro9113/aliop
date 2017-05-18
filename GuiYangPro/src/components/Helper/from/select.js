import React from 'react';

export function selectInput(textClass, labelName, inputRef, options, onfocus, choose) {
  const optionList = options.map((val, index) => {
    if (val === choose) {
      return (
              <option value={val} key={index} selected>{val}</option>
          );
    } else if (val !== choose) {
      return (
              <option value={val} key={index}>{val}</option>
          );
    }
  });
  return (
    <div className={textClass} key={inputRef}>
      <label>{labelName}{' '}</label><br/>
      <select ref={inputRef} className="form-control" style={{width: '330px'}} onClick={onfocus}>
        {(choose === undefined) &&
        <option key="请选择" selected>请选择</option>
        }
        {
          optionList
        }
      </select>
    </div>
  );
}

// {(choose !== undefined) &&
// <option key="请选择">请选择</option>
// }
