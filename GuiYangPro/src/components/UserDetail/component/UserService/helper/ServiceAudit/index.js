import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userDetailServiceAuditOpen, userDetailServiceAuditClose, approveService, denyService, saveSeriveName, queryUserDetail } from '../../../../../../redux/modules/userDetail';

class ServiceAudit extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    applyId: PropTypes.string,
    queryUserDetail: PropTypes.func,

    userDetailServiceAudit: PropTypes.bool,
    userDetailServiceAuditOpen: PropTypes.func,
    userDetailServiceAuditClose: PropTypes.func,

    userDetailData: PropTypes.object,
    theServiceName: PropTypes.string,
    approveService: PropTypes.func,
    denyService: PropTypes.func,
    auidtServiceState: PropTypes.object,
    saveSeriveName: PropTypes.func,
  };

  onSubmit(event) {
    const name = event.target.name;
    const id = event.target.value;
    const AuditServiceName = this.props.theServiceName;
    if (name === 'approve') {
      console.log('审核通过', 'id: ', id, 'name: ', AuditServiceName);
      this.props.approveService(id, AuditServiceName);
    } else if (name === 'deny') {
      console.log('审核驳回', 'id: ', id, 'name: ', AuditServiceName);
      this.props.denyService(id, AuditServiceName);
    }

    setTimeout(() => {
      if (this.props.auidtServiceState) {
        const state = this.props.auidtServiceState;
        alert(state.msg);
        this.props.queryUserDetail(this.props.applyId);
      } else {
        alert('审核失败！！！');
      }
      this.props.userDetailServiceAuditClose();
      this.props.saveSeriveName();
    }, 500);
  }
  showCard() {
    this.props.userDetailServiceAuditOpen();
    this.props.saveSeriveName();
  }

  render() {
    const style = require('./ServiceAudit.scss');
    const {userDetailData} = this.props;

    let userServiceData;
    if (userDetailData && userDetailData.data && userDetailData.data.service) {
      userServiceData = userDetailData.data.service;
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>信息审核</h4>
          { userServiceData &&
          <div className={style['astro-home-modal-button']}>
            <button key="1" name="approve" value={userServiceData._id} onClick={this.onSubmit.bind(this)}>审核通过</button>
            <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} name="deny" value={userServiceData._id} onClick={this.onSubmit.bind(this)}>审核驳回</button>
          </div>
          }
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailServiceAudit: state.userDetail.userDetailServiceAudit,
    show: ownProps.show,

    userDetailData: state.userDetail.userDetailData,
    theServiceName: state.userDetail.theServiceName,
    auidtServiceState: state.userDetail.auidtServiceState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailServiceAuditOpen: () => {
      dispatch(userDetailServiceAuditOpen());
    },
    userDetailServiceAuditClose: () => {
      dispatch(userDetailServiceAuditClose());
    },
    approveService: (id, name) => {
      dispatch(approveService(id, name));
    },
    denyService: (id, name) => {
      dispatch(denyService(id, name));
    },
    saveSeriveName: (name) => {
      dispatch(saveSeriveName(name));
    },
    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAudit);
