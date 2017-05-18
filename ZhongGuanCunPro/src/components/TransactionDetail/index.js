import React, { Component, PropTypes} from 'react';
// import Helmet from 'react-helmet';
import moment from 'moment';
import { Link } from 'react-router';
moment.locale('zh');
import { Modal, Button } from 'react-bootstrap';

class TransactionDetail extends Component {
  static propTypes = {
    transactionId: PropTypes.string,
    transaction: PropTypes.object,
    load: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    const { transactionId, load } = this.props;
    load(transactionId);
  }

  render() {
    const { transaction, error, isLoading } = this.props.transaction;
    const style = require('./index.scss');
    return (
      <div className="row" style={{width: '1200px', margin: '0 auto', marginTop: '100px'}}>
        {transaction &&
        <Modal.Dialog bsSize="lg" style={{marginTop: '100px'}}>
          <Modal.Header>
            <Modal.Title>{transaction._id} >> 交易明细</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h4 className={style.item}>发起用户：{transaction.initiatedBy.username}</h4>
            <h4 className={style.item}>交易时间：{moment(transaction.createdOn).format('YYYY-MM-DD HH:mm:ss')}</h4>
            <h4 className={style.item}>入链时间：{moment(transaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}</h4>
            <h4 className={style.item}>交易ID： {transaction.txHash.substr(2)}</h4>
            {transaction.status === 'pending' && <h4 className={style.item}>交易状态：{transaction.status}</h4>}
            {transaction.status === 'confirmed' && <h4 className={style.item}>交易状态：{transaction.status}</h4>}
            {transaction.link && <h4 className={style.item}>资源短码： {transaction.link}</h4>}
            {transaction.blockNumber && <h4 className={style.item}>区块链编码： {transaction.blockNumber}</h4>}
          </Modal.Body>

          <Modal.Footer>
            <Link to="/transactions"><Button bsStyle="primary">返回列表</Button></Link>
          </Modal.Footer>

        </Modal.Dialog>
        }
        {error &&
        <h1>{error}</h1>
        }
        {isLoading &&
        <h1>{isLoading}</h1>
        }
      </div>
    );
  }
}

export default TransactionDetail;
