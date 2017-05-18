import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/profile';
import moment from 'moment';
moment.locale('zh');

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    load: PropTypes.func,
    transactions: PropTypes.object
  };
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.props.load(user.username);
    }
  }
  render() {
    const { transactions: { transactionList, isLoading, error } } = this.props;
    let list;
    if (transactionList && transactionList.length !== 0) {
      list = transactionList.map((transaction) => {
        return (
          <tr>
            <th scope="row">
              <li className="list-group-item" key={transaction._id}>
                <h5>交易ID：{transaction.txHash.substr(2)}</h5>
                <h5>交易时间：{moment(transaction.createdOn).format('YYYY-MM-DD HH:mm:ss')}</h5>
                <h5>入链时间：{moment(transaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}</h5>
                <h5>区块号：{transaction.blockNumber}</h5>
                <h5>交易状态：{transaction.status}</h5>
              </li>
            </th>
          </tr>
        );
      });
    }

    return (
      <div className="col-lg-8 col-lg-offset-2" style={{width: '1200px', marginTop: '100px', marginBottom: '100px'}}>
        {this.props.user && this.props.user.username && <h1 className="text-center">用户：{this.props.user.username}</h1>}
        <Helmet title="用户详情"/>
        {error &&
          <div>{error}</div>
        }
        {isLoading &&
          <div>LOADINGGGGGGGGGGGGG!!!!!!!</div>
        }
        {transactionList && transactionList.length !== 0 && <ul>
          <table className="table table-hover">
            <tbody>
            {list}
            </tbody>
          </table>
          </ul>}
        {transactionList && transactionList.length === 0 && <h2 className="text-center">该用户暂无交易记录</h2>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    transactions: state.profile.transactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (username) => {
      dispatch(load(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
