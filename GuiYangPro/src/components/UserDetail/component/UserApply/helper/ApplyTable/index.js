import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
moment.locale('zh');

import { userDetailApplyChangeOpen, userDetailApplyChangeClose,
  userDetailApplyAuditOpen, userDetailApplyAuditClose,
  userDetailApplyChainOpen, userDetailApplyChainClose,
  queryApplyId, getApplyDetail, applyblackchainInfo,
}
  from '../../../../../../redux/modules/userDetail';

import ApplyChange from '../ApplyChange';
import ApplyAudit from '../ApplyAudit';
import ApplyChain from '../ApplyChain';

class UserTable extends Component {
  static propTypes = {
    user: PropTypes.object,
    transactionId: PropTypes.string,

    userDetailApplyChange: PropTypes.bool,
    userDetailApplyChangeOpen: PropTypes.func,
    userDetailApplyChangeClose: PropTypes.func,

    userDetailApplyAudit: PropTypes.bool,
    userDetailApplyAuditOpen: PropTypes.func,
    userDetailApplyAuditClose: PropTypes.func,

    userDetailApplyChain: PropTypes.bool,
    userDetailApplyChainOpen: PropTypes.func,
    userDetailApplyChainClose: PropTypes.func,

    applyList: PropTypes.object,
    queryApplyId: PropTypes.func,
    applyAduitId: PropTypes.string,

    getApplyDetail: PropTypes.func,
    oneApplyDetail: PropTypes.object,

    applyId: PropTypes.string,
    applyblackchainInfo: PropTypes.func,
  };
  ApplyChange(event) {
    const uid = event.target.name;
    this.props.queryApplyId(uid);

    this.props.getApplyDetail(uid);

    setTimeout(() => {
      this.props.userDetailApplyChangeOpen();
    }, 500);
  }
  ApplyAudit(event) {
    const uid = event.target.name;
    this.props.queryApplyId(uid);

    this.props.userDetailApplyAuditOpen();
  }

  ApplyChain(event) {
    const uid = event.target.name;
    this.props.queryApplyId(uid);
    this.props.applyblackchainInfo(uid);

    setTimeout(() => {
      this.props.userDetailApplyChainOpen();
    }, 500);
  }
  render() {
    const style = require('./ApplyTable.scss');
    const {userDetailApplyChange, userDetailApplyAudit, userDetailApplyChain, user, applyList, applyAduitId, oneApplyDetail, applyId} = this.props;

    let startList;
    if (applyList && applyList.data && applyList.data.length > 0 ) {
      const dataLength = applyList.data.length;
      startList = applyList.data.map((transaction, index) => {
        let appStatus;
        if (transaction.approvalStatus === 0) {
          appStatus = '已保存';
        } else if (transaction.approvalStatus === 1) {
          appStatus = '待审核';
        } else if (transaction.approvalStatus === 2) {
          appStatus = '审核通过';
        } else if (transaction.approvalStatus === 3) {
          appStatus = '驳回';
        }
        if (transaction.meta) {
          let trStyle;
          // console.log('dataLength=> ', dataLength, 'index + 1 => ', index + 1);

          if (index + 1 === dataLength) {
            trStyle = {whiteSpace: 'nowrap'};
          } else {
            trStyle = {height: '36px', whiteSpace: 'nowrap'};
          }
          const paymentDue = moment(transaction.meta.paymentDue).format('YYYY-MM-DD') !== 'Invalid date' ? moment(transaction.meta.paymentDue).format('YYYY-MM-DD') : '未填写';
          const helpAskedOn = moment(transaction.meta.helpAskedOn).format('YYYY-MM-DD') !== 'Invalid date' ? moment(transaction.meta.helpAskedOn).format('YYYY-MM-DD') : '未填写';
          return (
              <tr key={transaction._id} style={trStyle}>
                <th style={{paddingLeft: '20px'}}>{index + 1}</th>
                <td>{transaction.meta.appliedQuantity}</td><td>{transaction.meta.paymentMethod}</td><td>{paymentDue}</td>
                <td>{transaction.meta.payer}</td><td>{transaction.meta.recipient}</td><td>{transaction.meta.recipientRelation}</td>
                <td>{helpAskedOn}</td><td>{transaction.meta.helpAskedReason}</td><td>{transaction.meta.bankAccountNum}</td>
                <td>{transaction.meta.deseaseName}</td><td>{transaction.meta.deseaseCategory}</td><td>{transaction.meta.totalExpenditure}</td>
                <td>{transaction.meta.selfExpenseQTY}</td><td>{transaction.meta.govAllowance}</td><td>{appStatus}</td>
                {Number(user.role) === 1 &&
                <td>
                  {transaction.approvalStatus === 3 &&
                  <a onClick={this.ApplyChange.bind(this)} name={transaction._id}>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  {!(transaction.approvalStatus === 3) &&
                  <a name={transaction._id} style={{color: '#cccccc'}} disabled>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  <a onClick={this.ApplyChain.bind(this)} name={transaction._id}>区块链</a>
                </td>
                }
                {Number(user.role) === 2 &&
                <td>
                  {transaction.approvalStatus === 1 &&
                  <a onClick={this.ApplyAudit.bind(this)} name={transaction._id}>审核&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  {!(transaction.approvalStatus === 1) &&
                  <a name={transaction._id} style={{color: '#cccccc'}} disabled>审核&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  <a onClick={this.ApplyChain.bind(this)} name={transaction._id}>区块链</a>
                </td>
                }
                {Number(user.role) === 3 &&
                <td>
                  <a onClick={this.ApplyChain.bind(this)} name={transaction._id}>区块链</a>
                </td>
                }
              </tr>
          );
        }
      });
    }

    return (
      <div style={{height: '400px'}}>
        <table className={style['astro-personal-apply-table'] + ' col-lg-12 table table-hover'}>
          <thead>
          <tr style={{whiteSpace: 'nowrap'}}>
            <th style={{paddingLeft: '20px'}}>序号</th><th>救助金额</th><th>支付方式</th><th>支付时间</th><th>付款人</th><th>收款人</th>
            <th>收款人关系</th><th>求助时间</th><th>救助事由</th><th>银行账号</th><th>疾病名称</th><th>疾病种类</th><th>医疗总费用</th>
            <th>本人承担（元）</th><th>民政救助金额</th><th>状态</th><th>操作</th>
          </tr>
          </thead>
          <tbody>
          {startList}
          </tbody>
        </table>
        <ApplyChange show={userDetailApplyChange} onHide={this.ApplyChange.bind(this)} queryApplyId={this.props.queryApplyId} applyAduitId={applyAduitId} oneApplyDetail={oneApplyDetail} applyId={applyId}/>
        <ApplyAudit show={userDetailApplyAudit} onHide={this.ApplyAudit.bind(this)} queryApplyId={this.props.queryApplyId} applyAduitId={applyAduitId} applyId={applyId}/>
        <ApplyChain show={userDetailApplyChain} onHide={this.ApplyChain.bind(this)} queryApplyId={this.props.queryApplyId} applyAduitId={applyAduitId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailApplyChange: state.userDetail.userDetailApplyChange,
    userDetailApplyAudit: state.userDetail.userDetailApplyAudit,
    userDetailApplyChain: state.userDetail.userDetailApplyChain,

    user: state.auth.user,
    oneApplyDetail: state.userDetail.oneApplyDetail,
    applyAduitId: state.userDetail.applyAduitId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyChangeOpen: () => {
      dispatch(userDetailApplyChangeOpen());
    },
    userDetailApplyChangeClose: () => {
      dispatch(userDetailApplyChangeClose());
    },
    userDetailApplyAuditOpen: () => {
      dispatch(userDetailApplyAuditOpen());
    },
    userDetailApplyAuditClose: () => {
      dispatch(userDetailApplyAuditClose());
    },
    userDetailApplyChainOpen: () => {
      dispatch(userDetailApplyChainOpen());
    },
    userDetailApplyChainClose: () => {
      dispatch(userDetailApplyChainClose());
    },
    queryApplyId: (id) => {
      dispatch(queryApplyId(id));
    },
    getApplyDetail: (id) => {
      dispatch(getApplyDetail(id));
    },
    applyblackchainInfo: (id) => {
      dispatch(applyblackchainInfo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
