import React from 'react';

export function trBody(trList, key) {
  const arrayList = [];

  const tdList = trList.map((val, index) => {
    if (val) {
      if (typeof val === 'string' || typeof val === 'number') {
        return (
            <td key={val + index}>{val}</td>
        );
      } else if (typeof val === 'object') {
        if ( typeof val.length === 'number' ) {
          if (val.length > 0) {
            const objarray = val.length;
            let str = '';
            for ( let ii = 0; ii < objarray; ii++ ) {
              str += val[ii] + '。';
            }
            return (
                <td key={str + index}>{str}</td>
            );
          } else if (val.length === 0) {
            return (
                <td key={index}>未填写</td>
            );
          }
        } else if (typeof val.length !== 'number') {
          return (
              <td key={val + index}>{val}</td>
          );
        }
      }
    } else if (!val) {
      const xx = '0123456789qwertyuioplkjhgfdsazxcvbnm';
      let tmp = '';
      const timestamp = new Date().getTime();
      const num = parseInt(Math.random() * 700 + 800, 10);
      tmp += xx.charAt(Math.ceil(Math.random() * 100000000) % xx.length);

      let keyValue = timestamp + tmp + num;
      if (keyValue.indexOf(arrayList) > -1) {
        keyValue = keyValue + xx.charAt(Math.ceil(Math.random() * 100000000) % xx.length);
        arrayList.push(keyValue);
      } else {
        arrayList.push(keyValue);
      }
      return (
          <td key={keyValue + index}>未填写</td>
      );
    }
  });

  return (
      <tr key={key}>{tdList}</tr>
  );
}
