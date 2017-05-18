import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { chooseHidden } from '../../redux/modules/header';
import { logout } from '../../redux/modules/login';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';


@connect(
    state => ({ishidden: state.header.ishidden, user: state.login.user}),
    {logout, chooseHidden, pushState: push})
export default class HeaderNew extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    ishidden: PropTypes.string,
    chooseHidden: PropTypes.func.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func,
    pushState: PropTypes.func,
  };

  componentWillMount() {
    this.props.chooseHidden('false');
  }

  onLogout() {
    this.props.logout();
    this.props.pushState('/login');
  }

  clickHidden() {
    const state = this.props.ishidden;
    if (state === 'false') {
      this.props.chooseHidden('true');
    } else {
      this.props.chooseHidden('false');
    }
  }

  render() {
    const logo2 = require('./logNew.png');
    const style2 = require('./NewHeader.scss');

    const { ishidden, user } = this.props;

    let hiddenState;
    if (ishidden === 'true') {
      hiddenState = {right: '0'};
    } else {
      hiddenState = {right: '-150px'};
    }

    return (
      <div style={{margin: '0'}}>
        <div className= "container">
          <div className= {'container ' + style2['container-2']}>
            <IndexLink to="/"><img src={logo2}/></IndexLink>
            <ul className={style2.black} style={hiddenState}>
              <li>< span style = {{fontFamily: 'Comic Sans MS', fontSize: '14px'}}></ span > <div className={style2['my-header-button']} onClick={this.clickHidden.bind(this)}></div><IndexLink to="/">首页</IndexLink></li>
              <li className={style2.my_li2}><Link to="/project">会员公示
                <div className={style2.wb_arrow2}></div>
              </Link>
                <ul className={style2.dropdown2}>
                  <div className={style2.triangle_border_up2}>
                    <span></span>
                  </div>
                  <li className={style2.topLine}><Link to="/info">会员信息</Link></li>
                  <li><Link to="/project">项目信息</Link></li>
                </ul>
              </li>
              <li><Link to="/invest">投资机构</Link></li>
              <li> <Link to="/member">会员服务</Link></li>
              <li><IndexLink to="/application">示范应用</IndexLink></li>
              {user && user.uid &&
              <li><a onClick={this.onLogout.bind(this)}>退出</a></li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

