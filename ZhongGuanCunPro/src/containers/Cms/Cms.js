import { connect } from 'react-redux';
import { Cms } from '../../components';
import { selectModule, closeCMS, openCMS } from '../../redux/modules/cms';

const mapStateToProps = (state) => {
  return {
    cmsModule: state.cms.cmsModule,
    cmsShow: state.cms.cmsShow,
    pathname: state.routing.locationBeforeTransitions.pathname,

    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectModule: (module) => {
      dispatch(selectModule(module));
    },

    closeCMS: () => {
      dispatch(closeCMS());
    },

    openCMS: () => {
      dispatch(openCMS());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cms);
