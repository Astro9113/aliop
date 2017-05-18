import React, { Component, PropTypes } from 'react';

export default class LoadStep extends Component {
  static propTypes = {
    mystep: PropTypes.func.isRequired,
    thestep: PropTypes.string,
  };


  render() {
    const style = require('./LoadStep.scss');
    const done = require('./right.png');
    const dot = require('./dot.png');
    return (
      <div className={style['my-ul']}>
        <ul>
          <li>获取文件地址&nbsp;&nbsp;&nbsp;<img src={done}/></li>
          <li>提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;&ensp;<img src={done}/></li>
          <li>计算文件摘要值<img src={done}/></li>
          <li>提取文件摘要值<img src={done}/></li>
          <li>对比文件摘要值<img src={done}/></li>
          <li>文件验证成功&nbsp;&nbsp;&nbsp;&ensp;&ensp;<img src={dot}/></li>
        </ul>
      </div>

    );
  }
}
