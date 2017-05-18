import React from 'react';

export function boxInput(textClass, labelName, inputRef, options, optionsList) {
  const optionList = options.map((val, index) => {
    if (optionsList && typeof optionsList === 'object' && typeof optionsList.length === 'number' && optionsList.length > 0) {
      if (optionsList.indexOf(val) >= 0) {
        return (
                  <label key={index} style={{marginLeft: '20px'}}><input type="checkbox" name={inputRef} id={inputRef + index} value={val} defaultChecked="checked"/>{val}</label>
              );
      } else if (optionsList.indexOf(val) === -1) {
        return (
                  <label key={index} style={{marginLeft: '20px'}}><input type="checkbox" name={inputRef} id={inputRef + index} value={val}/>{val}</label>
            );
      }
    } else if (!optionList) {
      return (
            <label key={index} style={{marginLeft: '20px'}}><input type="checkbox" name={inputRef} id={inputRef + index} value={val} />{val}</label>
          );
    }
  });
  return (
        <div className={textClass} style={{marginBottom: '50px'}}>
            <label>{labelName}{' '}</label><br/>
            <div className="checkbox" style={{width: '100%'}}>
                {
                    optionList
                }
            </div>
        </div>
    );
}

