import { connect } from 'react-redux';
import { loadDetail } from '../../redux/modules/transactions';
import { TransactionDetail } from '../../components';
import { modalOpen, setContent } from '../../redux/modules/popup';

const mapStateToProps = (state, ownProps) => {
  return {
    transaction: state.transactions.activeTransaction,
    transactionId: ownProps.params.id,
    isopen: state.popup.isopen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(loadDetail(id));
    },
    alertOpen: () => {
      dispatch(modalOpen());
    },
    alertText: (desc) => {
      dispatch(setContent(desc));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
