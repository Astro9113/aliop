import React, { Component, PropTypes } from 'react';

import { modalClick, modalUnclick, modalLoading } from '../../../redux/modules/test';
import { connect } from 'react-redux';


class Test extends Component {
  static propTypes = {
    unclick: PropTypes.func.isRequired,
    myloading: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired,
    isclick: PropTypes.bool,
    isloading: PropTypes.bool
  };

  componentDidMount() {
    this.props.unclick();
  }

  onClick() {
    this.props.myloading();
    setTimeout(() => {
      this.props.click();
    }, 5000);
  }

  render() {
    const { isclick, isloading } = this.props;

    const imgStyle = {opacity: '1', margin: '2rem'};
    const imgStyle2 = {opacity: '0', margin: '2rem'};

    const state = '众筹中';

    const style = require('./Test.scss');
    const style2 = require('../../../components/MemberDetail/MyLoading.scss');
    const cert = require('./../../../components/ProjectDetail/cert.png');
    const upload = require('../../../components/MemberDetail/upload.png');
    const project = require('../../../components/Project/project.png');
    const icon = require('./../../../components/ProjectDetail/ivon.png');
    return (
      <div className="container" style={{paddingBottom: '4rem'}}>
        <div className={'col-lg-3 ' + style.left}>
          <img src={project}/>
          <div className={style['left-div']}>
            <img src={icon}/>
            <h4>{state}</h4>
          </div>
        </div>
       <div className="col-lg-8">
         <div className={style.right}>
           {!isclick && !isloading &&
           <img src={cert} style={imgStyle2}/>
           }
           {!isclick && !isloading &&
           <div className={'col-lg-12 ' + style.image}>
             <img src={upload}/>
             <button className={style.butttonLeft} onClick={this.onClick.bind(this)}>信息区块链查验</button>
             <p>众筹项目均为众筹联盟会员企业提交，信息提交确认后存证于区块链网络中，确保信息无法篡改</p>
           </div>
           }

           {isloading &&
             <div>
               <img src={cert} style={imgStyle2}/>
               <div className={style2.loader + ' ' + style2['loader-clock'] + ' ' + style2['is-active']}></div>
             </div>
           }
           {isclick && !isloading &&
           <img src={cert} style={imgStyle}/>
           }
         </div>
       </div>
     </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    isclick: state.test.isclick,
    isloading: state.test.isloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unclick: () => {
      dispatch(modalUnclick());
    },
    click: () => {
      dispatch(modalClick());
    },
    myloading: () => {
      dispatch(modalLoading());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
