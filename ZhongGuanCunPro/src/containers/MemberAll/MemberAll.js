import { connect } from 'react-redux';
import { MemberAll } from '../../components';
import { queryMemberAll, selectPage, searchMemberAll, saveKeyword } from '../../redux/modules/memberAll';

const mapStateToProps = (state) => {
  return {
    memberAllData: state.memberAll.memberAllData,
    count: state.memberAll.count,
    theKeyword: state.memberAll.theKeyword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryMemberAll: (pageId) => {
      dispatch(queryMemberAll(pageId));
    },

    selectPage: (page) => {
      dispatch(selectPage(page));
    },
    searchMemberAll: (keyword, page) => {
      dispatch(searchMemberAll(keyword, page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberAll);
