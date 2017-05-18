import React, {PropTypes} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { modalClose } from '../../redux/modules/popup';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Popup extends React.Component {
  static propTypes = {
    alertClose: PropTypes.func.isRequired,
    isopen: PropTypes.bool,
    alertContent: PropTypes.object,
    transactionList: PropTypes.object.isRequired,
    transaction: PropTypes.object,
  };

  // openModal() {
  //   this.props.alertOpen();
  // }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.refs.subtitle.style.color = '#f00';
  // }

  closeModal() {
    this.props.alertClose();
  }

  render() {
    const { isopen, alertContent} = this.props;
    let lists;
    if (alertContent && alertContent.hasOwnProperty('test')) {
      lists = <div><strong ref="subtitle">{alertContent.test}</strong></div>;
    } else if (alertContent && alertContent.hasOwnProperty('text')) {
      lists = <div><p><strong ref="subtitle">提示: </strong>{alertContent.text}</p></div>;
    } else if (alertContent && alertContent.hasOwnProperty('transactionDetail')) {
      const { transaction, error, isLoading } = this.props.transaction;
      const style = require('./index.scss');
      lists = (<div><h2>{transaction._id} >> 交易明细</h2>
        {transaction &&
        <div>
          <h4 className={style.item}>发起用户：{transaction.initiatedBy.username}</h4>
          <h4 className={style.item}>交易时间：{moment(transaction.createdOn).format('YYYY-MM-DD HH:mm:ss')}</h4>
          <h4 className={style.item}>入链时间：{moment(transaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}</h4>
          <h4 className={style.item}>交易ID： {transaction.txHash.substr(2)}</h4>
          {transaction.status === 'pending' && <h4 className={style.item}>交易状态：{transaction.status}</h4>}
          {transaction.status === 'confirmed' && <h4 className={style.item}>交易状态：{transaction.status}</h4>}
          {transaction.link && <h4 className={style.item}>资源短码： {transaction.link}</h4>}
          {transaction.blockNumber && <h4 className={style.item}>区块链编码： {transaction.blockNumber}</h4>}
        </div>
        }
        {error &&
        <h1>{error}</h1>
        }
        {isLoading &&
        <h1>{isLoading}</h1>
        }
      </div>);
    }
    return (
      <Modal
        isOpen={isopen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {lists}
        <button onClick={this.closeModal.bind(this)}>close</button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isopen: state.popup.isopen,
    alertContent: state.popup.alertContent,
    transactionList: state.transactions.transactionList,
    transaction: state.transactions.activeTransaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertClose: () => {
      dispatch(modalClose());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
