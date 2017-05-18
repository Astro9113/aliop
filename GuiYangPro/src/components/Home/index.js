import React, { Component, PropTypes } from 'react';

import HomeModal from './component/HomeModal';
import HomeTable from './component/HomeTable';
import HomePage from './component/HomePage';
import HomeSearch from './component/HomeSearch';

export default class Home extends Component {
  static propTypes = {
    homeClose: PropTypes.func.isRequired,
    homeOpen: PropTypes.func.isRequired,
    homeAdd: PropTypes.bool,

    isLogin: PropTypes.bool,
    loads: PropTypes.func,
    queryAllUsers: PropTypes.func,
    applyUser: PropTypes.func,

    applyUserData: PropTypes.object,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.loads();
    this.props.applyUser(1);
    if (this.props.user && this.props.user.role && this.props.user.role === 0) {
      this.props.queryAllUsers(1);
    }
  }
  componentWillUnmount() {
    this.props.homeClose();
  }
  showCard() {
    this.props.homeOpen();
  }
  isLogin() {
    this.props.loads();
  }
  render() {
    const style = require('./Home.scss');
    const { homeAdd, applyUserData } = this.props;

    return (
      <div>
        <div className={style['astro-home']}>
          <HomeSearch />
          {applyUserData && applyUserData.data &&
          <HomeTable applyData = {applyUserData}/>
          }
          {applyUserData &&
          <HomePage pageData={applyUserData} />
          }
        </div>
        <HomeModal show={homeAdd}
                   onHide={this.showCard.bind(this)}
        />
      </div>
    );
  }
}
