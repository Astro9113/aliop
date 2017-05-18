import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from '../../redux/modules/auth';
import { Link } from 'react-router';


@connect(
  state => ({
    user: state.auth.user,
  }),
  authActions)
export default class Signup extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    signup: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      button: 0,
    };
  }

  onMouseOver() {
    this.setState(
      {button: 1}
    );
  }

  onMouseLeave() {
    this.setState(
      {button: 0}
    );
  }

  onMouseDown() {
    this.setState(
      {button: 2}
    );
  }

  onMouseUp() {
    this.setState(
      {button: 0}
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username.value.trim();
    const pwd = this.refs.password.value.trim();
    this.props.signup(username, pwd);
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.setState(
      {button: 0}
    );
  };

  render() {
    const styles = require('../Login/Login.scss');

    const normal = require('../Login/normal.png');
    const after = require('../Login/after.png');
    const down = require('../Login/down.png');
    const welcome = require('../Login/welcome-to-wanglu-tece.png');

    let image;
    if (this.state.button === 1) {
      image = after;
    } else if (this.state.button === 2) {
      image = down;
    } else {
      image = normal;
    }

    return (
      <div className={'row ' + styles.loginPage}>
        <Helmet title="注册"/>
        <div className={styles.login}>
          <img src={welcome} />
          <div className={styles.form}>
            <h1>注册</h1>
            <form className={'col-lg-8 col-lg-offset-2 ' + styles.from1} onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group" >
                <label>账号</label>
                <input type="text" ref="username" placeholder="WANGLUTECH" className="form-control" />
              </div>
              <div className="form-group">
                <label>密码</label>
                <input type="password" ref="password" placeholder="请输入密码" className="form-control" />
              </div>
              <div className={'clearfix ' + styles.buttons} >
                <a className={styles.aa}
                   onClick={(event) => this.handleSubmit(event)}>
                  <img src={image} onMouseLeave={this.onMouseLeave.bind(this)} onMouseOver={this.onMouseOver.bind(this)}
                       onMouseUp={this.onMouseUp.bind(this)} onMouseDown={this.onMouseDown.bind(this)}/>
                  <span>注册</span>
                </a>
                <Link to="/login" ><p className={styles.pp}>登录</p></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
