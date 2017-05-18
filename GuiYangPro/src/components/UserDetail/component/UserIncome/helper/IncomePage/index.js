import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { userDetailIncomeCurrentPage, userDetailIncomeGetPageNum, getUserIncome } from '../../../../../../redux/modules/userDetail';

class IncomePage extends Component {
  static propTypes = {
    incomeList: PropTypes.object,
    applyId: PropTypes.string,
    getUserIncome: PropTypes.func,

    userDetailIncomePageNum: PropTypes.number,
    userDetailIncomeThisPage: PropTypes.number,
    userDetailIncomeCurrentPage: PropTypes.func.isRequired,
    userDetailIncomeGetPageNum: PropTypes.func.isRequired,
  };

  BackFirst() {
    this.props.getUserIncome(this.props.applyId, 1);
  }

  Back(event) {
    const intNum = parseInt(Number(this.props.incomeList.totalPage) / 5, 0);
    const pageNum = this.props.userDetailIncomePageNum;

    const page = event.target.name;
    this.props.getUserIncome(this.props.applyId, page);

    if (pageNum > 0) {
      this.props.userDetailIncomeCurrentPage(5 * (pageNum - 1));
    }

    if (pageNum === 0) {
      this.props.userDetailIncomeCurrentPage(0);
    }

    if (pageNum > 0 && pageNum <= intNum) {
      this.props.userDetailIncomeGetPageNum(pageNum - 1);
    } else {
      this.props.userDetailIncomeGetPageNum(0);
    }
  }
  Forward(event) {
    const page = event.target.name;
    this.props.getUserIncome(this.props.applyId, page);

    const intNum = parseInt(Number(this.props.incomeList.totalPage) / 5, 0);
    const pageNum = this.props.userDetailIncomePageNum;
    const dotNum = Number(this.props.incomeList.totalPage) % 5;

    if (this.props.userDetailIncomePageNum < this.props.incomeList.totalPage) {
      const thisPage = 5 * (this.props.userDetailIncomePageNum + 1);
      if (thisPage <= this.props.incomeList.totalPage) {
        this.props.userDetailIncomeCurrentPage(Number(thisPage));
      } else {
        this.props.userDetailIncomeCurrentPage(this.props.incomeList.totalPage - 1);
      }
    }

    if ( intNum === 0) {
      this.props.userDetailIncomeGetPageNum(0);
    } else {
      if (dotNum === 0) {
        if (pageNum >= 0 && pageNum < intNum - 1) {
          this.props.userDetailIncomeGetPageNum(pageNum + 1);
        } else {
          this.props.userDetailIncomeGetPageNum(intNum - 1);
        }
      } else {
        if (pageNum >= 0 && pageNum <= intNum - 1) {
          this.props.userDetailIncomeGetPageNum(pageNum + 1);
        } else {
          this.props.userDetailIncomeGetPageNum(intNum);
        }
      }
    }
  }
  ForwardLast() {
    this.props.getUserIncome(this.props.applyId, this.props.incomeList.totalPage);
  }

  CurrentPage(event) {
    event.preventDefault();
    const thisPage = event.target.name;
    this.props.getUserIncome(this.props.applyId, thisPage);
  }

  render() {
    const style = require('./IncomePage.scss');
    const {incomeList, userDetailIncomePageNum} = this.props;

    if (incomeList) {
      // const totalItems = incomeList.totalItems;
      const totalPage = incomeList.totalPage;

      const intNum = parseInt(Number(totalPage) / 5, 0);
      const dotNum = Number(totalPage) % 5;
      const pageList = [];
      for (let nProp = 0; nProp < intNum; nProp++) {
        pageList[nProp] = Array.apply(null, {length: 5}).map((value, index) => {
          return (
              <li key={nProp * 5 + index}><a name={nProp * 5 + index + 1} onClick={this.CurrentPage.bind(this)} style={{fontSize: '14px'}}>{nProp * 5 + index + 1}</a></li>
          );
        });
      }

      if (dotNum > 0 ) {
        pageList[intNum] = Array.apply(null, {length: dotNum}).map((value, index) => {
          return (
              <li key={intNum * 5 + index}><a name={intNum * 5 + index + 1} onClick={this.CurrentPage.bind(this)} style={{fontSize: '14px'}}>{intNum * 5 + index + 1}</a></li>
          );
        });
      }

      return (
          <div className={style['astro-home-page']}>
            {!(incomeList.totalPage) &&
            <p>当前第<span className={style['astro-home-page-span']}>{' '}0/0{' '}</span>页，每页
              <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
              <span className={style['astro-home-page-span']}>0</span>{' '}条记录
            </p>
            }
            {incomeList.totalPage &&
            <p>当前第<span className={style['astro-home-page-span']}>{' '}{Number(this.props.userDetailIncomeThisPage) + 1}/{incomeList.totalPage}{' '}</span>页，每页
              <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
              <span className={style['astro-home-page-span']}>{Number(incomeList.totalItems)}</span>{' '}条记录
            </p>
            }
            {incomeList.totalPage && Number(incomeList.totalPage) > 5 &&
            <div className={style['astro-home-pageNum']}>
              <a onClick={this.BackFirst.bind(this)} style={{border: '1px solid white', borderRight: '1px solid #ccc', fontSize: '14px'}}><h2>首页</h2></a>
              <ul className={style['astro-home-pageNum'] + ' pagination pagination-lg'}>
                <li><a onClick={this.Back.bind(this)} name={Number(userDetailIncomePageNum) * 5 + 1} style={{fontSize: '14px'}}>&laquo;</a></li>
                {pageList[Number(this.props.userDetailIncomePageNum)]}
                <li><a onClick={this.Forward.bind(this)} name={Number(userDetailIncomePageNum) * 5 + 1} style={{fontSize: '14px'}}>&raquo;</a></li>
              </ul>
              <a className={style['astro-home-pageNum-a2']} onClick={this.ForwardLast.bind(this)} style={{border: '1px solid white', borderLeft: '1px solid #ccc', fontSize: '14px'}}><h2>尾页</h2></a>
            </div>
            }
            {incomeList.totalPage && !(Number(incomeList.totalPage) > 5) &&
            <div className={style['astro-home-pageNum']}>
              <ul className={style['astro-home-pageNum'] + ' pagination pagination-lg'}>
                {pageList[0]}
              </ul>
            </div>
            }
          </div>
      );
    } else if (!incomeList) {
      return (
          <div></div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    totalPage: ownProps.totalPage,

    userDetailIncomeThisPage: state.userDetail.userDetailIncomeThisPage,
    userDetailIncomePageNum: state.userDetail.userDetailIncomePageNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailIncomeCurrentPage: (pageNum) => {
      dispatch(userDetailIncomeCurrentPage(pageNum));
    },
    userDetailIncomeGetPageNum: (page) => {
      dispatch(userDetailIncomeGetPageNum(page));
    },
    getUserIncome: (cuid, page) => {
      dispatch(getUserIncome(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomePage);
