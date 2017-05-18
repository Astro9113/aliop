import { myStep } from '../../redux/modules/loadstep';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

class LoadStep extends Component {
  static propTypes = {
    mystep: PropTypes.func.isRequired,
    thestep: PropTypes.string,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.mystep('step1');
    }, 1000);

    setTimeout(() => {
      this.props.mystep('step2');
    }, 2000);

    setTimeout(() => {
      this.props.mystep('step3');
    }, 3000);

    setTimeout(() => {
      this.props.mystep('step4');
    }, 4000);

    setTimeout(() => {
      this.props.mystep('step5');
    }, 5000);

    setTimeout(() => {
      this.props.mystep('step6');
    }, 6000);
    setTimeout(() => {
      this.props.mystep('step7');
    }, 6000);

    setTimeout(() => {
      this.props.mystep('');
    }, 9000);
  }


  render() {
    const style = require('./LoadStep.scss');
    const done = require('./right.png');
    const dot = require('./dot.png');

    const {thestep} = this.props;
    return (
      <div className={style['my-ul']}>
        { thestep === '' &&
        <ul style={{opacity: '0.5'}}>
          <li>获取文件地址&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
          <li>提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
          <li>计算文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li>提取文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li>对比文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step1' &&
        <ul>
          <li>获取文件地址&nbsp;&nbsp;&ensp;<img src={dot}/></li>
          <li style={{opacity: '0.5'}}>提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>计算文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>提取文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>对比文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step2' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={dot}/></li>
          <li style={{opacity: '0.5'}}>计算文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>提取文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>对比文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step3' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >计算文件摘要值<img src={dot}/></li>
          <li style={{opacity: '0.5'}}>提取文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>对比文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step4' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >计算文件摘要值<img src={done}/></li>
          <li >提取文件摘要值<img src={dot}/></li>
          <li style={{opacity: '0.5'}}>对比文件摘要值<img src={dot} style={{opacity: '0'}}/></li>
          <li style={{opacity: '0.5'}}>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step5' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >计算文件摘要值<img src={done}/></li>
          <li >提取文件摘要值<img src={done}/></li>
          <li >对比文件摘要值<img src={dot}/></li>
          <li style={{opacity: '0.5'}}>文件验证成功&nbsp;&nbsp;&ensp;<img src={dot} style={{opacity: '0'}}/></li>
        </ul>
        }
        { thestep === 'step6' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >计算文件摘要值<img src={done}/></li>
          <li >提取文件摘要值<img src={done}/></li>
          <li >对比文件摘要值<img src={done}/></li>
          <li >文件验证成功&nbsp;&nbsp;&ensp;<img src={dot}/></li>
        </ul>
        }
        { thestep === 'step7' &&
        <ul>
          <li >获取文件地址&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >提取文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;<img src={done}/></li>
          <li >计算文件摘要值<img src={done}/></li>
          <li >提取文件摘要值<img src={done}/></li>
          <li >对比文件摘要值<img src={done}/></li>
          <li >文件验证成功&nbsp;&nbsp;&ensp;<img src={done}/></li>
        </ul>
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    thestep: state.loadStep.thestep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mystep: (step) => {
      dispatch(myStep(step));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadStep);
