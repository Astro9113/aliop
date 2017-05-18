import { connect } from 'react-redux';
import { load, loadDetail} from '../../redux/modules/transactions';
import { Transactions } from '../../components';
import { modalOpen, setContent } from '../../redux/modules/popup';

const mapStateToProps = (state) => {
  return {
    transactionList: state.transactions.transactionList,
    isopen: state.popup.isopen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(load());
    },
    alertOpen: () => {
      dispatch(modalOpen());
    },
    alertText: (desc) => {
      dispatch(setContent(desc));
    },
    detail: (id) => {
      dispatch(loadDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
