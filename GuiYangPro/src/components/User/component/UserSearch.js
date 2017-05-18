import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { addUser, addClose, searchUser, queryAllUsers } from '../../../redux/modules/user';
import { applyUser } from '../../../redux/modules/home';

class UserSearch extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    addClose: PropTypes.func.isRequired,
    userAdd: PropTypes.bool,
    searchUser: PropTypes.func.isRequired,
    queryAllUsers: PropTypes.func.isRequired,

    applyUser: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  onSearch() {
    const keyword = document.getElementById('search-user').value;
    if (keyword) {
      this.props.searchUser(keyword);
    } else {
      this.props.queryAllUsers(1);
    }
  }

  getTamper() {
    this.props.applyUser(1);
  }

  showCard() {
    this.props.addUser();
  }

  render() {
    const style = require('../User.scss');
    const key = require('../../Home/Key.png');
    const {user} = this.props;
    const tamperStyle = {marginTop: '0', marginLeft: '800px', background: '#ff3d24', border: '1px solid #ff3d24'};
    return (
      <div className={style['astro-home-search']}>
        <a><img src={key}/></a>
        <input type="text" className="form-control" placeholder="请输入人员姓名" id="search-user" onKeyPress={this.onSearch.bind(this)}/>
        {user && user.role === 0 && user.tel === '4444' &&
        <Link to="/tamper" >
          <button key="1" className={style['astro-home-buttonBootom']} style={tamperStyle} onClick={this.getTamper.bind(this)}>信息篡改演示</button>
        </Link>
        }
        <button key="4" className={style['astro-home-buttonBootom']} onClick={this.showCard.bind(this)}>{'+ '}添加人员</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAdd: state.user.userAdd,
    user: state.auth.user,
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
    searchUser: (keyword) => {
      dispatch(searchUser(keyword));
    },

    applyUser: (page) => {
      dispatch(applyUser(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
