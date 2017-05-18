import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import moment from 'moment';
moment.locale('zh');

import {trBody} from '../../../../../Helper/from/tr';
import { userDetailInfoChainOpen, userDetailInfoChainClose, blackchainInfo } from '../../../../../../redux/modules/userDetail';

class InfoChain extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailInfoChain: PropTypes.bool,
    userDetailInfoChainOpen: PropTypes.func,
    userDetailInfoChainClose: PropTypes.func,

    blackchainInfoData: PropTypes.object,
    blackchainInfo: PropTypes.func,

  };
  showCard() {
    this.props.userDetailInfoChainOpen();
  }
  closeCard() {
    this.props.userDetailInfoChainClose();
  }

  render() {
    const style = require('./InfoChain.scss');
    const { blackchainInfoData } = this.props;

    let status;
    let statusReason;

    if (blackchainInfoData && blackchainInfoData.data) {
      if (blackchainInfoData.data.isConsistent === 0) {
        status = '信息一致';
      } else if (blackchainInfoData.data.isConsistent === 1) {
        status = '信息不一致';
      }

      if (blackchainInfoData.data.inconsistencyReason === 0) {
        statusReason = '审核通过';
      } else if (blackchainInfoData.data.inconsistencyReason === 1) {
        statusReason = '待审核';
      } else if (blackchainInfoData.data.inconsistencyReason === 2) {
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
            { blackchainInfoData && blackchainInfoData.data && blackchainInfoData.status === 1 &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trBody(['信息是否一致', status, '信息不一致原因', statusReason])}
            {trBody(['首次录入时间', moment(blackchainInfoData.data.initialCreatedOn).format('YYYY-MM-DD HH:mm:ss'), '最近更新时间', moment(blackchainInfoData.data.latestUpdatedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['首次审核时间', moment(blackchainInfoData.data.initialApprovedOn).format('YYYY-MM-DD HH:mm:ss'), '最近审核时间', moment(blackchainInfoData.data.latestApprovedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['首次上链时间', moment(blackchainInfoData.data.initialMinedOn).format('YYYY-MM-DD HH:mm:ss'), '最近上链时间', moment(blackchainInfoData.data.latestMinedOn).format('YYYY-MM-DD HH:mm:ss')])}
            {trBody(['区块号', String(blackchainInfoData.data.blockNumber), '区块哈希值', blackchainInfoData.data.blockHash])}
            {trBody(['数据哈希值', blackchainInfoData.data.dataHash, '交易哈希值', blackchainInfoData.data.txHash])}
            </tbody>}

            { blackchainInfoData && blackchainInfoData.msg && blackchainInfoData.status === 0 &&
            <tbody className={style['astro-personal-service-table-tbody']}>
            {trBody(['写链状态', blackchainInfoData.msg, '', ''])}
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
    userDetailChange: state.userDetail.userDetailChange,
    show: ownProps.show,
    blackchainInfoData: state.userDetail.blackchainInfoData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoChain);
