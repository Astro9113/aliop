import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {logins} from '../../redux/modules/login';
import { browserHistory } from 'react-router';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    logins: PropTypes.func.isRequired,
    logout: PropTypes.func,

  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const pwd = this.refs.password;

    const self = this;
    global.dataRefreshNotifier.on('onLoginComplete', function NoName() {
      if (self.props.user && self.props.user.uid) {
        browserHistory.push('/cms');
      } else {
        alert('登陆失败， 请检查账号和密码后重新登录。');
      }
    });

    this.props.logins(input.value, pwd.value);
    input.value = '';
    pwd.value = '';
  };

  render() {
    const styles = require('./Login.scss');
    const welcome = require('./welcome-to-wanglu-tece.png');

    const normal = require('./normal.png');
    // const after = require('./after.png');
    // const down = require('./down.png');

    return (
        <div className={'row ' + styles.loginPage}>
          <Helmet title="系统登陆"/>
          <div className={styles.login}>
            <img src={welcome} />
            <div className={styles.form}>
              <h1>登录</h1>
              <form className={'col-lg-8 col-lg-offset-2 ' + styles.from1} >
                <div className="form-group" >
                  <label>账号</label>
                  <input type="text" ref="username" placeholder="请输入用户名" className="form-control" />
                </div>
                <div className="form-group">
                  <label>密码</label>
                  <input type="password" ref="password" placeholder="请输入密码" className="form-control" />
                </div>
                <div className={'clearfix ' + styles.buttons} >
                  <a className={styles.aa} onClick={this.handleSubmit.bind(this)}>
                    <img src={normal}/>
                    <span>登录</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    memberAllData: state.memberAll.memberAllData,
    count: state.memberAll.count,
    theKeyword: state.memberAll.theKeyword,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logins: (username, passwd) => {
      dispatch(logins(username, passwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
