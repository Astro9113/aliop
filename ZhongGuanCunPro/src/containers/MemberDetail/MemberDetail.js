import { modalClick, modalUnclick, modalLoading, memberdetail } from '../../redux/modules/memberDetail';
import { connect } from 'react-redux';
import {MemberDetail} from '../../components';

const mapStateToProps = (state, ownProps) => {
  return {
    isclick: state.memberDetail.isclick,
    isloading: state.memberDetail.isloading,
    detailId: ownProps.params.id,
    theDetail: state.memberDetail.theDetail,
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
    memberdetail: (id) => {
      dispatch(memberdetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);
