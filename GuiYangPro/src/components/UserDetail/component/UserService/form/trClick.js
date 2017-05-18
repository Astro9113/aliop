import React from 'react';
import moment from 'moment';
moment.locale('zh');

// UserService/form
export function trClickFunc(trList, trClick) {
  // const tmpletet = /^\d\S+[Z]$/;

  const tdList = trList.map((val, index) => {
    if (index === 3) {
      if (val.info && val.info.latestUpdateOn && val.info.initialCreatedOn) {
        const theValue = moment(val.info.latestUpdateOn).format('YYYY-MM-DD');
        return (
            <td key={val + index}>{theValue}</td>
        );
      } else if (val.info && !(val.info.latestUpdateOn) && val.info.initialCreatedOn) {
        const theValue = moment(val.info.initialCreatedOn).format('YYYY-MM-DD');
        return (
            <td key={val + index}>{theValue}</td>
        );
      } else if (!(val.info)) {
        return (
            <td key={val + index}>无</td>
        );
      }
    } else if (index === 4) {
      if (val.info && val.info.approvalStatus ) {
        if (val.info.approvalStatus === 1) {
          return (
              <td key={String(val.info.approvalStatus) + String(index)}>待审核</td>
          );
        } else if (val.info.approvalStatus === 2) {
          return (
              <td key={String(val.info.approvalStatus) + String(index)}>审核通过</td>
          );
        } else if (val.info.approvalStatus === 3) {
          return (
              <td key={String(val.info.approvalStatus) + String(index)}>审核驳回</td>
          );
        }
      } else if (!(val.info)) {
        return (
            <td key={val + index}>无</td>
        );
      }
    } else {
      if (typeof val === 'string') {
        if (val.length > 0) {
          return (
              <td key={val + index}>{val}</td>
          );
        } else if (val.length === 0) {
          return (
              <td key={index}>无</td>
          );
        }
      } else if (typeof val === 'object') {
        if ( typeof val.length === 'number' ) {
          if (val.length > 0) {
            const objarray = val.length;
            let str = '';
            for ( let ii = 0; ii < objarray; ii++ ) {
              str += val[ii] + '；';
            }
            return (
                <td key={val + index}>{str}</td>
            );
          } else if (val.length === 0) {
            return (
                <td key={index}>无</td>
            );
          }
        } else if (typeof val.length !== 'number') {
          return (
              <td key={val + index}>{val}</td>
          );
        }
      }
    }
  });

  return (
        <tr>
            {tdList}
            <td>
                {
                    trClick.map((val, index) => {
                      if (val[2]) {
                        if (val[0] === '修改') {
                          return (
                                    <a key={val[0] + index} name={val[2]} value={val[2]} onClick={val[1]}>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                );
                        } else if (val[0] === '区块链') {
                          return (
                                    <a key={val[0] + index} name={val[2]} value={val[2]} onClick={val[1]}>区块链&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                );
                        } else if (val[0] === '审核') {
                          return (
                                    <a key={val[0] + index} name={val[2]} value={val[2]} onClick={val[1]}>审核&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                );
                        }
                      } else if (!(val[2])) {
                        return (
                                <a key={val[0] + index} onClick={val[1]}>{val[0]}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            );
                      }
                    })
                }
            </td>
        </tr>
    );
}
