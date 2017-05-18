import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPageNum, currentPage, queryAllUsers } from '../../../redux/modules/user';

class UserPage extends Component {
  static propTypes = {
    pageData: PropTypes.object,
    pageNum: PropTypes.number,
    thisPage: PropTypes.number,
    getPageNum: PropTypes.func.isRequired,
    currentPage: PropTypes.func.isRequired,
    queryAllUsers: PropTypes.func.isRequired,
  };

  BackFirst() {
    this.props.getPageNum(0);
    this.props.currentPage(0);
    this.props.queryAllUsers(1);
  }
  Back() {
    const intNum = parseInt(Number(this.props.pageData.totalPage) / 5, 0);
    const pageNum = this.props.pageNum;

    if (this.props.pageNum > 0) {
      this.props.currentPage(5 * (this.props.pageNum - 1));
    }

    if (pageNum > 0 && pageNum <= intNum) {
      this.props.getPageNum(pageNum - 1);
    } else {
      this.props.getPageNum(0);
    }
    this.props.queryAllUsers(this.props.thisPage + 1);
  }
  Forward() {
    const intNum = parseInt(Number(this.props.pageData.totalPage) / 5, 0);
    const pageNum = this.props.pageNum;
    const dotNum = Number(this.props.pageData.totalPage) % 5;

    if (this.props.pageNum < this.props.pageData.totalPage) {
      const thisPage = 5 * (this.props.pageNum + 1);
      if (thisPage <= this.props.pageData.totalPage) {
        this.props.currentPage(Number(thisPage));
      } else {
        this.props.currentPage(this.props.pageData.totalPage - 1);
      }
    }

    if ( intNum === 0) {
      this.props.getPageNum(0);
    } else {
      if (dotNum === 0) {
        if (pageNum >= 0 && pageNum < intNum - 1) {
          this.props.getPageNum(pageNum + 1);
        } else {
          this.props.getPageNum(intNum - 1);
        }
      } else {
        if (pageNum >= 0 && pageNum <= intNum - 1) {
          this.props.getPageNum(pageNum + 1);
        } else {
          this.props.getPageNum(intNum);
        }
      }
    }
    this.props.queryAllUsers(this.props.thisPage + 1);
  }
  ForwardLast() {
    const intNum = parseInt(Number(this.props.pageData.totalPage) / 5, 0);
    const dotNum = Number(this.props.pageData.totalPage) % 5;

    this.props.currentPage(this.props.pageData.totalPage - 1);

    if ( intNum === 0) {
      this.props.getPageNum(0);
    } else {
      if (dotNum === 0) {
        this.props.getPageNum(intNum - 1);
      } else {
        this.props.getPageNum(intNum);
      }
    }
    this.props.queryAllUsers(this.props.thisPage + 1);
  }

  CurrentPage(event) {
    event.preventDefault();
    const thisPage = event.target.name;
    this.props.currentPage(Number(thisPage));

    this.props.queryAllUsers(Number(thisPage) + 1);
  }

  render() {
    const style = require('../User.scss');
    const {pageNum} = this.props;
    const intNum = parseInt(Number(this.props.pageData.totalPage) / 5, 0);
    const dotNum = Number(this.props.pageData.totalPage) % 5;
    const totalPage = [];

    for (let nProp = 0; nProp < intNum; nProp++) {
      totalPage[nProp] = Array.apply(null, {length: 5}).map((value, index) => {
        return (
          <li key={nProp * 5 + index}><a name={nProp * 5 + index} onClick={this.CurrentPage.bind(this)}>{nProp * 5 + index + 1}</a></li>
        );
      });
    }

    if (dotNum > 0 ) {
      totalPage[intNum] = Array.apply(null, {length: dotNum}).map((value, index) => {
        return (
          <li key={intNum * 5 + index}><a name={intNum * 5 + index} onClick={this.CurrentPage.bind(this)}>{intNum * 5 + index + 1}</a></li>
        );
      });
    }
    return (
      <div className={style['astro-home-page']}>
        <p>当前第<span className={style['astro-home-page-span']}>{' '}{Number(this.props.thisPage) + 1}/{this.props.pageData.totalPage}{' '}</span>页，每页
          <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
          <span className={style['astro-home-page-span']}>{Number(this.props.pageData.totalItems)}</span>{' '}条记录
        </p>
        {Number(this.props.pageData.totalPage) > 5 &&
        <div className={style['astro-home-pageNum']}>
          <a onClick={this.BackFirst.bind(this)}><h2>首页</h2></a>
          <ul className="pagination pagination-lg">
            <li><a onClick={this.Back.bind(this)} name={Number(pageNum) * 5 + 1}>&laquo;</a></li>
            {totalPage[Number(this.props.pageNum)]}
            <li><a onClick={this.Forward.bind(this)} name={Number(pageNum) * 5 + 1}>&raquo;</a></li>
          </ul>
          <a className={style['astro-home-pageNum-a2']} onClick={this.ForwardLast.bind(this)}><h2>尾页</h2></a>
        </div>
        }
        {!(Number(this.props.pageData.totalPage) > 5) &&
        <div className={style['astro-home-pageNum']}>
          <ul className="pagination pagination-lg">
            {totalPage[Number(this.props.pageNum)]}
          </ul>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNum: state.user.pageNum,
    thisPage: state.user.thisPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryAllUsers: (pagenum) => {
      dispatch(queryAllUsers(pagenum));
    },
    getPageNum: (pageNum) => {
      dispatch(getPageNum(pageNum));
    },
    currentPage: (page) => {
      dispatch(currentPage(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
