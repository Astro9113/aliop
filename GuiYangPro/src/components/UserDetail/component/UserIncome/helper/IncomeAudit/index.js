import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userDetailIncomeAuditOpen, userDetailIncomeAuditClose, queryIncomeId, incomeAuditApprove, incomeauditDeny, getUserIncome }
    from '../../../../../../redux/modules/userDetail';

class IncomeAudit extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailIncomeAudit: PropTypes.bool,
    userDetailIncomeAuditOpen: PropTypes.func,
    userDetailIncomeAuditClose: PropTypes.func,

    queryIncomeId: PropTypes.func,
    incomeAduitId: PropTypes.string,

    incomeAuditApprove: PropTypes.func,
    incomeauditDeny: PropTypes.func,
    incomeAuditState: PropTypes.object,
    getUserIncome: PropTypes.func,

    applyId: PropTypes.string,
  };
  onSubmit(event) {
    const name = event.target.name;
    if (name === 'approve') {
      this.props.incomeAuditApprove(this.props.incomeAduitId);
    } else if (name === 'deny') {
      this.props.incomeauditDeny(this.props.incomeAduitId);
    }

    setTimeout(() => {
      if (this.props.incomeAuditState && this.props.incomeAuditState.msg) {
        this.props.getUserIncome(this.props.applyId, 1);
        alert(this.props.incomeAuditState.msg);
      } else {
        alert('保存失败， 错误未知!!!!');
      }
      this.props.queryIncomeId();
      this.props.userDetailIncomeAuditClose();
    }, 500);
  }
  showCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeAuditOpen();
  }
  closeCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeAuditClose();
  }

  render() {
    const style = require('./IncomeAudit.scss');

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
    userDetailIncomeAudit: state.userDetail.userDetailIncomeAudit,
    show: ownProps.show,

    incomeAuditState: state.userDetail.incomeAuditState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeAuditOpen: () => {
      dispatch(userDetailIncomeAuditOpen());
    },
    userDetailIncomeAuditClose: () => {
      dispatch(userDetailIncomeAuditClose());
    },
    queryIncomeId: (id) => {
      dispatch(queryIncomeId(id));
    },
    incomeAuditApprove: (id) => {
      dispatch(incomeAuditApprove(id));
    },
    incomeauditDeny: (id) => {
      dispatch(incomeauditDeny(id));
    },
    getUserIncome: (cid, page) => {
      dispatch(getUserIncome(cid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAudit);
