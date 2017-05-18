import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userDetailApplyAuditOpen, userDetailApplyAuditClose, queryApplyId, applyAuditApprove, applyAuditDeny, getUserApply } from '../../../../../../redux/modules/userDetail';

class IncomeAudit extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailApplyAudit: PropTypes.bool,
    userDetailApplyAuditOpen: PropTypes.func,
    userDetailApplyAuditClose: PropTypes.func,

    queryApplyId: PropTypes.func,
    applyAduitId: PropTypes.string,

    applyAuditApprove: PropTypes.func,
    applyAuditDeny: PropTypes.func,
    applyAuditState: PropTypes.object,

    getUserApply: PropTypes.func,
    applyId: PropTypes.string,
  };

  onSubmit(event) {
    const name = event.target.name;
    if (name === 'approve') {
      this.props.applyAuditApprove(this.props.applyAduitId);
    } else if (name === 'deny') {
      this.props.applyAuditDeny(this.props.applyAduitId);
    }

    setTimeout(() => {
      this.props.getUserApply(this.props.applyId, 1);
      if (this.props.applyAuditState && this.props.applyAuditState.msg) {
        alert(this.props.applyAuditState.msg);
      } else {
        alert('保存失败， 错误未知!!!!');
      }
      this.props.queryApplyId();
      this.props.userDetailApplyAuditClose();
    }, 500);
  }
  showCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyAuditOpen();
  }
  closeCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyAuditClose();
  }

  render() {
    const style = require('./ApplyAudit.scss');

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>信息审核</h4>
          <div className={style['astro-home-modal-button']}>
            <button key="1" onClick={this.onSubmit.bind(this)} name="approve">审核通过</button>
            <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.onSubmit.bind(this)} name="deny">审核驳回</button>
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
    userDetailApplyAudit: state.userDetail.userDetailApplyAudit,
    show: ownProps.show,

    applyAuditState: state.userDetail.applyAuditState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyAuditOpen: () => {
      dispatch(userDetailApplyAuditOpen());
    },
    userDetailApplyAuditClose: () => {
      dispatch(userDetailApplyAuditClose());
    },
    queryApplyId: (id) => {
      dispatch(queryApplyId(id));
    },
    applyAuditApprove: (id) => {
      dispatch(applyAuditApprove(id));
    },
    applyAuditDeny: (id) => {
      dispatch(applyAuditDeny(id));
    },
    getUserApply: (cuid, page) => {
      dispatch(getUserApply(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAudit);
