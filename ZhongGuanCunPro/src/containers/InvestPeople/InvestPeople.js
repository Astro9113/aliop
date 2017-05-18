import { connect } from 'react-redux';
import { queryInvest, selectPage } from '../../redux/modules/investment';
import React, { Component, PropTypes } from 'react';


class InvestPeople extends Component {
  static propTypes = {

    queryinvest: PropTypes.func.isRequired,
    investData: PropTypes.object,
    count: PropTypes.number,
    selectPage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const invest = 'P';
    this.props.queryinvest(0, invest);
  }

  componentDidMount() {
    this.props.selectPage(0);
  }

  render() {
    const style = require('../InvestAll/InvestAll.scss');

    const { investData } = this.props;

    let startList;
    // const eg1 = require('../InvestAll/eg.png');
    // const eg2 = require('./eg2.png');

    if (investData.data && investData.data.length !== 0 ) {
      // const test = [investData.investors[0]];
      startList = investData.data.map((transaction) => {
        let type;
        let typeColor;
        if ( transaction.cate === 'P') {
          type = '投资人';
          typeColor = '#fdcd0b';

          return (
            <div className={'col-lg-12 ' + style.star} key={transaction._id}>
              <img id={style['my-invest-img']} src={transaction.img}/>
              <div className={style['my-invest-list']}>
                <div className={style['my-radius']} style={{borderColor: `${typeColor}`}}></div>
                <h3 style={{display: 'inline-block'}}>{transaction.title}</h3>
                <p className={style.myP} style={{background: `${typeColor}`}}>{type}</p>
                <p>{transaction.cases}</p>
                <div className={style['my-radius']} style={{borderColor: `${typeColor}`}}></div>
                <h3 style={{display: 'inline-block', paddingTop: '10px'}}>投资案例</h3>
                <p style={{marginBottom: '2rem'}}>{transaction.introduction}</p>
              </div>
            </div>
          );
        }
      });
    }
    return (
      <div className={ 'container '}>
        <div className="row">
          {startList}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    investData: state.investment.investData,
    count: state.investment.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryinvest: (pageId, invest) => {
      dispatch(queryInvest(pageId, invest));
    },
    selectPage: (page) => {
      dispatch(selectPage(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestPeople);
