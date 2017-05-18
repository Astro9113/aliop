import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ApplyPage from './helper/ApplyPage';
import ApplyTable from './helper/ApplyTable';
import ApplyAdd from './helper/ApplyAdd';

import {userDetailApplyAddOpen, userDetailApplyAddClose
}
  from '../../../../redux/modules/userDetail';

class UserApply extends Component {
  static propTypes = {
    applyId: PropTypes.string,
    applyList: PropTypes.object,

    user: PropTypes.object,
    transactionId: PropTypes.string,

    userDetailApplyAdd: PropTypes.bool,
    userDetailApplyAddOpen: PropTypes.func,
    userDetailApplyAddClose: PropTypes.func,
  };
  componentWillUnmount() {
    this.props.userDetailApplyAddClose();
  }
  ApplyAdd() {
    this.props.userDetailApplyAddOpen();
  }
  render() {
    const style = require('./UserApply.scss');
    const income = require('../../img/apply.png');

    const {userDetailApplyAdd, user, applyId, applyList} = this.props;

    return (
      <div className={style['astro-personal-apply'] + ' clearfix'} id="apply">
        <div className={style['astro-personal-apply-line']}></div>
        <div className={style['astro-personal-apply-title']}>
          <img src={income} /><p>救助资金申请</p>
        </div>
        {(user.role === '信息录入' || Number(user.role) === 1) &&
        <div className={style['astro-personal-apply-button']}>
          <button onClick={this.ApplyAdd.bind(this)}>{' + '}新增</button>
        </div>
        }
        <ApplyTable applyList={applyList} applyId={applyId}/>
        <ApplyAdd show={userDetailApplyAdd} onHide={this.ApplyAdd.bind(this)} applyId={applyId}/>
        <ApplyPage applyList={applyList} applyId={applyId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailApplyAdd: state.userDetail.userDetailApplyAdd,

    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyAddOpen: () => {
      dispatch(userDetailApplyAddOpen());
    },
    userDetailApplyAddClose: () => {
      dispatch(userDetailApplyAddClose());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserApply);
