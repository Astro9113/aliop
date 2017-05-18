import { connect } from 'react-redux';
import { chooseHidden } from '../../redux/modules/header';

import React, { Component, PropTypes } from 'react';
// import { IndexLink, Link } from 'react-router';

class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    ishidden: PropTypes.string,
    chooseHidden: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.chooseHidden('false');
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
    const logopng = require('./logo.png');
    // const username = require('./username.png');
    // const warning = require('./warning.png');
    const styles = require('./Header.scss');

    return (
      <div style={{margin: '0'}}>
        <header className={styles.header}>
          <img src={logopng}/>
          <h2>困难群众区块链信息统计系统</h2>
          <p>VERSION1.0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ishidden: state.header.ishidden,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseHidden: (module) => {
      dispatch(chooseHidden(module));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
