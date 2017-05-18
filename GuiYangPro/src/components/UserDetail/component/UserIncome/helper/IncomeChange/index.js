import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import {numberInput} from '../../../../../Helper/from/number';

import { userDetailIncomeChangeOpen, userDetailIncomeChangeClose, changeIncome, getUserIncome, queryUserDetail } from '../../../../../../redux/modules/userDetail';

class IncomeChange extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,

    userDetailIncomeChange: PropTypes.bool,
    userDetailIncomeChangeOpen: PropTypes.func,
    userDetailIncomeChangeClose: PropTypes.func,

    queryIncomeId: PropTypes.func,
    incomeAduitId: PropTypes.string,
    oneIncomeDetail: PropTypes.object,
    changeIncome: PropTypes.func,
    incomeChangeState: PropTypes.object,

    applyId: PropTypes.string,
    getUserIncome: PropTypes.func,
    queryUserDetail: PropTypes.func,
  };
  onSubimt(event) {
    const { year, lastYearTotalIncome, lastYearTotalIncomeFamily, lastYearTotalExpenditureFamily, nonproductiveExpenditureFamily,
        foodExpenditureFamily, basicLivingAllowance, heavilyDisabledAllowance, monthlyIncomeFamily, classifiedAllowance, monthlyLivingAllowance
    } = this.refs;

    event.preventDefault();

    const data = {
      year: year, lastYearTotalIncome: lastYearTotalIncome.value, lastYearTotalIncomeFamily: lastYearTotalIncomeFamily.value,
      lastYearTotalExpenditureFamily: lastYearTotalExpenditureFamily.value, nonproductiveExpenditureFamily: nonproductiveExpenditureFamily.value,
      foodExpenditureFamily: foodExpenditureFamily.value, basicLivingAllowance: basicLivingAllowance.value, heavilyDisabledAllowance: heavilyDisabledAllowance.value,
      monthlyIncomeFamily: monthlyIncomeFamily.value, classifiedAllowance: classifiedAllowance.value, monthlyLivingAllowance: monthlyLivingAllowance.value
    };

    const cuid = this.props.incomeAduitId;
    this.props.changeIncome(cuid, data);

    setTimeout(() => {
      console.log('incomeChangeState: ', this.props.incomeChangeState);
      if (this.props.incomeChangeState) {
        const state = this.props.incomeChangeState;
        alert(state.msg);
      }
      this.props.getUserIncome(this.props.applyId, 1);
      this.props.userDetailIncomeChangeClose();
    }, 700);
  }
  showCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeChangeOpen();
  }
  closeCard() {
    this.props.queryIncomeId();
    this.props.userDetailIncomeChangeClose();
  }

  render() {
    const style = require('./IncomeChange.scss');
    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-6';
    const {oneIncomeDetail} = this.props;

    return (
    <Modal show={this.props.show} onHide={this.props.onHide}>
      {oneIncomeDetail && oneIncomeDetail.data && oneIncomeDetail.data.meta &&
      <div className={style['astro-home-modal']}>
        <h4>{oneIncomeDetail.data.meta.year}年度收入支出信息修改</h4>
        <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
          {numberInput(formClass, '个人上年总收入', 'lastYearTotalIncome', oneIncomeDetail.data.meta.lastYearTotalIncome)}
          {numberInput(formClass, '家庭上年总收入', 'lastYearTotalIncomeFamily', oneIncomeDetail.data.meta.lastYearTotalIncomeFamily)}
          {numberInput(formClass, '家庭上年总支出', 'lastYearTotalExpenditureFamily', oneIncomeDetail.data.meta.lastYearTotalExpenditureFamily)}
          {numberInput(formClass, '家庭消费性支出', 'nonproductiveExpenditureFamily', oneIncomeDetail.data.meta.nonproductiveExpenditureFamily)}
          {numberInput(formClass, '家庭食品支出', 'foodExpenditureFamily', oneIncomeDetail.data.meta.foodExpenditureFamily)}
          {numberInput(formClass, '享受低保情况', 'basicLivingAllowance', oneIncomeDetail.data.meta.basicLivingAllowance)}
          {numberInput(formClass, '重度残疾人据理补贴', 'heavilyDisabledAllowance', oneIncomeDetail.data.meta.heavilyDisabledAllowance)}
          {numberInput(formClass, '家庭经济月总收入', 'monthlyIncomeFamily', oneIncomeDetail.data.meta.monthlyIncomeFamily)}
          {numberInput(formClass, '领取分类救助金额', 'classifiedAllowance', oneIncomeDetail.data.meta.classifiedAllowance)}
          {numberInput(formClass, '家庭月领取低保金', 'monthlyLivingAllowance', oneIncomeDetail.data.meta.monthlyLivingAllowance)}
        </form>
        <div className={style['astro-home-modal-button']}>
          <button key="1" onClick={this.onSubimt.bind(this)}>提交</button>
          <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.closeCard.bind(this)}>取消</button>
        </div>
      </div>
      }
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
    incomeChangeState: state.userDetail.incomeChangeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeChangeOpen: () => {
      dispatch(userDetailIncomeChangeOpen());
    },
    userDetailIncomeChangeClose: () => {
      dispatch(userDetailIncomeChangeClose());
    },
    changeIncome: (cuid, data) => {
      dispatch(changeIncome(cuid, data));
    },
    getUserIncome: (cid, page) => {
      dispatch(getUserIncome(cid, page));
    },
    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeChange);
