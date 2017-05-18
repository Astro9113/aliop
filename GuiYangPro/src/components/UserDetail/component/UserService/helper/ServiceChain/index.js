import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import moment from 'moment';
moment.locale('zh');

import {trBody} from '../../../../../Helper/from/tr';

import { userDetailServiceChainOpen, userDetailServiceChainClose, saveSeriveName, clearBlockchainService } from '../../../../../../redux/modules/userDetail';

class ServiceChain extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailServiceChain: PropTypes.bool,
    userDetailServiceChainOpen: PropTypes.func,
    userDetailServiceChainClose: PropTypes.func,

    userDetailData: PropTypes.object,
    theServiceName: PropTypes.string,
    theServiceBlockchain: PropTypes.object,
    saveSeriveName: PropTypes.func,

    clearBlockchainService: PropTypes.func,
  };
  showCard() {
    this.props.userDetailServiceChainOpen();
  }
  closeCard() {
    this.props.saveSeriveName();
    this.props.clearBlockchainService();
    this.props.userDetailServiceChainClose();
  }

  render() {
    const style = require('./ServiceChain.scss');
    const {theServiceBlockchain} = this.props;

    let status;
    let statusReason;

    if (theServiceBlockchain && theServiceBlockchain.data) {
      if (theServiceBlockchain.data.isConsistent === 0) {
        status = '信息一致';
      } else if (theServiceBlockchain.data.isConsistent === 1) {
        status = '信息不一致';
      }

      if (theServiceBlockchain.data.inconsistencyReason === 0) {
        statusReason = '审核通过';
      } else if (theServiceBlockchain.data.inconsistencyReason === 1) {
        statusReason = '待审核';
      } else if (theServiceBlockchain.data.inconsistencyReason === 2) {
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
              { theServiceBlockchain && theServiceBlockchain.data && theServiceBlockchain.status === 1 &&
              <tbody className={style['astro-personal-service-table-tbody']}>
              {trBody(['信息是否一致', status, '信息不一致原因', statusReason])}
              {trBody(['首次录入时间', moment(theServiceBlockchain.data.initialCreatedOn).format('YYYY-MM-DD HH:mm:ss'), '最近更新时间', moment(theServiceBlockchain.data.latestUpdatedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['首次审核时间', moment(theServiceBlockchain.data.initialApprovedOn).format('YYYY-MM-DD HH:mm:ss'), '最近审核时间', moment(theServiceBlockchain.data.latestApprovedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['首次上链时间', moment(theServiceBlockchain.data.initialMinedOn).format('YYYY-MM-DD HH:mm:ss'), '最近上链时间', moment(theServiceBlockchain.data.latestMinedOn).format('YYYY-MM-DD HH:mm:ss')])}
              {trBody(['区块号', String(theServiceBlockchain.data.blockNumber), '区块哈希值', theServiceBlockchain.data.blockHash])}
              {trBody(['数据哈希值', theServiceBlockchain.data.dataHash, '交易哈希值', theServiceBlockchain.data.txHash])}
              </tbody>}
              { theServiceBlockchain && theServiceBlockchain.msg && theServiceBlockchain.status === 0 &&
              <tbody className={style['astro-personal-service-table-tbody']}>
              {trBody(['写链状态', theServiceBlockchain.msg, '', ''])}
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
    userDetailServiceChain: state.userDetail.userDetailServiceChain,
    show: ownProps.show,

    userDetailData: state.userDetail.userDetailData,
    theServiceName: state.userDetail.theServiceName,
    theServiceBlockchain: state.userDetail.theServiceBlockchain,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailServiceChainOpen: () => {
      dispatch(userDetailServiceChainOpen());
    },
    userDetailServiceChainClose: () => {
      dispatch(userDetailServiceChainClose());
    },
    saveSeriveName: (name) => {
      dispatch(saveSeriveName(name));
    },
    clearBlockchainService: () => {
      dispatch(clearBlockchainService());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceChain);
