import React, { Component, PropTypes } from 'react';

import UserHeader from './component/UserHeader';
import UserInfo from './component/UserInfo';
import UserIncome from './component/UserIncome';

import UserApply from './component/UserApply';
import UserService from './component/UserService';


export default class UserDetail extends Component {

  static propTypes = {
    applyId: PropTypes.string,
    userDetailData: PropTypes.object,
    queryUserDetail: PropTypes.func,
    // applyUser: PropTypes.func,

    getUserIncome: PropTypes.func,
    incomeList: PropTypes.object,

    getUserApply: PropTypes.func,
    applyList: PropTypes.object,
  };

  componentWillMount() {
    this.props.queryUserDetail(this.props.applyId);
    this.props.getUserIncome(this.props.applyId, 1);
    this.props.getUserApply(this.props.applyId, 1);
  }

  // componentWillUnmount() {
  //   this.props.applyUser(1);
  // }

  render() {
    const style = require('./UserDetail.scss');
    const back = require('./img/back2.png');

    const {userDetailData, applyId, incomeList, applyList} = this.props;
    let meta;
    let infoId;
    let inconsistencyReason;
    let approvalStatus;
    let showState = 0;

    if (userDetailData && userDetailData.data && userDetailData.data.basics && userDetailData.data.basics.meta) {
      meta = userDetailData.data.basics.meta !== undefined ? userDetailData.data.basics.meta : { };
      infoId = userDetailData.data.basics._id !== undefined ? userDetailData.data.basics._id : '';
      inconsistencyReason = userDetailData.data.basics.inconsistencyReason !== undefined ? userDetailData.data.basics.inconsistencyReason : '';
      approvalStatus = userDetailData.data.basics.approvalStatus !== undefined ? userDetailData.data.basics.approvalStatus : '';

      if (userDetailData.data.basics.approvalStatus) {
        showState = userDetailData.data.basics.approvalStatus;
      }
    } else {
      meta = { };
    }

    return (
      <div style={{marginBottom: '50px'}}>
        <div className={style['astro-personal']} id="personal">
          <a href="#appHeader"><img src={back} style={{position: 'fixed', right: '50px', bottom: '150px', zIndex: '999'}}/></a>
          <UserHeader userinfo={meta}/>
          <UserInfo userinfo={meta} applyId={infoId} inconsistencyReason={inconsistencyReason} approvalStatus={approvalStatus}/>

          {!(showState === 0) &&
          <UserIncome applyId={applyId} incomeList={incomeList}/>
          }
          {!(showState === 0) &&
          <UserApply applyId={applyId} applyList={applyList}/>
          }
          {!(showState === 0) &&
          <UserService applyId={applyId}/>
          }
        </div>
      </div>
    );
  }
}
