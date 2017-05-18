import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { userDetailIncomeChangeOpen, userDetailIncomeChangeClose, userDetailIncomeAuditOpen, userDetailIncomeAuditClose,
  userDetailIncomeChainOpen, userDetailIncomeChainClose, queryIncomeId, incomeblackchainInfo, getIncomeDetail
}
  from '../../../../../../redux/modules/userDetail';

import IncomeChange from '../IncomeChange';
import IncomeAudit from '../IncomeAudit';
import IncomeChain from '../IncomeChain';

class IncomeTable extends Component {
  static propTypes = {
    user: PropTypes.object,
    transactionId: PropTypes.string,

    userDetailIncomeChange: PropTypes.bool,
    userDetailIncomeChangeOpen: PropTypes.func,
    userDetailIncomeChangeClose: PropTypes.func,

    userDetailIncomeAudit: PropTypes.bool,
    userDetailIncomeAuditOpen: PropTypes.func,
    userDetailIncomeAuditClose: PropTypes.func,

    userDetailIncomeChain: PropTypes.bool,
    userDetailIncomeChainOpen: PropTypes.func,
    userDetailIncomeChainClose: PropTypes.func,

    incomeList: PropTypes.object,
    queryIncomeId: PropTypes.func,
    incomeAduitId: PropTypes.string,

    incomeblackchainInfo: PropTypes.func,

    oneIncomeDetail: PropTypes.object,
    getIncomeDetail: PropTypes.func,

    applyId: PropTypes.string,
  };
  IncomeChange(event) {
    const uid = event.target.name;
    this.props.queryIncomeId(uid);

    this.props.getIncomeDetail(uid);

    setTimeout(() => {
      this.props.userDetailIncomeChangeOpen();
    }, 500);
  }
  IncomeAudit(event) {
    const uid = event.target.name;
    this.props.queryIncomeId(uid);

    this.props.userDetailIncomeAuditOpen();
  }
  IncomeChain(event) {
    const uid = event.target.name;
    this.props.queryIncomeId(uid);

    this.props.incomeblackchainInfo(uid);

    setTimeout(() => {
      this.props.userDetailIncomeChainOpen();
    }, 500);
  }
  render() {
    const style = require('./IncomeTable.scss');
    const {userDetailIncomeChange, userDetailIncomeAudit, userDetailIncomeChain, user, incomeList, incomeAduitId, oneIncomeDetail, applyId} = this.props;

    let startList;
    if (incomeList && incomeList.data && incomeList.data.length > 0 ) {
      const dataLength = incomeList.data.length;
      startList = incomeList.data.map((transaction, index) => {
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
          return (
              <tr key={transaction._id} style={trStyle}>
                <th style={{paddingLeft: '20px'}}>{index + 1}</th><td>{transaction.meta.year}</td>
                <td style={{textAlign: 'center'}}>{transaction.meta.lastYearTotalIncome}{' '}元</td><td style={{textAlign: 'center'}}>{transaction.meta.lastYearTotalIncomeFamily}{' '}元</td>
                <td style={{textAlign: 'center'}}>{transaction.meta.lastYearTotalExpenditureFamily}{' '}元</td><td style={{textAlign: 'center'}}>{transaction.meta.nonproductiveExpenditureFamily}{' '}元</td>
                <td style={{textAlign: 'center'}}>{transaction.meta.foodExpenditureFamily}{' '}元</td><td style={{textAlign: 'center'}}>{transaction.meta.basicLivingAllowance}{' '}元</td>
                <td style={{textAlign: 'center'}}>{transaction.meta.heavilyDisabledAllowance}{' '}元</td><td style={{textAlign: 'center'}}>{transaction.meta.monthlyIncomeFamily}{' '}元</td>
                <td style={{textAlign: 'center'}}>{transaction.meta.classifiedAllowance}{' '}元</td><td style={{textAlign: 'center'}}>{transaction.meta.monthlyLivingAllowance}{' '}元</td>
                <td>{appStatus}</td>
                {Number(user.role) === 1 &&
                <td>
                  {transaction.approvalStatus === 3 &&
                  <a onClick={this.IncomeChange.bind(this)} name={transaction._id}>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  {!(transaction.approvalStatus === 3) &&
                  <a name={transaction._id} style={{color: '#cccccc'}} disabled>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  <a onClick={this.IncomeChain.bind(this)} name={transaction._id} >区块链</a>
                </td>
                }
                {Number(user.role) === 2 &&
                <td>
                  {transaction.approvalStatus === 1 &&
                  <a onClick={this.IncomeAudit.bind(this)} name={transaction._id}>审核&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  {!(transaction.approvalStatus === 1) &&
                  <a name={transaction._id} style={{color: '#cccccc'}} disabled>审核&nbsp;&nbsp;&nbsp;&nbsp;</a>
                  }
                  <a onClick={this.IncomeChain.bind(this)} name={transaction._id}>区块链</a>
                </td>
                }
                {Number(user.role) === 3 &&
                <td>
                  <a onClick={this.IncomeChain.bind(this)} name={transaction._id}>区块链</a>
                </td>
                }
              </tr>
          );
        }
      });
    }

    return (
      <div style={{height: '400px'}}>
        <table className={style['astro-personal-income-table'] + ' col-lg-12 table table-hover'}>
          <thead>
          <tr style={{whiteSpace: 'nowrap'}}>
            <th style={{paddingLeft: '20px'}}>序号</th><th>年份</th>
            <th>个人上年总收入</th><th>家庭上年总收入</th><th>家庭上年总支出</th><th>家庭消费性支出</th><th>家庭食品支出</th>

            <th>享受低保情况</th><th>重度残疾人据理补贴</th><th>家庭经济月总收入</th><th>领取分类救助金额</th><th>家庭月领取低保金</th>
            <th>状态</th><th>操作</th>
          </tr>
          </thead>
          <tbody>
          {startList}
          </tbody>
        </table>
        <IncomeChange applyId={applyId} show={userDetailIncomeChange} onHide={this.IncomeChange.bind(this)} queryIncomeId={this.props.queryIncomeId} incomeAduitId={incomeAduitId} oneIncomeDetail={oneIncomeDetail}/>
        <IncomeAudit applyId={applyId} show={userDetailIncomeAudit} onHide={this.IncomeAudit.bind(this)} queryIncomeId={this.props.queryIncomeId} incomeAduitId={incomeAduitId}/>
        <IncomeChain show={userDetailIncomeChain} onHide={this.IncomeChain.bind(this)} queryIncomeId={this.props.queryIncomeId} incomeAduitId={incomeAduitId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailIncomeChange: state.userDetail.userDetailIncomeChange,
    userDetailIncomeAudit: state.userDetail.userDetailIncomeAudit,
    userDetailIncomeChain: state.userDetail.userDetailIncomeChain,
    incomeAduitId: state.userDetail.incomeAduitId,
    oneIncomeDetail: state.userDetail.oneIncomeDetail,

    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeChangeOpen: () => {
      dispatch(userDetailIncomeChangeOpen());
    },
    userDetailIncomeChangeClose: () => {
      dispatch(userDetailIncomeChangeClose());
    },

    userDetailIncomeAuditOpen: () => {
      dispatch(userDetailIncomeAuditOpen());
    },
    userDetailIncomeAuditClose: () => {
      dispatch(userDetailIncomeAuditClose());
    },

    userDetailIncomeChainOpen: () => {
      dispatch(userDetailIncomeChainOpen());
    },
    userDetailIncomeChainClose: () => {
      dispatch(userDetailIncomeChainClose());
    },
    queryIncomeId: (id) => {
      dispatch(queryIncomeId(id));
    },
    incomeblackchainInfo: (id) => {
      dispatch(incomeblackchainInfo(id));
    },
    getIncomeDetail: (id) => {
      dispatch(getIncomeDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeTable);
