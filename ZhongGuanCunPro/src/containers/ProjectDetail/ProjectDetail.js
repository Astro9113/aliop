import { modalClick, modalUnclick, modalLoading, projectdetail } from '../../redux/modules/projectDetail';
import { connect } from 'react-redux';
import {ProjectDetail} from '../../components';

const mapStateToProps = (state, ownProps) => {
  return {
    isclick: state.projectDetail.isclick,
    isloading: state.projectDetail.isloading,
    detailId: ownProps.params.id,
    theDetail: state.projectDetail.theDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unclick: () => {
      dispatch(modalUnclick());
    },
    click: () => {
      dispatch(modalClick());
    },
    myloading: () => {
      dispatch(modalLoading());
    },
    projectdetail: (id) => {
      dispatch(projectdetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
