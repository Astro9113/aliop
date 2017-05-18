import React from 'react';
import moment from 'moment';
moment.locale('zh');

export function dateInput(textClass, labelName, inputRef, datetime) {
  if (datetime) {
    if (new Date(moment(datetime).format('YYYY-MM-DD')) instanceof Date) {
      const theDate = moment(datetime).format('YYYY-MM-DD');
      return (
          <div className={textClass} key={inputRef}>
            <label>{labelName}</label>
            <input type="date" defaultValue={theDate} className="form-control" ref={inputRef} style={{width: '330px'}}/>
          </div>
      );
    } else if (! moment(datetime).format('YYYY-MM-DD') || !new Date(moment(datetime).format('YYYY-MM-DD')) instanceof Date instanceof Date) {
      return (
          <div className={textClass} key={inputRef}>
            <label>{labelName}</label>
            <input type="date" className="form-control" ref={inputRef} style={{width: '330px'}}/>
          </div>
      );
    }
  } else if (!datetime) {
    return (
        <div className={textClass} key={inputRef}>
          <label>{labelName}</label>
          <input type="date" className="form-control" ref={inputRef} style={{width: '330px'}}/>
        </div>
    );
  }
}
