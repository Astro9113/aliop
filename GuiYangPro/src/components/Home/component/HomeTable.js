import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import {isNanInput} from '../helper/isNan';
import {getServiceState} from '../../Helper/getServiceState';

class HomeTable extends Component {
  static propTypes = {
    homeSearch: PropTypes.string,
    applyData: PropTypes.object,
  };
  render() {
    const style = require('../Home.scss');
    const { applyData} = this.props;

    let startList;
    if (applyData && applyData.data && applyData.data.length > 0 ) {
      startList = applyData.data.map((transaction, index) => {
        let name = '';
        let nationality = '';
        let sex = '';
        let identifier = '';
        let residenceCategory = '';
        let contactPhone = '';
        if (transaction && transaction.basics && transaction.basics.meta) {
          name = transaction.basics.meta.name !== undefined ? transaction.basics.meta.name : '';
          nationality = transaction.basics.meta.nationality !== undefined ? transaction.basics.meta.nationality : '';
          sex = transaction.basics.meta.sex !== undefined ? transaction.basics.meta.sex : '';
          identifier = transaction.basics.meta.identifier !== undefined ? transaction.basics.meta.identifier : '';
          residenceCategory = transaction.basics.meta.residenceCategory !== undefined ? transaction.basics.meta.residenceCategory : '';
          contactPhone = transaction.basics.meta.contactPhone !== undefined ? transaction.basics.meta.contactPhone : '';
        }

        let isConsistent;
        let inconsistencyReason;
        let newColor;
        if (transaction && transaction.basics) {
          if (transaction.basics.isConsistent !== undefined) {
            if (transaction.basics.isConsistent === 0) {
              isConsistent = '信息一致';
            } else if (transaction.basics.isConsistent === 1) {
              isConsistent = '信息不一致';
            }
          } else {
            isConsistent = '无';
          }

          if (transaction.basics.inconsistencyReason !== undefined) {
            if (transaction.basics.inconsistencyReason === 0) {
              inconsistencyReason = '审核';
              newColor = {color: '#21c26d'};
            } else if (transaction.basics.inconsistencyReason === 1) {
              inconsistencyReason = '待审核';
              newColor = {color: '#ffb007'};
            } else if (transaction.basics.inconsistencyReason === 2) {
              inconsistencyReason = '被篡改';
              newColor = {color: '#ff3d24'};
            }
          } else {
            inconsistencyReason = '无';
            newColor = {};
          }
        } else {
          isConsistent = '无';
          inconsistencyReason = '无';
          newColor = {};
        }

        let balanceisConsistent;
        let balanceinconsistencyReason;
        let balancenewColor;
        if (transaction.balance && transaction.balance.length > 0) {
          if (transaction.balance[0].isConsistent !== undefined) {
            if (Number(transaction.balance[0].isConsistent) === 0) {
              balanceisConsistent = '信息一致';
            } else if (Number(transaction.balance[0].isConsistent) === 1) {
              balanceisConsistent = '信息不一致';
            }
          } else if (transaction.balance[0].isConsistent === undefined) {
            balanceisConsistent = '无';
          }
          if (transaction.balance[0].inconsistencyReason !== undefined) {
            if (Number(transaction.balance[0].inconsistencyReason) === 0) {
              balanceinconsistencyReason = '审核';
              balancenewColor = {color: '#21c26d'};
            } else if (Number(transaction.balance[0].inconsistencyReason) === 1) {
              balanceinconsistencyReason = '待审核';
              balancenewColor = {color: '#ffb007'};
            } else if (Number(transaction.balance[0].inconsistencyReason) === 2) {
              balanceinconsistencyReason = '被篡改';
              balancenewColor = {color: '#ff3d24'};
            }
          } else if (transaction.balance[0].inconsistencyReason === undefined) {
            balanceinconsistencyReason = '无';
          }
        } else {
          balanceisConsistent = '无';
          balanceinconsistencyReason = '无';
          balancenewColor = {};
        }

        let applicationisConsistent;
        let applicationinconsistencyReason;
        let applicationnewColor;
        if (transaction.application && transaction.application.length > 0) {
          if (transaction.application[0].isConsistent !== undefined) {
            if (Number(transaction.application[0].isConsistent) === 0) {
              applicationisConsistent = '信息一致';
            } else if (Number(transaction.application[0].isConsistent) === 1) {
              applicationisConsistent = '信息不一致';
            }
          } else {
            applicationisConsistent = '无';
          }
          if (transaction.application[0].inconsistencyReason !== undefined) {
            if (Number(transaction.application[0].inconsistencyReason) === 0) {
              applicationinconsistencyReason = '审核';
              applicationnewColor = {color: '#21c26d'};
            } else if (Number(transaction.application[0].inconsistencyReason) === 1) {
              applicationinconsistencyReason = '待审核';
              applicationnewColor = {color: '#ffb007'};
            } else if (Number(transaction.application[0].inconsistencyReason) === 2) {
              applicationinconsistencyReason = '被篡改';
              applicationnewColor = {color: '#ff3d24'};
            }
          } else {
            applicationinconsistencyReason = '无';
          }
        } else {
          applicationisConsistent = '无';
          applicationinconsistencyReason = '无';
          applicationnewColor = {};
        }

        let serviceisConsistent;
        if (transaction && transaction.service) {
          const serviceData = transaction.service;
          const serviceList = getServiceState(serviceData);
          if (serviceList.length > 0) {
            serviceisConsistent = '信息不一致';
          } else {
            serviceisConsistent = '信息一致';
          }
        } else {
          serviceisConsistent = '无';
        }

        return (
          <tr key={transaction._id}>
            <th>{index + 1}</th>
            <td><Link to={`/detail/${transaction._id}`} className = {style['astro-home-table-a']}>{name}</Link></td>
            {isNanInput(nationality)}
            {isNanInput(sex)}
            {isNanInput(identifier)}
            {isNanInput(residenceCategory)}
            {isNanInput(contactPhone)}

            <td>{isConsistent}<span style={newColor}>{`(${inconsistencyReason})`}</span></td>

            <td>{balanceisConsistent}<span style={balancenewColor}>{`(${balanceinconsistencyReason})`}</span></td>

            <td>{applicationisConsistent}<span style={applicationnewColor}>{`(${applicationinconsistencyReason})`}</span></td>

            <td>{serviceisConsistent}</td>
          </tr>
        );
      });
    }

    // <th>状态</th>
    return (
      <table className="col-lg-12 table table-hover" style={{marginTop: '30px'}}>
        <thead>
        <tr className={style['astro-home-thead-tr']} >
          <th>序号</th><th>姓名</th><th>民族</th><th>性别</th><th>身份证</th><th>户口类型</th><th>联系电话</th>
          <th>基本信息状态</th><th>收支信息状态</th><th>求助信息状态</th><th>服务信息状态</th>
        </tr>
        </thead>
        <tbody>
        {startList}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeSearch: state.home.homeSearch,
  };
};

export default connect(mapStateToProps)(HomeTable);
