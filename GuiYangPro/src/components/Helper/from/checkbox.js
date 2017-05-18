import React from 'react';

export function boxInput(textClass, labelName, inputRef, options, optionsList) {
  const optionList = options.map((val, index) => {
    if (optionsList && typeof optionsList === 'object' && typeof optionsList.length === 'number' && optionsList.length > 0) {
      if (optionsList.indexOf(val) >= 0) {
        return (
                  <label key={val + index} style={{marginLeft: '20px'}}>
                      <input type="checkbox" name={inputRef} id={inputRef + index} value={val} defaultChecked="checked" style={{top: '15px', marginRight: '10px'}}/>
                      {val}
                  </label>
              );
      } else if (optionsList.indexOf(val) === -1) {
        return (
                  <label key={val + index} style={{marginLeft: '20px'}}>
                      <input type="checkbox" name={inputRef} id={inputRef + index} value={val} style={{top: '15px', marginRight: '10px'}}/>{val}</label>
            );
      }
    } else if (!optionList) {
      return (
            <label key={val + index} style={{marginLeft: '20px'}}><input type="checkbox" name={inputRef} id={inputRef + index} value={val} style={{top: '15px', marginRight: '10px'}}/>
                {val}</label>
          );
    }
  });
  return (
        <div className={textClass} key={inputRef}>
            <label>{labelName}{' '}</label><br/>
            <div className="checkbox" style={{width: '100%'}}>
                {
                    optionList
                }
            </div>
        </div>
    );
}

