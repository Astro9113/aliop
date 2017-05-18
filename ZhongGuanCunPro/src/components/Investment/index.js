import React, { Component, PropTypes } from 'react';
import HeaderNew from '../../components/HeaderNew';

import InvestAll from '../../containers/InvestAll/InvsetAll';
import InvestOrg from '../../containers/InvestOrg/InvestOrg';
import InvestPeople from '../../containers/InvestPeople/InvestPeople';

export default class Investment extends Component {
  static propTypes = {
    investChoose: PropTypes.func.isRequired,
    isinvest: PropTypes.string,
    selectPage: PropTypes.func.isRequired,
    count: PropTypes.number,
    investData: PropTypes.object,
    queryinvest: PropTypes.func.isRequired,

    theKeyword: PropTypes.string,
    searchInvest: PropTypes.func.isRequired,
    saveKeyword: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const select = 'A';
    this.props.investChoose(select);
    this.props.selectPage(0);
  }

  onSearch() {
    this.props.selectPage(0);
    const keyword = document.getElementById('search-investor').value;
    this.props.searchInvest(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  selectAll() {
    const select = 'A';
    this.props.investChoose(select);
  }
  selectOrg() {
    const select = 'C';
    this.props.investChoose(select);
  }
  selectPerson() {
    const select = 'P';
    this.props.investChoose(select);
  }

  selectPage(event) {
    const page = this.props.count + 1;
    this.props.selectPage(page);

    const keyword = this.props.theKeyword;
    if (keyword === '' || keyword === undefined) {
      const invest = event.target.name;
      this.props.queryinvest(page, invest);
    } else {
      this.props.searchInvest(keyword, page);
    }
  }

  render() {
    const style = require('./Investment.scss');
    const key = require('./Key.png');

    const {isinvest, count, investData} = this.props;

    let butn;
    if (investData) {
      if (investData.totalPage !== 0) {
        butn = investData.isLastPage;
      } else {
        butn = true;
      }
    }

    const memberColor = {background: '#e6e8f2', marginTop: '-55px', paddingBottom: '1px'};
    return (
      <div>
        <HeaderNew/>
        <div className= {style.member}>
        </div>
        <div style={memberColor}>
          <div className={'container ' + style.banner}>
            <h2>众筹联盟会员单位</h2>
            <p>众筹联盟会员单位通过联盟的认证后加入，会员信息经过核对后存证于区块链中，确保信息无法篡改</p>
          </div>
          <div className={'container ' + style.star} >
            <div className="row" style={{marginTop: '1rem'}}>
              <div className={style['my-invest-button'] + ' col-lg-6'} style={{marginTop: '-20px'}}>
                {isinvest === 'A' &&
                <div>
                  <button className={style.butttonLeft} style={{background: '#0588fa', color: '#ffffff'}} value={count} onClick={this.selectAll.bind(this)}>全部</button>
                  <button className={style.butttonLeft} value={count} onClick={this.selectOrg.bind(this)}>投资机构</button>
                  <button className={style.butttonLeft} value={count} onClick={this.selectPerson.bind(this)}>投资人</button>
                </div>
                }
                {isinvest === 'C' &&
                <div>
                  <button className={style.butttonLeft} value={count} onClick={this.selectAll.bind(this)}>全部</button>
                  <button className={style.butttonLeft} style={{background: '#0588fa', color: '#ffffff'}} value={count} onClick={this.selectOrg.bind(this)}>投资机构</button>
                  <button className={style.butttonLeft} value={count} onClick={this.selectPerson.bind(this)}>投资人</button>
                </div>
                }
                {isinvest === 'P' &&
                <div>
                  <button className={style.butttonLeft} value={count} onClick={this.selectAll.bind(this)}>全部</button>
                  <button className={style.butttonLeft} value={count} onClick={this.selectOrg.bind(this)}>投资机构</button>
                  <button className={style.butttonLeft} style={{background: '#0588fa', color: '#ffffff'}} value={count} onClick={this.selectPerson.bind(this)}>投资人</button>
                </div>
                }
              </div>
              <div className={style['my-invest-search'] + ' col-lg-4'} style={{float: 'right', paddingRight: '20px'}}>
                <a style={{cursor: 'pointer'}}><img src={key} className={style.search}/></a>
                <input type="text" id="search-investor" className={style['my-invest-input'] + ' form-control'} placeholder="请输入要查询的投资机构、投资人" onKeyPress={this.onSearch.bind(this)}/>
              </div>
            </div>
          </div>
          {isinvest === 'A' &&
          <InvestAll/>
          }
          {isinvest === 'C' &&
          <InvestOrg/>
          }
          {isinvest === 'P' &&
          <InvestPeople/>
          }
          <div className="container" style={{textAlign: 'center', marginBottom: '10%'}}>
            { !butn &&
            <button name = {isinvest} className={style.buttonBootom} onClick={this.selectPage.bind(this)}>查看更多</button>
            }
          </div>
        </div>
      </div>
    );
  }
}
