import { connect } from 'react-redux';
import { chooseHidden } from '../../redux/modules/header';

import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
    const logo1 = require('./logoNew2.png');
    const style1 = require('./Header.scss');
    const { ishidden } = this.props;

    let hiddenState;
    if (ishidden === 'true') {
      hiddenState = {right: '0'};
    } else {
      hiddenState = {right: '-150px'};
    }

    return (
      <div style={{margin: '0'}}>
        <div className= "container">
          <div className= {'container ' + style1['container-1']}>
            <IndexLink to="/"><img src={logo1}/></IndexLink>
            <ul style={hiddenState}>
              <li>
                < span style = {{fontFamily: 'Comic Sans MS', fontSize: '14px'}}></ span >
                <div className={style1['my-header-button']} onClick={this.clickHidden.bind(this)}></div>
                <IndexLink to="/">首页</IndexLink>
              </li>
              <li className={style1.my_li}>会员公示
                <div className={style1.wb_arrow}></div>
                <ul className={style1.dropdown}>
                  <div className={style1.triangle_border_up}>
                    <span></span>
                  </div>
                  <li className={style1.topLine}><Link to="/info">会员信息</Link></li>
                  <li><Link to="/project">项目信息</Link></li>
                </ul>
              </li>
              <li><Link to="/invest">投资机构</Link></li>
              <li> <Link to="/member">会员服务</Link></li>
              <li><IndexLink to="/application">示范应用</IndexLink></li>
            </ul>
          </div>
        </div>
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
