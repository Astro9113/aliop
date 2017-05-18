import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TamperModal from './TamperModal';
import {isNanInput} from '../helper/isNan';
import { tamperOpen, tamperClose } from '../../../../redux/modules/user';
import { queryUserDetail } from '../../../../redux/modules/userDetail';

class TamperTable extends Component {
    static propTypes = {
      applyUserData: PropTypes.object,
      tamperOpen: PropTypes.func,
      tamperClose: PropTypes.func,

      tamperModal: PropTypes.bool,
      queryUserDetail: PropTypes.func,
    };

    changeTamper(event) {
      const name = event.target.name;
      this.props.queryUserDetail(name);
      this.props.tamperOpen();
    }
    showTamper() {
      this.props.tamperOpen();
    }
    render() {
      const style = require('./TamperTable.scss');
      const { applyUserData, tamperModal} = this.props;

      const aStyle = {textDecoration: 'none', cursor: 'pointer'};
      const bStyle = {textDecoration: 'none', cursor: 'pointer', color: '#cccccc'};

      let startList;
      if (applyUserData && applyUserData.data && applyUserData.data.length > 0 ) {
        startList = applyUserData.data.map((transaction, index) => {
          let name;
          let nationality;
          let sex;
          let identifier;
          let residenceCategory;
          let contactPhone;

          if (transaction.basics.meta) {
            name = transaction.basics.meta.name;
            nationality = transaction.basics.meta.nationality;
            sex = transaction.basics.meta.sex;
            identifier = transaction.basics.meta.identifier;
            residenceCategory = transaction.basics.meta.residenceCategory;
            contactPhone = transaction.basics.meta.contactPhone;
          } else {
            name = '';
            nationality = ' ';
            sex = ' ';
            identifier = ' ';
            residenceCategory = ' ';
            contactPhone = ' ';
          }

          let isConsistent;
          let inconsistencyReason;
          let newColor;
          // let stateColor;
          if (transaction.basics) {
            if (Number(transaction.basics.isConsistent) === 0) {
              isConsistent = '信息一致';
            } else if (Number(transaction.basics.isConsistent) === 1) {
              isConsistent = '信息不一致';
            }
          }

          if (transaction.basics) {
            if (Number(transaction.basics.inconsistencyReason) === 0) {
              inconsistencyReason = '审核';
              newColor = {color: '#21c26d'};
            } else if (Number(transaction.basics.inconsistencyReason) === 1) {
              inconsistencyReason = '待审核';
              newColor = {color: '#ffb007'};
            } else if (Number(transaction.basics.inconsistencyReason) === 2) {
              inconsistencyReason = '被篡改';
              newColor = {color: '#ff3d24'};
            }
          }

          return (
                  <tr key={transaction._id}>
                      <th>{index + 1}</th>
                      <td>{name}</td>
                      {isNanInput(nationality)}
                      {isNanInput(sex)}
                      {isNanInput(identifier)}
                      {isNanInput(residenceCategory)}
                      {isNanInput(contactPhone)}

                      { isConsistent && inconsistencyReason &&
                      <td>{isConsistent}<span style={newColor}>{`(${inconsistencyReason})`}</span></td>
                      }
                      { !(isConsistent && inconsistencyReason) &&
                      <td>{' '}</td>
                      }

                      {isConsistent === '信息不一致' &&
                      <td>
                          <a name={transaction._id} disabled style={bStyle}>篡改</a>
                      </td>
                      }
                      {isConsistent === '信息一致' &&
                      <td>
                          <a onClick={this.changeTamper.bind(this)} name={transaction._id} style={aStyle}>篡改</a>
                      </td>
                      }
                  </tr>
              );
        });
      }

      return (
          <div>
              <table className="col-lg-12 table table-hover" style={{marginTop: '30px'}}>
                  <thead>
                  <tr className={style['astro-home-thead-tr']} >
                      <th>序号</th><th>姓名</th><th>民族</th><th>性别</th><th>身份证</th><th>户口类型</th><th>联系电话</th>
                      <th>基本信息状态</th><th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  {startList}
                  </tbody>
              </table>
              <TamperModal show={tamperModal}
                           onHide={this.showTamper.bind(this)} />
          </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    applyUserData: state.home.applyUserData,
    tamperModal: state.user.tamperModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tamperOpen: () => {
      dispatch(tamperOpen());
    },
    tamperClose: () => {
      dispatch(tamperClose());
    },
    queryUserDetail: (id) => {
      dispatch(queryUserDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TamperTable);
