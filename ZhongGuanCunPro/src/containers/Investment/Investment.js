import { connect } from 'react-redux';
import { Investment } from '../../components';
import { investChoose, queryInvest, selectPage, searchInvest, saveKeyword } from '../../redux/modules/investment';

const mapStateToProps = (state) => {
  return {
    isinvest: state.investment.isinvest,
    count: state.investment.count,
    investData: state.investment.investData,
    theKeyword: state.investment.theKeyword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    investChoose: (select) => {
      dispatch(investChoose(select));
    },
    queryinvest: (pageId, invest) => {
      dispatch(queryInvest(pageId, invest));
    },
    selectPage: (page) => {
      dispatch(selectPage(page));
    },
    searchInvest: (keyword, page) => {
      dispatch(searchInvest(keyword, page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Investment);
