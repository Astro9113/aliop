import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {User, Home, Login} from '../../containers';
class Root extends Component {
    static propTypes = {
      user: PropTypes.object,
    };
    render() {
      const { user } = this.props;
      return (
        <div>
            {user && user.role === 0 &&
            < User/>
            }
            {user && (user.role === 1 || user.role === 2 || user.role === 3) &&
            < Home/>
            }
            {!(user.role === 0 || user.role === 1 || user.role === 2 || user.role === 3) &&
            < Login/>
            }
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Root);
