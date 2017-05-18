import { connect } from 'react-redux';

import { queryUserDetail, getUserIncome, getUserApply } from '../../redux/modules/userDetail';
import { applyUser } from '../../redux/modules/home';
import { UserDetail } from '../../components';

const mapStateToProps = (state, ownProps) => {
  return {
    applyId: ownProps.params.id,
    userDetailData: state.userDetail.userDetailData,
    incomeList: state.userDetail.incomeList,
    applyList: state.userDetail.applyList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
    applyUser: (page) => {
      dispatch(applyUser(page));
    },
    getUserIncome: (cuid, page) => {
      dispatch(getUserIncome(cuid, page));
    },
    getUserApply: (cuid, page) => {
      dispatch(getUserApply(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
