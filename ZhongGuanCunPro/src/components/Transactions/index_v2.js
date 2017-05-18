import React, { Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import moment from 'moment';
moment.locale('zh');


class Transactions extends Component {
  static propTypes = {
    transactionList: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.load();
  }
  render() {
    const { transactions, isLoading, error } = this.props.transactionList;
    let lists;
    if (transactions && transactions.length !== 0 ) {
      lists = transactions.map((transaction) => {
        return (
          <div>
            <table className="table table-hover">
              <tbody>
              <tr>
                <td>
                  <li className="list-group-item" key={transaction._id}>
                    <span>交易ID：{transaction._id}</span>{'  |  '}
                    <span>交易时间：{moment(transaction.createdOn).format('YYYY-MM-DD HH:mm:ss')}</span>{'  |  '}
                    {transaction.status === 'pending' && <span>状态：{transaction.status}</span>}
                    {transaction.status === 'confirmed' && <span>状态：{transaction.status}</span>}

                    <Link to={`/transactions/${transaction._id}`}>
                      <span className="pull-right">交易详情{' '}<i className="fa fa-arrow-right"></i></span>
                    </Link>
                  </li>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        );
      });
    }
    return (
      <div className="row" style={{marginTop: '100px', marginBottom: '120px'}}>
        <Helmet title="存证交易列表"/>
        <div className="col-lg-8 col-lg-offset-2">
          {transactions && transactions.length !== 0 &&
          <div>
            <h4 className="text-center">存证交易列表</h4>
            <ul className="list-group">{lists}</ul>
          </div>
          }
          {!isLoading && transactions && transactions.length === 0 && <h1 className="text-center" style={{'color': 'red'}}>暂无交易</h1>}
          {isLoading &&
          <h3>正在加载数据...</h3>}
          {error &&
          <h3>加载数据发生错误：{error}</h3>}
        </div>
      </div>
    );
  }
}

export default Transactions;
