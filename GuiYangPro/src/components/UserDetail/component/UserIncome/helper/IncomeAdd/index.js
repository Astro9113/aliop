import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import {dateInput} from '../../../../../Helper/from/date';
import {numberInput} from '../../../../../Helper/from/number';

import { userDetailIncomeAddOpen, userDetailIncomeAddClose, addIcome, getUserIncome } from '../../../../../../redux/modules/userDetail';

class IncomeAdd extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailIncomeAdd: PropTypes.bool,
    userDetailIncomeAddOpen: PropTypes.func,
    userDetailIncomeAddClose: PropTypes.func,

    applyId: PropTypes.string,
    addIcome: PropTypes.func,
    addIncomeState: PropTypes.object,
    getUserIncome: PropTypes.func,
  };
  onSubimt(event) {
    const { year, lastYearTotalIncome, lastYearTotalIncomeFamily, lastYearTotalExpenditureFamily, nonproductiveExpenditureFamily,
        foodExpenditureFamily, basicLivingAllowance, heavilyDisabledAllowance, monthlyIncomeFamily, classifiedAllowance, monthlyLivingAllowance
    } = this.refs;
    event.preventDefault();

    const cuid = this.props.applyId;
    if (year.value) {
      const yearNumber = Number(year.value.split('-')[0]);
      const data = {
        year: yearNumber, lastYearTotalIncome: Number(lastYearTotalIncome.value), lastYearTotalIncomeFamily: Number(lastYearTotalIncomeFamily.value),
        lastYearTotalExpenditureFamily: Number(lastYearTotalExpenditureFamily.value), nonproductiveExpenditureFamily: Number(nonproductiveExpenditureFamily.value),
        foodExpenditureFamily: Number(foodExpenditureFamily.value), basicLivingAllowance: Number(basicLivingAllowance.value),
        heavilyDisabledAllowance: Number(heavilyDisabledAllowance.value), monthlyIncomeFamily: Number(monthlyIncomeFamily.value),
        classifiedAllowance: Number(classifiedAllowance.value), monthlyLivingAllowance: Number(monthlyLivingAllowance.value)
      };

      this.props.addIcome(cuid, data);

      setTimeout(() => {
        if (this.props.addIncomeState) {
          const state = this.props.addIncomeState;
          this.props.getUserIncome(cuid, 1);
          alert(state.msg);
        } else {
          alert('未知错误，导致保存失败！！');
        }

        this.props.userDetailIncomeAddClose();
      }, 1000);
    } else {
      alert('请选择日期!');
    }
  }
  showCard() {
    this.props.userDetailIncomeAddOpen();
  }
  closeCard() {
    this.props.userDetailIncomeAddClose();
  }

  render() {
    const style = require('./IncomeAdd.scss');
    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-6';

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>新增年度收入支出</h4>
          <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
            {dateInput(formClass, '日期', 'year')}
            {numberInput(formClass, '个人上年总收入', 'lastYearTotalIncome')}
            {numberInput(formClass, '家庭上年总收入', 'lastYearTotalIncomeFamily')}
            {numberInput(formClass, '家庭上年总支出', 'lastYearTotalExpenditureFamily')}
            {numberInput(formClass, '家庭消费性支出', 'nonproductiveExpenditureFamily')}
            {numberInput(formClass, '家庭食品支出', 'foodExpenditureFamily')}
            {numberInput(formClass, '享受低保情况', 'basicLivingAllowance')}
            {numberInput(formClass, '重度残疾人据理补贴', 'heavilyDisabledAllowance')}
            {numberInput(formClass, '家庭经济月总收入', 'monthlyIncomeFamily')}
            {numberInput(formClass, '领取分类救助金额', 'classifiedAllowance')}
            {numberInput(formClass, '家庭月领取低保金', 'monthlyLivingAllowance')}
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
    userDetailChange: state.userDetail.userDetailChange,
    show: ownProps.show,
    addIncomeState: state.userDetail.addIncomeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserIncome: (cid, page) => {
      dispatch(getUserIncome(cid, page));
    },

    userDetailIncomeAddOpen: () => {
      dispatch(userDetailIncomeAddOpen());
    },
    userDetailIncomeAddClose: () => {
      dispatch(userDetailIncomeAddClose());
    },
    addIcome: (cuid, data) => {
      dispatch(addIcome(cuid, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAdd);
