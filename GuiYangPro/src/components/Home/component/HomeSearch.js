import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { homeOpen, getSearch, searchApply, applyUser, applyUserAudit } from '../../../redux/modules/home';

class HomeSearch extends Component {
  static propTypes = {
    homeOpen: PropTypes.func.isRequired,
    homeAdd: PropTypes.bool,
    homeSearch: PropTypes.string,
    getSearch: PropTypes.func.isRequired,
    searchApply: PropTypes.func.isRequired,
    applyUser: PropTypes.func.isRequired,

    user: PropTypes.object,
    applyUserAudit: PropTypes.func,
  };
  onSearch() {
    const keyword = document.getElementById('search-apply').value;
    if (keyword) {
      this.props.searchApply(keyword, 1);
    } else {
      this.props.applyUser(1);
    }
  }
  getSearch(event) {
    event.preventDefault();
    const name = event.target.name;
    this.props.getSearch(name);

    if (name === 'all') {
      this.props.applyUser(1);
    } else if (name === 'tamper') {
      this.props.applyUserAudit(2, 1);
    } else if (name === 'audit') {
      this.props.applyUserAudit(1, 1);
    }
  }
  showCard() {
    this.props.homeOpen();
  }

  render() {
    const style = require('../Home.scss');
    const key = require('../Key.png');

    const {homeSearch, user} = this.props;
    return (
      <div className={style['astro-home-search']}>
        <a><img src={key}/></a>
        <input type="text" className="form-control" placeholder="请输入人员姓名" id="search-apply" onKeyPress={this.onSearch.bind(this)}/>
        {homeSearch === 'all' &&
        <div>
          <button onClick={this.getSearch.bind(this)} key="1" className={style['astro-home-butttonLeft']} style={{background: '#0588fa', color: '#ffffff'}} name="all">全部</button>
          <button onClick={this.getSearch.bind(this)} key="2" className={style['astro-home-butttonLeft']} style={{left: '37%'}} name="tamper">被篡改</button>
          <button onClick={this.getSearch.bind(this)} key="3" className={style['astro-home-butttonLeft']} style={{left: '43%'}} name="audit">待审核</button>
        </div>
        }
        {homeSearch === 'tamper' &&
        <div>
          <button onClick={this.getSearch.bind(this)} key="1" className={style['astro-home-butttonLeft']} name="all">全部</button>
          <button onClick={this.getSearch.bind(this)} key="2" className={style['astro-home-butttonLeft']} style={{left: '37%', background: '#0588fa', color: '#ffffff'}} name="tamper">被篡改</button>
          <button onClick={this.getSearch.bind(this)} key="3" className={style['astro-home-butttonLeft']} style={{left: '43%'}} name="audit">待审核</button>
        </div>
        }
        {homeSearch === 'audit' &&
        <div>
          <button onClick={this.getSearch.bind(this)} key="1" className={style['astro-home-butttonLeft']} name="all">全部</button>
          <button onClick={this.getSearch.bind(this)} key="2" className={style['astro-home-butttonLeft']} style={{left: '37%'}} name="tamper">被篡改</button>
          <button onClick={this.getSearch.bind(this)} key="3" className={style['astro-home-butttonLeft']} style={{left: '43%', background: '#0588fa', color: '#ffffff'}} name="audit">待审核</button>
        </div>
        }
        {(user.role === '信息录入' || user.role === '1' || user.role === 1) &&
        <button key="4" className={style['astro-home-buttonBootom']} onClick={this.showCard.bind(this)}>{'+ '}添加人员</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeAdd: state.home.homeAdd,
    homeSearch: state.home.homeSearch,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    homeOpen: () => {
      dispatch(homeOpen());
    },
    getSearch: (search) => {
      dispatch(getSearch(search));
    },
    searchApply: (keyword, page) => {
      dispatch(searchApply(keyword, page));
    },
    applyUser: (page) => {
      dispatch(applyUser(page));
    },
    applyUserAudit: (key, page) => {
      dispatch(applyUserAudit(key, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearch);
