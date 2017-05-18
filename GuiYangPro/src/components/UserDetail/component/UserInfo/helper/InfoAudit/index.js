import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userDetailInfoAuditOpen, userDetailInfoAuditClose, auditApprove, auditDeny } from '../../../../../../redux/modules/userDetail';

class InfoAudit extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailInfoAudit: PropTypes.bool,
    userDetailInfoAuditOpen: PropTypes.func,
    userDetailInfoAuditClose: PropTypes.func,

    auditApprove: PropTypes.func,
    auditDeny: PropTypes.func,
    applyId: PropTypes.string,

    auditState: PropTypes.object,
  };

  onAudit(event) {
    const autidType = event.target.name;
    if (autidType === 'approve') {
      this.props.auditApprove(this.props.applyId);
      setTimeout(() => {
        const alertTx = this.props.auditState;
        if (alertTx.msg) {
          alert(alertTx.msg);
        } else {
          alert('未知错误！！');
        }
        this.props.userDetailInfoAuditClose();
      }, 500);
    } else if (autidType === 'deny') {
      this.props.auditDeny(this.props.applyId);
      setTimeout(() => {
        const alertTx = this.props.auditState;
        if (alertTx.msg) {
          alert(alertTx.msg);
        } else {
          alert('未知错误！！');
        }
        this.props.userDetailInfoAuditClose();
      }, 500);
    }
  }

  render() {
    const style = require('./InfoAudit.scss');

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>信息审核</h4>
          <div className={style['astro-home-modal-button']}>
            <button key="1" name="approve" onClick={this.onAudit.bind(this)}>审核通过</button>
            <button key="2" name="deny" onClick={this.onAudit.bind(this)} style={{background: '#f6f6f6', color: '#2b2c35'}}>审核驳回</button>
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
    auditState: state.userDetail.auditState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailInfoAuditOpen: () => {
      dispatch(userDetailInfoAuditOpen());
    },
    userDetailInfoAuditClose: () => {
      dispatch(userDetailInfoAuditClose());
    },

    auditApprove: (uid) => {
      dispatch(auditApprove(uid));
    },

    auditDeny: (uid) => {
      dispatch(auditDeny(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoAudit);
