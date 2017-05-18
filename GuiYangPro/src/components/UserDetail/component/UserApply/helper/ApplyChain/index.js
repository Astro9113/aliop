import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import moment from 'moment';
moment.locale('zh');

import {trBody} from '../../../../../Helper/from/tr';

import { userDetailApplyChainOpen, userDetailApplyChainClose } from '../../../../../../redux/modules/userDetail';

class ApplyChain extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailApplyChain: PropTypes.bool,
    userDetailApplyChainOpen: PropTypes.func,
    userDetailApplyChainClose: PropTypes.func,

    queryApplyId: PropTypes.func,
    applyAduitId: PropTypes.string,

    blackchainapplyData: PropTypes.object,
  };
  showCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyChainOpen();
  }
  closeCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyChainClose();
  }

  render() {
    const style = require('./ApplyChain.scss');
    const {blackchainapplyData} = this.props;

    let status;
    let statusReason;

    if (blackchainapplyData && blackchainapplyData.data) {
      if (blackchainapplyData.data.isConsistent === 0) {
        status = '信息一致';
      } else if (blackchainapplyData.data.isConsistent === 1) {
        status = '信息不一致';
      }

      if (blackchainapplyData.data.inconsistencyReason === 0) {
        statusReason = '审核通过';
      } else if (blackchainapplyData.data.inconsistencyReason === 1) {
        statusReason = '待审核';
      } else if (blackchainapplyData.data.inconsistencyReason === 2) {
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
              { blackchainapplyData && blackchainapplyData.data && blackchainapplyData.status === 1 &&
              <tbody className={style['astro-personal-service-table-tbody']}>
              {trBody(['信息是否一致', status, '信息不一致原因', statusReason])}
              {trBody(['首次录入时间', moment(blackchainapplyData.data.initialCreatedOn).format('YYYY-MM-DD HH:mm:ss'), '最近更新时间', moment(blackchainapplyData.data.latestUpdatedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['首次审核时间', moment(blackchainapplyData.data.initialApprovedOn).format('YYYY-MM-DD HH:mm:ss'), '最近审核时间', moment(blackchainapplyData.data.latestApprovedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['首次上链时间', moment(blackchainapplyData.data.initialMinedOn).format('YYYY-MM-DD HH:mm:ss'), '最近上链时间', moment(blackchainapplyData.data.latestMinedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['区块号', String(blackchainapplyData.data.blockNumber), '区块哈希值', blackchainapplyData.data.blockHash])}
              {trBody(['数据哈希值', blackchainapplyData.data.dataHash, '交易哈希值', blackchainapplyData.data.txHash])}
              </tbody>}

              { blackchainapplyData && blackchainapplyData.msg && blackchainapplyData.status === 0 &&
              <tbody className={style['astro-personal-service-table-tbody']}>
              {trBody(['写链状态', blackchainapplyData.msg, '', ''])}
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
    userDetailApplyChain: state.userDetail.userDetailApplyChain,
    show: ownProps.show,

    blackchainapplyData: state.userDetail.blackchainapplyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyChainOpen: () => {
      dispatch(userDetailApplyChainOpen());
    },
    userDetailApplyChainClose: () => {
      dispatch(userDetailApplyChainClose());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyChain);
