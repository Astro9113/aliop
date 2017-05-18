import React from 'react';

// trClick: [[clickName, clickFunc],]
export function trClickFunc(trList, trClick) {
  const tdList = trList.map((val) => {
    return (
            <td key={val}>{val}</td>
        );
  });

  return (
        <tr>
            {tdList}
            <td>
                {
                    trClick.map((val) => {
                      if (val[2]) {
                        return (
                            <a key={val[0]} name={val[2]} value={val[2]} onClick={val[1]}>{val[0]}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                          );
                      } else if (!(val[2])) {
                        return (
                            <a key={val[0]} onClick={val[1]}>{val[0]}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                          );
                      }
                    })
                }
            </td>
        </tr>
    );
}
