import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPageNum, currentPage, applyUser, applyUserAudit } from '../../../redux/modules/home';

class HomePage extends Component {
  static propTypes = {
    pageData: PropTypes.object,
    pageNum: PropTypes.number,
    thisPage: PropTypes.number,
    getPageNum: PropTypes.func.isRequired,
    currentPage: PropTypes.func.isRequired,

    applyUser: PropTypes.func,
    homeSearch: PropTypes.string,
    applyUserAudit: PropTypes.func,
  };

  BackFirst() {
    this.props.getPageNum(0);
    this.props.currentPage(0);

    if (this.props.homeSearch === 'all') {
      this.props.applyUser(1);
    } else if (this.props.homeSearch === 'tamper') {
      this.props.applyUserAudit(2, 1);
    } else if (this.props.homeSearch === 'audit') {
      this.props.applyUserAudit(1, 1);
    }
  }
  Back(event) {
    const intNum = parseInt(Number(this.props.pageData.totalPage) / 5, 0);
    const pageNum = this.props.pageNum;

    const page = event.target.name;
    if (Number(page) - 1 > 0) {
      if (this.props.homeSearch === 'all') {
        this.props.applyUser((Number(page) - 1 ) * 5 + 1);
      } else if (this.props.homeSearch === 'tamper') {
        this.props.applyUserAudit(2, ((Number(page) - 1 ) * 5 + 1));
      } else if (this.props.homeSearch === 'audit') {
        this.props.applyUserAudit(1, ((Number(page) - 1 ) * 5 + 1));
      }
    } else {
      if (this.props.homeSearch === 'all') {
        this.props.applyUser(1);
      } else if (this.props.homeSearch === 'tamper') {
        this.props.applyUserAudit(2, 1);
      } else if (this.props.homeSearch === 'audit') {
        this.props.applyUserAudit(1, 1);
      }
    }

    if (pageNum > 0) {
      this.props.currentPage(5 * (pageNum - 1));
    }

    if (pageNum === 0) {
      this.props.currentPage(0);
    }

    if (pageNum > 0 && pageNum <= intNum) {
      this.props.getPageNum(pageNum - 1);
    } else {
      this.props.getPageNum(0);
    }
  }
  Forward(event) {
    const page = event.target.name;
    console.log('Forwardpage', page);
    const totalPage = this.props.pageData.totalPage;
    // const pageDataNum = Number(this.props.pageData.totalItems) % 5;
    if ((Number(page) + 5) < totalPage) {
      if (this.props.homeSearch === 'all') {
        this.props.applyUser(Number(page) + 5);
      } else if (this.props.homeSearch === 'tamper') {
        this.props.applyUserAudit(2, (Number(page) + 5));
      } else if (this.props.homeSearch === 'audit') {
        this.props.applyUserAudit(1, Number(page) + 5);
      }
    } else {
      const lastPage = parseInt(Number(this.props.pageData.totalItems) / 10, 0);
      if (this.props.homeSearch === 'all') {
        this.props.applyUser(lastPage + 1);
      } else if (this.props.homeSearch === 'tamper') {
        this.props.applyUserAudit(2, lastPage + 1);
      } else if (this.props.homeSearch === 'audit') {
        this.props.applyUserAudit(1, lastPage + 1);
      }
    }


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
    if (this.props.homeSearch === 'all') {
      this.props.applyUser(this.props.pageData.totalPage);
    } else if (this.props.homeSearch === 'tamper') {
      this.props.applyUserAudit(2, this.props.pageData.totalPage);
    } else if (this.props.homeSearch === 'audit') {
      this.props.applyUserAudit(1, this.props.pageData.totalPage);
    }
  }

  CurrentPage(event) {
    event.preventDefault();
    const thisPage = event.target.name;
    if (this.props.homeSearch === 'all') {
      this.props.applyUser(Number(thisPage) + 1);
    } else if (this.props.homeSearch === 'tamper') {
      this.props.applyUserAudit(2, Number(thisPage) + 1);
    } else if (this.props.homeSearch === 'audit') {
      this.props.applyUserAudit(1, Number(thisPage) + 1);
    }
    this.props.currentPage(Number(thisPage));
  }

  render() {
    const style = require('../Home.scss');

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
        { this.props.pageData.totalPage && this.props.pageData.totalItems &&
          <p>当前第<span className={style['astro-home-page-span']}>{' '}{Number(this.props.thisPage) + 1}/{this.props.pageData.totalPage}{' '}</span>页，每页
            <span className={style['astro-home-page-span']}>{' '}10{' '}</span>条，共{' '}
            <span className={style['astro-home-page-span']}>{Number(this.props.pageData.totalItems)}</span>{' '}条记录
          </p>
        }
        {Number(this.props.pageData.totalPage) > 5 &&
        <div className={style['astro-home-pageNum']}>
          <a onClick={this.BackFirst.bind(this)}><h2>首页</h2></a>
          <ul className="pagination pagination-lg">
            <li><a onClick={this.Back.bind(this)} name={Number(pageNum)}>&laquo;</a></li>
            {totalPage[Number(this.props.pageNum)]}
            <li><a onClick={this.Forward.bind(this)} name={Number(this.props.thisPage) + 1}>&raquo;</a></li>
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
    pageNum: state.home.pageNum,
    thisPage: state.home.thisPage,
    homeSearch: state.home.homeSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyUser: (pagenum) => {
      dispatch(applyUser(pagenum));
    },

    getPageNum: (pageNum) => {
      dispatch(getPageNum(pageNum));
    },
    currentPage: (page) => {
      dispatch(currentPage(page));
    },
    applyUserAudit: (key, page) => {
      dispatch(applyUserAudit(key, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
