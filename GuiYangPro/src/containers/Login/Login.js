import { connect } from 'react-redux';
import { Login } from '../../components';
import { login, clearError, clearLoginState, loads } from '../../redux/modules/auth';
import { push } from 'react-router-redux';

import { applyUser } from '../../redux/modules/home';
import { queryAllUsers } from '../../redux/modules/user';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, password) => {
      dispatch(login(user, password));
    },
    pushState: () => {
      dispatch(push());
    },

    applyUser: (pagenum) => {
      dispatch(applyUser(pagenum));
    },
    queryAllUsers: (pagenum) =>{
      dispatch(queryAllUsers(pagenum));
    },
    clearError: () => {
      dispatch(clearError());
    },
    clearLoginState: () => {
      dispatch(clearLoginState());
    },
    loads: () => {
      dispatch(loads());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
