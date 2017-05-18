import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserTableChange from './UserTableChange';

import { changeUser, changeClose, queryAllUsers, getUserDetail, toggleActivity} from '../../../redux/modules/user';


class UserTable extends Component {
  static propTypes = {
    queryAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.object,

    changeUser: PropTypes.func.isRequired,
    changeClose: PropTypes.func.isRequired,
    userChange: PropTypes.bool,
    userData: PropTypes.array,
    getUserDetail: PropTypes.func.isRequired,
    userActive: PropTypes.object,
    toggleActivity: PropTypes.func.isRequired,

    thisPage: PropTypes.number,
  };

  onChange(event) {
    const userid = event.target.name;
    this.props.toggleActivity(userid);
    setTimeout(() =>{
      const thisPage = Number(this.props.thisPage) + 1;
      this.props.queryAllUsers(thisPage);
    }, 1000);
  }

  showCard(event) {
    const changeid = event.target.name;
    this.props.getUserDetail(changeid);
    this.props.changeUser();
  }

  closeCard() {
    this.props.changeClose();
  }

  render() {
    const style = require('../User.scss');
    const { userChange } = this.props;

    let startList;
    if (this.props.userData && this.props.userData.length > 0 ) {
      startList = this.props.userData.map((transaction, index) => {
        let roleValue;
        if (transaction.role === 0) {
          roleValue = '管理员';
        } else if (transaction.role === 1) {
          roleValue = '信息录入';
        } else if (transaction.role === 2) {
          roleValue = '信息审核';
        } else if (transaction.role === 3) {
          roleValue = '信息查询';
        }
        return (
          <tr key={transaction._id}>
            <th>{index + 1}</th>
            <td>{transaction.username}</td><td>{transaction.tel}</td><td>{transaction.identifier}</td>
            <td>{roleValue}</td>
            <td>
              <a name={transaction._id} onClick={this.showCard.bind(this)} className={style['astro-user-table-td-a1']}>修改&nbsp;&nbsp;&nbsp;&nbsp;</a>
              {transaction.isActive === 0 &&
              <a name={transaction._id} onClick={this.onChange.bind(this)} className={style['astro-user-table-td-a2']} style={{color: 'aquamarine'}}>启用</a>
              }
              {transaction.role === 0 && transaction.isActive === 1 &&
              <a name={transaction._id} className={style['astro-user-table-td-a2']} style={{color: '#cccccc'}}>禁用</a>
              }
              {!(transaction.role === 0) && transaction.isActive === 1 &&
              <a name={transaction._id} onClick={this.onChange.bind(this)} className={style['astro-user-table-td-a2']}>禁用</a>
              }
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className="col-lg-12 table table-hover" style={{marginTop: '30px'}}>
          <thead>
          <tr className={style['astro-home-thead-tr']} >
            <th>序号</th><th>姓名</th><th>电话</th><th>身份证</th><th>角色权限</th><th>操作</th>
          </tr>
          </thead>
          <tbody>
          {startList}
          </tbody>
        </table>
        <UserTableChange show={userChange}
                         onHide={this.closeCard.bind(this)}
                         closeCard={this.closeCard.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.auth.allUsers,
    userChange: state.user.userChange,
    userActive: state.user.userActive,
    thisPage: state.user.thisPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryAllUsers: (pagenum) => {
      dispatch(queryAllUsers(pagenum));
    },
    changeUser: () => {
      dispatch(changeUser());
    },
    changeClose: () => {
      dispatch(changeClose());
    },
    getUserDetail: (userid) => {
      dispatch(getUserDetail(userid));
    },
    toggleActivity: (userid) => {
      dispatch(toggleActivity(userid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
