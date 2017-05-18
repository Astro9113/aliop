import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import moment from 'moment';
moment.locale('zh');

import {trBody} from '../../../../../Helper/from/tr';

import { userDetailIncomeChainOpen, userDetailIncomeChainClose } from '../../../../../../redux/modules/userDetail';

class IncomeChain extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailIncomeChain: PropTypes.bool,
    userDetailIncomeChainOpen: PropTypes.func,
    userDetailIncomeChainClose: PropTypes.func,

    queryIncomeId: PropTypes.func,
    incomeAduitId: PropTypes.string,

    blackchainincomeData: PropTypes.object,
  };
  showCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeChainOpen();
  }
  closeCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeChainClose();
  }

  render() {
    const style = require('./IncomeChain.scss');
    const {blackchainincomeData} = this.props;

    let status;
    let statusReason;

    if (blackchainincomeData && blackchainincomeData.data) {
      if (blackchainincomeData.data.isConsistent === 0) {
        status = '信息一致';
      } else if (blackchainincomeData.data.isConsistent === 1) {
        status = '信息不一致';
      }

      if (blackchainincomeData.data.inconsistencyReason === 0) {
        statusReason = '审核通过';
      } else if (blackchainincomeData.data.inconsistencyReason === 1) {
        statusReason = '待审核';
      } else if (blackchainincomeData.data.inconsistencyReason === 2) {
        statusReason = '非法篡改';
      }
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>区块链证书</h4>
          <table className={style['astro-personal-service-table'] + ' col-lg-12 table table-bordered'}>
            <thead>
            <tr className={style['astro-personal-service-table-tr']}>
              <th>字段名称<p>FILED NAMES</p></th>
              <th>状态<p>STATE</p></th>
              <th>字段名称<p>FILED NAMES</p></th>
              <th>状态<p>STATE</p></th>
            </tr>
            </thead>
            { blackchainincomeData && blackchainincomeData.data && blackchainincomeData.status === 1 &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trBody(['信息是否一致', status, '信息不一致原因', statusReason])}
            {trBody(['首次录入时间', moment(blackchainincomeData.data.initialCreatedOn).format('YYYY-MM-DD HH:mm:ss'), '最近更新时间', moment(blackchainincomeData.data.latestUpdatedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['首次审核时间', moment(blackchainincomeData.data.initialApprovedOn).format('YYYY-MM-DD HH:mm:ss'), '最近审核时间', moment(blackchainincomeData.data.latestApprovedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['首次上链时间', moment(blackchainincomeData.data.initialMinedOn).format('YYYY-MM-DD HH:mm:ss'), '最近上链时间', moment(blackchainincomeData.data.latestMinedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['区块号', String(blackchainincomeData.data.blockNumber), '区块哈希值', blackchainincomeData.data.blockHash])}
            {trBody(['数据哈希值', blackchainincomeData.data.dataHash, '交易哈希值', blackchainincomeData.data.txHash])}
            </tbody>}

            { blackchainincomeData && blackchainincomeData.msg && blackchainincomeData.status === 0 &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trBody(['写链状态', blackchainincomeData.msg, '', ''])}
            </tbody>}
          </table>
          <div className={style['astro-home-modal-button']}>
            <button key="1" onClick={this.closeCard.bind(this)}>关闭</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailIncomeChain: state.userDetail.userDetailIncomeChain,
    show: ownProps.show,

    blackchainincomeData: state.userDetail.blackchainincomeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeChainOpen: () => {
      dispatch(userDetailIncomeChainOpen());
    },
    userDetailIncomeChainClose: () => {
      dispatch(userDetailIncomeChainClose());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeChain);
