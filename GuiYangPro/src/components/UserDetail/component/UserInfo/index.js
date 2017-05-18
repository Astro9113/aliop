import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import InfoModal from './helper/InfoModal';
import InfoAudit from './helper/InfoAudit';
import InfoChain from './helper/InfoChain';

import InfoTable from './helper/InfoTable';
import InfoSearch from './helper/InfoSearch';

import { userDetailInfoChangeOpen, userDetailInfoChangeClose,
  userDetailInfoAuditOpen, userDetailInfoAuditClose,
  userDetailInfoChainOpen, userDetailInfoChainClose}
from '../../../../redux/modules/userDetail';

class UserInfo extends Component {
  static propTypes = {
    name: PropTypes.string,
    userDetailInfoChange: PropTypes.bool,
    userDetailInfoChangeOpen: PropTypes.func,
    userDetailInfoChangeClose: PropTypes.func,

    userDetailInfoAudit: PropTypes.bool,
    userDetailInfoAuditOpen: PropTypes.func,
    userDetailInfoAuditClose: PropTypes.func,

    userDetailInfoChain: PropTypes.bool,
    userDetailInfoChainOpen: PropTypes.func,
    userDetailInfoChainClose: PropTypes.func,

    userinfo: PropTypes.object,
    applyId: PropTypes.string,
    approvalStatus: PropTypes.number,
  };

  componentWillUnmount() {
    this.props.userDetailInfoChangeClose();
    this.props.userDetailInfoAuditClose();
    this.props.userDetailInfoChainClose();
  }
  showCard() {
    this.props.userDetailInfoChangeOpen();
  }
  showAudit() {
    this.props.userDetailInfoAuditOpen();
  }
  showChain() {
    this.props.userDetailInfoChainOpen();
  }
  render() {
    const style = require('./UserInfo.scss');
    const personal = require('../../img/person.png');

    // userinfo
    const { userDetailInfoChange, userDetailInfoAudit, userDetailInfoChain, applyId, approvalStatus } = this.props;
    return (
      <div className={style['astro-personal-info']}>
        <div className={style['astro-personal-service']} id="info">
          <div className={style['astro-personal-service-title']}>
            <img src={personal} /><p>基本信息</p>
          </div>
         <InfoSearch applyId={applyId} approvalStatus={approvalStatus}/>
        </div>
        <InfoTable applyId={applyId}/>
        <InfoModal show={userDetailInfoChange} onHide={this.showCard.bind(this)} applyId={applyId}/>
        <InfoAudit show={userDetailInfoAudit} onHide={this.showAudit.bind(this)} applyId={applyId}/>
        <InfoChain show={userDetailInfoChain} onHide={this.showChain.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailInfoChange: state.userDetail.userDetailInfoChange,
    userDetailInfoAudit: state.userDetail.userDetailInfoAudit,
    userDetailInfoChain: state.userDetail.userDetailInfoChain,
    show: ownProps.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailInfoChangeOpen: () => {
      dispatch(userDetailInfoChangeOpen());
    },
    userDetailInfoChangeClose: () => {
      dispatch(userDetailInfoChangeClose());
    },
    userDetailInfoAuditOpen: () => {
      dispatch(userDetailInfoAuditOpen());
    },
    userDetailInfoAuditClose: () => {
      dispatch(userDetailInfoAuditClose());
    },

    userDetailInfoChainOpen: () => {
      dispatch(userDetailInfoChainOpen());
    },
    userDetailInfoChainClose: () => {
      dispatch(userDetailInfoChainClose());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


