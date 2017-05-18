import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IncomeAdd from './helper/IncomeAdd';
import IncomeTable from './helper/IncomeTable';
import IncomePage from './helper/IncomePage';

import { userDetailIncomeAddOpen, userDetailIncomeAddClose, getUserIncome,
}
from '../../../../redux/modules/userDetail';

class UserIncome extends Component {
  static propTypes = {
    applyId: PropTypes.string,
    user: PropTypes.object,
    transactionId: PropTypes.string,

    userDetailIncomeAdd: PropTypes.bool,
    userDetailIncomeAddOpen: PropTypes.func,
    userDetailIncomeAddClose: PropTypes.func,

    addIncomeData: PropTypes.object,
    getUserIncome: PropTypes.func,
    incomeList: PropTypes.object,
  };
  componentWillUnmount() {
    this.props.userDetailIncomeAddClose();
  }
  IncomeAdd() {
    this.props.userDetailIncomeAddOpen();
  }
  render() {
    const style = require('./UserIncome.scss');
    const income = require('../../img/income.png');
    const {userDetailIncomeAdd, user, applyId, incomeList} = this.props;

    return (
      <div className={style['astro-personal-income'] + ' clearfix' } id="income">
        <div className={style['astro-personal-income-line']}></div>
        <div className={style['astro-personal-income-title']}>
          <img src={income} /><p>年度收入支出</p>
        </div>
        {(user.role === '信息录入' || Number(user.role) === 1) &&
        <button className={style['astro-personal-income-button']} onClick={this.IncomeAdd.bind(this)}>{' + '}新增</button>
        }
        <IncomeTable incomeList={incomeList} applyId={applyId}/>
        <IncomeAdd show={userDetailIncomeAdd} onHide={this.IncomeAdd.bind(this)} applyId={applyId}/>
        <IncomePage incomeList={incomeList} applyId={applyId}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailIncomeAdd: state.userDetail.userDetailIncomeAdd,
    userDetailIncomeChange: state.userDetail.userDetailIncomeChange,
    user: state.auth.user,
    addIncomeData: state.userDetail.addIncomeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeAddOpen: () => {
      dispatch(userDetailIncomeAddOpen());
    },
    userDetailIncomeAddClose: () => {
      dispatch(userDetailIncomeAddClose());
    },
    getUserIncome: (cid, page) => {
      dispatch(getUserIncome(cid, page));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIncome);
