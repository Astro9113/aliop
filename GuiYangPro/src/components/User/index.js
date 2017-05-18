import React, { Component, PropTypes } from 'react';

import UserPage from './component/UserPage';
import UserSearch from './component/UserSearch';
import UserTable from './component/UserTable';
import UserModal from './component/UserModal';

export default class User extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    addClose: PropTypes.func.isRequired,

    userAdd: PropTypes.bool,
    user: PropTypes.object,
    singup: PropTypes.func.isRequired,

    queryAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.object,
  };

  componentWillMount() {
    this.props.queryAllUsers(1);
  }
  componentWillUnmount() {
    this.props.addClose();
  }
  showAdd() {
    this.props.addUser();
  }

  closeAdd() {
    this.props.addClose();
  }

  render() {
    const style = require('./User.scss');
    const { userAdd, allUsers } = this.props;

    return (
      <div>
        <div className={style['astro-home']}>
          <UserSearch />
          {allUsers && allUsers.data &&
          <UserTable userData={allUsers.data}/>
          }
          {allUsers && allUsers.totalPage &&
          <UserPage pageData={allUsers} />
          }
        </div>
        <UserModal show={userAdd}
                   onHide={this.showAdd.bind(this)}
                   closeCard={this.closeAdd.bind(this)}
        />
      </div>
    );
  }
}
