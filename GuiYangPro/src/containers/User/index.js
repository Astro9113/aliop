import { connect } from 'react-redux';
import { addUser, addClose, queryAllUsers } from '../../redux/modules/user';
import { signup } from '../../redux/modules/auth';
import { User } from '../../components';

const mapStateToProps = (state, ownProps) => {
  return {
    userAdd: state.user.userAdd,
    user: state.auth.user,

    show: ownProps.show,
    onHide: ownProps.onHide,
    onSubmit: ownProps.onHide,
    closeCard: ownProps.closeCard,

    userData: ownProps.userData,

    thisPage: ownProps.thisPage,
    pageData: ownProps.pageData,

    allUsers: state.user.allUsers,
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

    singup: (tel, identifier, username, role, password) => {
      dispatch(signup(tel, identifier, username, role, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
