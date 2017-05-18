import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userDetailApplyChangeOpen, userDetailApplyChangeClose, changeApply, getUserApply } from '../../../../../../redux/modules/userDetail';

import {dateInput} from '../../../../../Helper/from/date';
import {numberInput} from '../../../../../Helper/from/number';
import {selectInput} from '../../../../../Helper/from/select';
import {textInput} from '../../../../../Helper/from/text';

class ApplyChange extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailApplyChange: PropTypes.bool,
    userDetailApplyChangeOpen: PropTypes.func,
    userDetailApplyChangeClose: PropTypes.func,

    queryApplyId: PropTypes.func,
    applyAduitId: PropTypes.string,

    oneApplyDetail: PropTypes.object,
    applyChangeState: PropTypes.object,
    changeApply: PropTypes.func,
    getUserApply: PropTypes.func,
    applyId: PropTypes.string,
  };
  onSubimt(event) {
    const { appliedQuantity, paymentMethod, paymentDue, payer, recipient, recipientRelation, helpAskedOn, helpAskedReason,
        bankAccountNum, deseaseName, deseaseCategory, totalExpenditure, selfExpenseQTY, govAllowance
    } = this.refs;

    event.preventDefault();

    const data = {
      appliedQuantity: appliedQuantity.value, paymentMethod: paymentMethod.value, paymentDue: paymentDue.value,
      payer: payer.value, recipient: recipient.value, recipientRelation: recipientRelation.value,
      helpAskedOn: helpAskedOn.value, helpAskedReason: helpAskedReason.value, bankAccountNum: bankAccountNum.value,
      deseaseName: deseaseName.value, deseaseCategory: deseaseCategory.value, totalExpenditure: totalExpenditure.value,
      selfExpenseQTY: selfExpenseQTY.value, govAllowance: govAllowance.value,
    };

    const cuid = this.props.applyAduitId;
    this.props.changeApply(cuid, data);

    setTimeout(() => {
      if (this.props.applyChangeState) {
        const state = this.props.applyChangeState;
        alert(state.msg);
      }
      this.props.getUserApply(this.props.applyId, 1);
      this.props.userDetailApplyChangeClose();
    }, 700);
  }
  showCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyChangeOpen();
  }
  closeCard() {
    this.props.queryApplyId();
    this.props.userDetailApplyChangeClose();
  }

  render() {
    const style = require('./ApplyChange.scss');
    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-6';
    const {oneApplyDetail} = this.props;

    return (
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <div className={style['astro-home-modal']}>
            <h4>救助资金信息修改</h4>
            {oneApplyDetail && oneApplyDetail.data && oneApplyDetail.data.meta &&
            <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
              {numberInput(formClass, '救助金额', 'appliedQuantity', oneApplyDetail.data.meta.appliedQuantity)}
              {selectInput(formClass, '支付方式', 'paymentMethod', ['现金', '银行卡转账'], '', oneApplyDetail.data.meta.paymentMethod)}
              {dateInput(formClass, '支付时间', 'paymentDue', oneApplyDetail.data.meta.paymentDue)}
              {textInput(formClass, '付款人', 'payer', oneApplyDetail.data.meta.payer)}
              {textInput(formClass, '收款人', 'recipient', oneApplyDetail.data.meta.recipient)}
              {selectInput(formClass, '收款人关系', 'recipientRelation', ['本人', '亲属'], '', oneApplyDetail.data.meta.recipientRelation)}
              {dateInput(formClass, '救助时间', 'helpAskedOn', oneApplyDetail.data.meta.helpAskedOn)}
              {textInput(formClass, '救助事由', 'helpAskedReason', oneApplyDetail.data.meta.helpAskedReason)}
              {numberInput(formClass, '银行账号', 'bankAccountNum', oneApplyDetail.data.meta.bankAccountNum)}
              {textInput(formClass, '疾病名称', 'deseaseName', oneApplyDetail.data.meta.deseaseName)}
              {textInput(formClass, '疾病种类', 'deseaseCategory', oneApplyDetail.data.meta.deseaseCategory)}
              {numberInput(formClass, '医疗总费用', 'totalExpenditure', oneApplyDetail.data.meta.totalExpenditure)}
              {numberInput(formClass, '本人承担（元）', 'selfExpenseQTY', oneApplyDetail.data.meta.selfExpenseQTY)}
              {numberInput(formClass, '民政救助金额', 'govAllowance', oneApplyDetail.data.meta.govAllowance)}
            </form>
            }
            <div className={style['astro-home-modal-button']}>
              <button key="1" onClick={this.onSubimt.bind(this)}>提交</button>
              <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.closeCard.bind(this)}>取消</button>
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
    userDetailApplyChange: state.userDetail.userDetailApplyChange,
    show: ownProps.show,

    applyChangeState: state.userDetail.applyChangeState,
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
    changeApply: (cuid, data) => {
      dispatch(changeApply(cuid, data));
    },
    getUserApply: (cuid, page) => {
      dispatch(getUserApply(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyChange);
