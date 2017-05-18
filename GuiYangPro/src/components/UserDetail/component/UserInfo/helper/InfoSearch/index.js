import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { userDetailInfoChangeOpen, userDetailInfoChangeClose,
  userDetailInfoAuditOpen, userDetailInfoAuditClose,
  userDetailInfoChainOpen, userDetailInfoChainClose,
    blackchainInfo}
  from '../../../../../../redux/modules/userDetail';

class InfoSearch extends Component {
  static propTypes = {
    user: PropTypes.object,
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

    blackchainInfoData: PropTypes.object,
    blackchainInfo: PropTypes.func,
    applyId: PropTypes.string,
    approvalStatus: PropTypes.number,
  };
  showCard() {
    this.props.userDetailInfoChangeOpen();
  }
  showAudit() {
    this.props.userDetailInfoAuditOpen();
  }
  showChain() {
    this.props.blackchainInfo(this.props.applyId);
    setTimeout(() => {
      this.props.userDetailInfoChainOpen();
    }, 1000);
  }
  render() {
    const style = require('./InfoSearch.scss');
    const xiugai = require('../../../../img/xiugai.png');
    const shenhe = require('../../../../img/shenhe.png');
    const chain = require('../../../../img/chain.png');

    const {user, approvalStatus} = this.props;

    return (
      <div className={style['astro-personal-service-button'] + ' clearfix'}>
        {(user.role === '信息录入' || Number(user.role) === 1) &&
        <div>
          <button key="3" onClick={this.showChain.bind(this)}><img src={chain}/>区块链</button>
          {approvalStatus === 1 &&
          <button key="1" style={{background: '#cccccc', border: '1px solid #cccccc'}} disabled="disabled"><img src={xiugai}/>修改</button>
          }
          {!(approvalStatus === 1) &&
          <button key="1" onClick={this.showCard.bind(this)}><img src={xiugai}/>修改</button>
          }
        </div>
        }
        {(user.role === '信息审核' || Number(user.role) === 2) &&
        <div>
          {(approvalStatus === 2 || approvalStatus === 3) &&
          <button key="2" style={{background: '#cccccc', border: '1px solid #cccccc'}} disabled="disabled"><img src={shenhe}/>审核</button>
          }
          {approvalStatus === 1 &&
          <button key="2" onClick={this.showAudit.bind(this)}><img src={shenhe}/>审核</button>
          }

          <button key="3" onClick={this.showChain.bind(this)}><img src={chain}/>区块链</button>
        </div>
        }
        {(user.role === '信息查询' || Number(user.role) === 3) &&
        <button key="3" onClick={this.showChain.bind(this)}><img src={chain}/>区块链</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailInfoChange: state.userDetail.userDetailInfoChange,
    show: ownProps.show,

    user: state.auth.user,
    blackchainInfoData: state.userDetail.blackchainInfoData,
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
    blackchainInfo: (uid) => {
      dispatch(blackchainInfo(uid));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSearch);
