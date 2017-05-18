import { connect } from 'react-redux';
import { Header } from '../../components';
import { logout } from '../../redux/modules/auth';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pathname: state.routing.locationBeforeTransitions.pathname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    pushState: (url) => {
      dispatch(push(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
