import React from 'react';

export function whichSelect(optionName) {
  if ( optionName === '信息查询') {
    return (
        <select ref="role" className="form-control" style={{width: '330px', height: '38px'}}>
          <option value="信息查询">信息查询</option>
          <option value="管理员">管理员</option>
          <option value="信息录入">信息录入</option>
          <option value="信息审核">信息审核</option>
        </select>
    );
  } else if (optionName === '管理员') {
    return (
        <select ref="role" className="form-control" style={{width: '330px', height: '38px'}}>
            <option value="管理员">管理员</option>
            <option value="信息查询">信息查询</option>
            <option value="信息录入">信息录入</option>
            <option value="信息审核">信息审核</option>
        </select>
        );
  } else if (optionName === '信息录入') {
    return (
          <select ref="role" className="form-control" style={{width: '330px', height: '38px'}}>
              <option value="信息录入">信息录入</option>
              <option value="管理员">管理员</option>
              <option value="信息查询">信息查询</option>
              <option value="信息审核">信息审核</option>
          </select>
      );
  } else if (optionName === '信息审核') {
    return (
          <select ref="role" className="form-control" style={{width: '330px', height: '38px'}}>
              <option value="信息审核">信息审核</option>
              <option value="管理员">管理员</option>
              <option value="信息查询">信息查询</option>
              <option value="信息录入">信息录入</option>
          </select>
      );
  }
}
