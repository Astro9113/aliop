import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';

import {textInput} from '../../Helper/from/text';
import {selectInput} from '../../Helper/from/select';
import {passwdInput} from '../../Helper/from/passwd';

import { connect } from 'react-redux';
import { addUser, addClose, queryAllUsers, uniqueIdentifier, uniqueTel} from '../../../redux/modules/user';
import { signup } from '../../../redux/modules/auth';

import {isCardNo} from '../../Helper/isCardNo';

class UserModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    closeCard: PropTypes.func.isRequired,

    singup: PropTypes.func.isRequired,
    addClose: PropTypes.func.isRequired,

    queryAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.object,

    signupState: PropTypes.object,
    uniqueIdentifier: PropTypes.func.isRequired,

    uniqueTel: PropTypes.func.isRequired,
    idenUnique: PropTypes.object,
    telUnique: PropTypes.object,

  };

  onSubmit(event) {
    const { username, tel, identifier, role, password } = this.refs;
    event.preventDefault();
    const cardNo = isCardNo(identifier.value);
    if (cardNo) {
      // tel, identifier, username, role, password
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
      const data = {
        tel: tel.value, identifier: identifier.value, username: username.value, role: roleValue, password: password.value
      };

      this.props.singup(data);
      setTimeout(() => {
        this.props.queryAllUsers(1);
        setTimeout(() => {
          if (this.props.signupState) {
            const state = this.props.signupState;
            if (state.status === 1) {
              alert(state.msg);
            } else if (state.status === 0) {
              alert('注册失败， 请检查身份证的合法性!!');
            }
          }
          this.props.addClose();
        }, 500);
      }, 500);
    } else {
      alert('创建失败，请检查身份证的合法性, 然后再重新创建！');
    }
  }

  checkTel() {
    const {tel} = this.refs;
    if (tel.value) {
      const telValue = tel.value;
      this.props.uniqueTel(telValue);

      setTimeout(() => {
        const telState = this.props.telUnique;
        if (telState && telState.isUnique === 0) {
          const state = telState.msg;
          alert(state);
        }
      }, 500);
    }
  }

  checkIdenti() {
    const {identifier} = this.refs;
    if (identifier.value) {
      const identifierValue = identifier.value;
      this.props.uniqueIdentifier(identifierValue);

      setTimeout(() => {
        const identiState = this.props.idenUnique;
        if (identiState && identiState.isUnique === 0) {
          const state = identiState.msg;
          alert(state);
        }
      }, 500);
    }
  }

  render() {
    const style = require('../User.scss');
    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-12';
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>添加人员</h4>
          <form className= "form-inline" style={{margin: '20px 10px 10px 20px'}} >
            {textInput(formClass, '用户名', 'username')}
            {textInput(formClass, '手机号', 'tel', '', this.checkTel.bind(this))}
            {textInput(formClass, '身份证号', 'identifier', '', this.checkIdenti.bind(this))}
            {selectInput(formClass, '角色权限', 'role', ['管理员', '信息录入', '信息审核', '信息查询'])}
            {passwdInput(formClass, '密码', 'password')}
          </form>
          <div className={style['astro-home-modal-button']}>
            <button key="1" onClick={this.onSubmit.bind(this)}>保存</button>
            <button key="2" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.props.closeCard}>关闭</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userAdd: state.user.userAdd,
    user: state.auth.user,
    show: ownProps.show,
    onHide: ownProps.onHide,
    onSubmit: ownProps.onHide,
    closeCard: ownProps.closeCard,

    thisPage: ownProps.thisPage,
    totalPage: ownProps.totalPage,
    allUsers: state.user.allUsers,
    signupState: state.auth.signupState,

    telUnique: state.user.telUnique,
    idenUnique: state.user.idenUnique,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryAllUsers: (pagenum) => {
      dispatch(queryAllUsers(pagenum));
    },
    addUser: () => {
      dispatch(addUser());
    },
    addClose: () => {
      dispatch(addClose());
    },
    singup: (data) => {
      dispatch(signup(data));
    },

    uniqueIdentifier: (id) => {
      dispatch(uniqueIdentifier(id));
    },
    uniqueTel: (id) => {
      dispatch(uniqueTel(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
