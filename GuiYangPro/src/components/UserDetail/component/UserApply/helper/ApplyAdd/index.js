import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import {enumaKey, dictIsNull} from '../../../../../Helper/enumaVal';

import { userDetailApplyAddOpen, userDetailApplyAddClose, addApply, getUserApply } from '../../../../../../redux/modules/userDetail';

import {dateInput} from '../../../../../Helper/from/date';
import {numberInput} from '../../../../../Helper/from/number';
import {selectInput} from '../../../../../Helper/from/select';
import {textInput} from '../../../../../Helper/from/text';

class ApplyAdd extends Component {
  static propTypes = {
    applyId: PropTypes.string,

    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailApplyAdd: PropTypes.bool,
    userDetailApplyAddOpen: PropTypes.func,
    userDetailApplyAddClose: PropTypes.func,

    addApplyState: PropTypes.object,
    addApply: PropTypes.func,

    getUserApply: PropTypes.func,
  };

  onSubimt(event) {
    const { appliedQuantity, paymentMethod, paymentDue, payer, recipient, recipientRelation, helpAskedOn, helpAskedReason,
        bankAccountNum, deseaseName, deseaseCategory, totalExpenditure, selfExpenseQTY, govAllowance
    } = this.refs;
    event.preventDefault();

    const cuid = this.props.applyId;

    const data = {
      appliedQuantity: appliedQuantity.value, paymentMethod: paymentMethod.value, paymentDue: paymentDue.value,
      payer: payer.value, recipient: recipient.value, recipientRelation: recipientRelation.value,
      helpAskedOn: helpAskedOn.value, helpAskedReason: helpAskedReason.value, bankAccountNum: bankAccountNum.value,
      deseaseName: deseaseName.value, deseaseCategory: deseaseCategory.value, totalExpenditure: totalExpenditure.value,
      selfExpenseQTY: selfExpenseQTY.value, govAllowance: govAllowance.value,
    };

    const dataValue = enumaKey(data);
    const dataLength = dictIsNull(dataValue);
    if (dataLength) {
      this.props.addApply(cuid, dataValue);

      setTimeout(() => {
        if (this.props.addApplyState) {
          this.props.getUserApply(cuid, 1);
          const state = this.props.addApplyState;
          alert(state.msg);
        } else {
          alert('未知错误，导致保存失败！！');
        }

        this.props.userDetailApplyAddClose();
      }, 1000);
    } else {
      alert('提交的数据不能都为空！！');
    }
  }

  showCard() {
    this.props.userDetailApplyAddOpen();
  }
  closeCard() {
    this.props.userDetailApplyAddClose();
  }

  render() {
    const style = require('./ApplyAdd.scss');

    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-6';

    // {numberInput(formClass, '救助次数', 'nonproductiveExpenditureFamily')}
    return (
    <Modal show={this.props.show} onHide={this.props.onHide}>
      <div className={style['astro-home-modal']}>
        <h4>救助资金申请</h4>
        <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
          {numberInput(formClass, '救助金额', 'appliedQuantity')}
          {selectInput(formClass, '支付方式', 'paymentMethod', ['现金', '银行卡转账'])}
          {dateInput(formClass, '支付时间', 'paymentDue')}
          {textInput(formClass, '付款人', 'payer')}
          {textInput(formClass, '收款人', 'recipient')}
          {selectInput(formClass, '收款人关系', 'recipientRelation', ['本人', '亲属'])}
          {dateInput(formClass, '救助时间', 'helpAskedOn')}
          {textInput(formClass, '救助事由', 'helpAskedReason')}
          {numberInput(formClass, '银行账号', 'bankAccountNum')}
          {textInput(formClass, '疾病名称', 'deseaseName')}
          {textInput(formClass, '疾病种类', 'deseaseCategory')}
          {numberInput(formClass, '医疗总费用', 'totalExpenditure')}
          {numberInput(formClass, '本人承担（元）', 'selfExpenseQTY')}
          {numberInput(formClass, '民政救助金额', 'govAllowance')}
        </form>
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
    userDetailApplyAdd: state.userDetail.userDetailApplyAdd,
    show: ownProps.show,
    addApplyState: state.userDetail.addApplyState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyAddOpen: () => {
      dispatch(userDetailApplyAddOpen());
    },
    userDetailApplyAddClose: () => {
      dispatch(userDetailApplyAddClose());
    },
    addApply: (cuid, data) => {
      dispatch(addApply(cuid, data));
    },
    getUserApply: (cuid, page) => {
      dispatch(getUserApply(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyAdd);
