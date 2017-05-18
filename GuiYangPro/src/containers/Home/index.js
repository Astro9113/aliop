import { connect } from 'react-redux';
import {homeOpen, homeClose, applyUser } from '../../redux/modules/home';
import { queryAllUsers} from '../../redux/modules/user';

import {loads } from '../../redux/modules/auth';

import { Home } from '../../components';

const mapStateToProps = (state, ownProps) => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    homeAdd: state.home.homeAdd,

    show: ownProps.show,
    totalPage: ownProps.totalPage,
    isLogin: state.auth.isLogin,
    applyUserData: state.home.applyUserData,

    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryAllUsers: (pagenum) => {
      dispatch(queryAllUsers(pagenum));
    },
    homeOpen: () => {
      dispatch(homeOpen());
    },
    homeClose: () => {
      dispatch(homeClose());
    },

    loads: () => {
      dispatch(loads());
    },

    applyUser: (page) => {
      dispatch(applyUser(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
