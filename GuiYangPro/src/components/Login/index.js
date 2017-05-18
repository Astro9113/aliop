import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    applyUser: PropTypes.func,
    queryAllUsers: PropTypes.func,
    loginError: PropTypes.object,
    clearError: PropTypes.func,

    clearLoginState: PropTypes.func,
    loggingIn: PropTypes.bool,
    loads: PropTypes.func,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const pwd = this.refs.password;

    const self = this;
    global.dataRefreshNotifier.on('onLoginComplete', function NoName() {
      const userRole = self.props.user.role;
      const loginErr = self.props.loginError;

      if (loginErr && loginErr.msg) {
        alert(loginErr.msg);
        self.props.clearError();
        self.props.clearLoginState();
      } else {
        if (userRole === 0 || userRole === 1 || userRole === 2 || userRole === 3) {
          self.props.loads();
          if (Number(userRole) === 0) {
            self.props.queryAllUsers(1);
            browserHistory.push('/user');
          } else {
            self.props.applyUser(1);
            browserHistory.push('/home');
          }
        }
      }
    });
    this.props.login(input.value, pwd.value);

    input.value = '';
    pwd.value = '';
  };

  render() {
    const styles = require('./Login.scss');
    const version1 = require('./version1.0.png');

    return (
      <div>
        <Helmet title="login"/>
        <div className={styles['astro-login']}>
          <img src={version1}/>

          <div className={styles['astro-login-right']}>
            <form>
              <div className={'form-group ' + styles['astro-login-right-user']} key="0">
                  <label htmlFor="exampleInputEmail1"><strong>手机号{' / '}</strong> <span>MOBILE</span></label>
                <input type="text" className="form-control" id="exampleInputName2" ref="username" placeholder="请输入用户手机号" />
              </div>
              <div className={'form-group ' + styles['astro-login-right-user']} key="1">
                <label htmlFor="exampleInputPassword1"><strong>密码{' / '}</strong> <span>PASSWORD</span></label>
                <input type="password" className="form-control" id="exampleInputPassword1" ref="password" placeholder="请输入密码" />
              </div>
              <button type="submit" className={styles['astro-login-right-btn']} onClick={this.handleSubmit.bind(this)} key="login_button">登录</button>
              <p>忘记密码或无法登录请联系管理员</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
