import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeUser, changeClose, queryAllUsers, getUserDetail, changeUserById} from '../../../redux/modules/user';

import {whichSelect} from './helper/select';


// <div className={style['astro-home-modal-form'] + ' form-group col-lg-12'}>
// <label htmlFor="exampleInputName2">身份证号{' '}</label><br/>
// <input ref="identifier" style={{width: '330px', height: '38px'}} type="text" className="form-control" id="exampleInputName2" placeholder={theUserDetail.data.identifier}/>
// </div>

class UserTableChange extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    closeCard: PropTypes.func.isRequired,
    theUserDetail: PropTypes.object,
    changeUserById: PropTypes.func.isRequired,
    changeClose: PropTypes.func.isRequired,
    queryAllUsers: PropTypes.func.isRequired,

    changeState: PropTypes.object,
  };

  onSubmit(event) {
    const { username, tel, password, role } = this.refs;
    event.preventDefault();
    const userid = event.target.name;

    const data = {};

    const usernameValue = username.value === '' ? '' : username.value;
    const telValue = tel.value === '' ? '' : tel.value;
    const passwordValue = password.value === '' ? '' : password.value;

    let roleValue;
    if (role.value === '管理员') {
      roleValue = 0;
    } else if (role.value === '信息录入') {
      roleValue = 1;
    } else if (role.value === '信息审核') {
      roleValue = 2;
    } else if (role.value === '信息查询') {
      roleValue = 3;
    }

    if (usernameValue !== '') { data.username = usernameValue; }
    if (telValue !== '') { data.tel = telValue; }
    if (passwordValue !== '') { data.password = passwordValue; }
    if (roleValue !== '') { data.role = roleValue; }

    this.props.changeUserById(userid, data);

    setTimeout(() => {
      if (this.props.changeState && this.props.changeState.msg) {
        const state = this.props.changeState.msg;
        alert(state);
      }
      this.props.queryAllUsers(1);
    }, 500);

    setTimeout(() => {
      this.props.changeClose();
    }, 700);
  }

  closeCard() {
    setTimeout(() => {
      this.props.changeClose();
    }, 500);
  }

  render() {
    const style = require('../User.scss');
    const {theUserDetail} = this.props;

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>修改人员</h4>
          {theUserDetail &&
          <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
            <div className={style['astro-home-modal-form'] + ' form-group col-lg-12'}>
              <label htmlFor="exampleInputName2">姓名{' '}</label><br/>
              <input ref="username" style={{width: '330px', height: '38px'}} type="text" className="form-control" id="exampleInputName2" placeholder={theUserDetail.data.username}/>
            </div>
            <div className={style['astro-home-modal-form'] + ' form-group col-lg-12'}>
              <label htmlFor="exampleInputName2">电话{' '}</label><br/>
              <input ref="tel" style={{width: '330px', height: '38px'}} type="text" className="form-control" id="exampleInputName2" placeholder={theUserDetail.data.tel}/>
            </div>
            <div className={style['astro-home-modal-form'] + ' form-group col-lg-12'}>
              <label htmlFor="exampleInputName2">密码{' '}</label><br/>
              <input ref="password" style={{width: '330px', height: '38px'}} type="password" className="form-control" />
            </div>
            <div className={style['astro-home-modal-form'] + ' form-group col-lg-12'}>
              <label htmlFor="exampleInputName2">角色权限{' '}</label><br/>
              {theUserDetail.data.role === 3 && whichSelect('信息查询')}
              {theUserDetail.data.role === 0 && whichSelect('管理员')}
              {theUserDetail.data.role === 1 && whichSelect('信息录入')}
              {theUserDetail.data.role === 2 && whichSelect('信息审核')}
            </div>
          </form>
          }
          <div className={style['astro-home-modal-button']}>
            {theUserDetail &&
            <button key="1" onClick={this.onSubmit.bind(this)} name={theUserDetail.data._id}>保存</button>
            }
            <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.closeCard.bind(this)}>关闭</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theUserDetail: state.user.theUserDetail,

    changeState: state.user.changeState,
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
    changeUserById: (changeId, changeData) => {
      dispatch(changeUserById(changeId, changeData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableChange);

