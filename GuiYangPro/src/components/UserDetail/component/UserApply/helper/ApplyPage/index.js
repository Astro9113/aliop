import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { userDetailApplyCurrentPage, userDetailApplyGetPageNum, getUserApply } from '../../../../../../redux/modules/userDetail';

class IncomePage extends Component {
  static propTypes = {
    applyList: PropTypes.object,
    applyId: PropTypes.string,
    getUserApply: PropTypes.func,

    userDetailApplyPageNum: PropTypes.number,
    userDetailApplyThisPage: PropTypes.number,
    userDetailApplyCurrentPage: PropTypes.func.isRequired,
    userDetailApplyGetPageNum: PropTypes.func.isRequired,
  };

  BackFirst() {
    this.props.getUserApply(this.props.applyId, 1);
  }

  Back(event) {
    const intNum = parseInt(Number(this.props.applyList.totalPage) / 5, 0);
    const pageNum = this.props.userDetailApplyPageNum;

    const page = event.target.name;
    this.props.getUserApply(this.props.applyId, page);

    if (pageNum > 0) {
      this.props.userDetailApplyCurrentPage(5 * (pageNum - 1));
    }

    if (pageNum === 0) {
      this.props.userDetailApplyCurrentPage(0);
    }

    if (pageNum > 0 && pageNum <= intNum) {
      this.props.userDetailApplyGetPageNum(pageNum - 1);
    } else {
      this.props.userDetailApplyGetPageNum(0);
    }
  }
  Forward(event) {
    const page = event.target.name;
    this.props.getUserApply(this.props.applyId, page);

    const intNum = parseInt(Number(this.props.applyList.totalPage) / 5, 0);
    const pageNum = this.props.userDetailApplyPageNum;
    const dotNum = Number(this.props.applyList.totalPage) % 5;

    if (this.props.userDetailApplyPageNum < this.props.applyList.totalPage) {
      const thisPage = 5 * (this.props.userDetailApplyPageNum + 1);
      if (thisPage <= this.props.applyList.totalPage) {
        this.props.userDetailApplyCurrentPage(Number(thisPage));
      } else {
        this.props.userDetailApplyCurrentPage(this.props.applyList.totalPage - 1);
      }
    }

    if ( intNum === 0) {
      this.props.userDetailApplyGetPageNum(0);
    } else {
      if (dotNum === 0) {
        if (pageNum >= 0 && pageNum < intNum - 1) {
          this.props.userDetailApplyGetPageNum(pageNum + 1);
        } else {
          this.props.userDetailApplyGetPageNum(intNum - 1);
        }
      } else {
        if (pageNum >= 0 && pageNum <= intNum - 1) {
          this.props.userDetailApplyGetPageNum(pageNum + 1);
        } else {
          this.props.userDetailApplyGetPageNum(intNum);
        }
      }
    }
  }
  ForwardLast() {
    this.props.getUserApply(this.props.applyId, this.props.applyList.totalPage);
  }

  CurrentPage(event) {
    event.preventDefault();
    const thisPage = event.target.name;
    this.props.getUserApply(this.props.applyId, thisPage);
  }

  render() {
    const style = require('./ApplyPage.scss');
    const {applyList, userDetailApplyPageNum} = this.props;

    if (applyList) {
      // const totalItems = applyList.totalItems;
      const totalPage = applyList.totalPage;

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
            {!(applyList.totalPage) &&
            <p>当前第<span className={style['astro-home-page-span']}>{' '}0/0{' '}</span>页，每页
              <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
              <span className={style['astro-home-page-span']}>0</span>{' '}条记录
            </p>
            }
            {applyList.totalPage &&
            <p>当前第<span className={style['astro-home-page-span']}>{' '}{Number(this.props.userDetailApplyThisPage) + 1}/{applyList.totalPage}{' '}</span>页，每页
              <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
              <span className={style['astro-home-page-span']}>{Number(applyList.totalItems)}</span>{' '}条记录
            </p>
            }
            {applyList.totalPage && Number(applyList.totalPage) > 5 &&
            <div className={style['astro-home-pageNum']}>
              <a onClick={this.BackFirst.bind(this)} style={{border: '1px solid white', borderRight: '1px solid #ccc', fontSize: '14px'}}><h2>首页</h2></a>
              <ul className={style['astro-home-pageNum'] + ' pagination pagination-lg'}>
                <li><a onClick={this.Back.bind(this)} name={Number(userDetailApplyPageNum) * 5 + 1} style={{fontSize: '14px'}}>&laquo;</a></li>
                {pageList[Number(this.props.userDetailApplyPageNum)]}
                <li><a onClick={this.Forward.bind(this)} name={Number(userDetailApplyPageNum) * 5 + 1} style={{fontSize: '14px'}}>&raquo;</a></li>
              </ul>
              <a className={style['astro-home-pageNum-a2']} onClick={this.ForwardLast.bind(this)} style={{border: '1px solid white', borderLeft: '1px solid #ccc', fontSize: '14px'}}><h2>尾页</h2></a>
            </div>
            }
            {applyList.totalPage && !(Number(applyList.totalPage) > 5) &&
            <div className={style['astro-home-pageNum']}>
              <ul className={style['astro-home-pageNum'] + ' pagination pagination-lg'}>
                {pageList[0]}
              </ul>
            </div>
            }
          </div>
      );
    } else if (!applyList) {
      return (
          <div></div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    totalPage: ownProps.totalPage,

    userDetailApplyThisPage: state.userDetail.userDetailApplyThisPage,
    userDetailApplyPageNum: state.userDetail.userDetailApplyPageNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailApplyCurrentPage: (pageNum) => {
      dispatch(userDetailApplyCurrentPage(pageNum));
    },
    userDetailApplyGetPageNum: (page) => {
      dispatch(userDetailApplyGetPageNum(page));
    },
    getUserApply: (cuid, page) => {
      dispatch(getUserApply(cuid, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomePage);
