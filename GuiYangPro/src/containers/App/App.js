import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Helmet from 'react-helmet';
import Footer from '../../components/Footer';
import { Link } from 'react-router';

import {logout, loads } from '../../redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    {logout, loads, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    loads: PropTypes.func,
  };

  componentWillMount() {
    this.props.loads();
    // if (this.props.user && this.props.user.uid) {
    //
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && this.props.user.username) {
      if (this.props.user.username && !nextProps.user.username) {
        // logout
        this.props.pushState('/');
      }
    }
  }
  //   if (!this.props.user.username && nextProps.user.username) {
  //     // login
  //     this.props.pushState('/home');
  //   } else if (this.props.user.username && !nextProps.user.username) {
  //     // logout
  //     this.props.pushState('/');
  //   }
  // }

  logout() {
    this.props.logout();
    setTimeout(() => {
      this.props.pushState('/');
    }, 500);
  }

  render() {
    const styles = require('./App.scss');
    const headerStyles = require('../../components/Header/Header.scss');

    const logopng = require('../../components/Header/logo.png');
    const username = require('../../components/Header/username.png');
    const warning = require('../../components/Header/warning.png');
    const Shape = require('../../components/Header/Shape.png');

    const {user} = this.props;

    return (
      <div>
        <Helmet title="困难群众区块链信息统计系统"/>
        <header className={headerStyles.header} id="appHeader">
          <div className="row" style={{width: '100%'}}>
            <div className="col-md-8">
              {Number(user.role) === 0 &&
              <Link to="/user"><img src={logopng}/></Link>
              }
              {!(Number(user.role) === 0) &&
              <Link to="/home"><img src={logopng}/></Link>
              }
              <h2>困难群众区块链信息统计系统</h2>
              <p>VERSION1.0</p>
            </div>
            <div className="col-md-4">
              {(Number(user.role) === 0) && user && user.username &&
              <div className={headerStyles['astro-header-people']}>
                <Link to="/user" ><img src={username} /><p>用户管理</p></Link>
              </div>
              }

              {!(Number(user.role) === 0) && user && user.username &&
              <div className={headerStyles['astro-header-news'] + ' ' + headerStyles['astro-header-people']}>
                <Link to="/warn" ><img src={warning} /><p>信息统计预警</p></Link>
              </div>
              }

              {user && user.username &&
              <div className={headerStyles['astro-header-user-button']}>
                <img src={Shape} style={{top: '0', left: '0'}}/>
                <p>{user.username}{' / '} <a onClick={this.logout.bind(this)}>退出</a></p>
              </div>
              }
            </div>
          </div>
        </header>
        <div className={styles.body}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

// <Footer/>

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => {
//       dispatch(logout());
//     },
//   pushState: pu()
//     },
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
