import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderNew from '../../components/HeaderNew';
import ShareButtons from '../../containers/ShareButton';

import {portId} from '../../port';


export default class MemberAll extends Component {

  static propTypes = {
    queryMemberAll: PropTypes.func.isRequired,
    memberAllData: PropTypes.object,
    count: PropTypes.number,
    theKeyword: PropTypes.string,
    selectPage: PropTypes.func.isRequired,
    searchMemberAll: PropTypes.func.isRequired,
    saveKeyword: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.queryMemberAll(0);
  }

  componentWillUnmount() {
    this.props.selectPage(0);
  }

  onSearch() {
    this.props.selectPage(0);
    const keyword = document.getElementById('search-memberAll').value;
    this.props.searchMemberAll(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  selectPage() {
    const page = this.props.count + 1;
    this.props.selectPage(page);
    this.props.searchMemberAll(this.props.theKeyword, page);
  }

  render() {
    const style = require('./MemberAll.scss');
    const key = require('../Investment/Key.png');
    let testList;

    const { memberAllData } = this.props;

    let butn;
    if (memberAllData) {
      if (memberAllData.totalPage !== 0) {
        butn = memberAllData.isLastPage;
      } else {
        butn = true;
      }
    }
    if (memberAllData.data && memberAllData.data.length !== 0 ) {
      testList = memberAllData.data.map((transaction) => {
        return (
            <div className="col-lg-4" style={{padding: '9px', position: 'relative'}} key={transaction._id}>
                <div className={style['my-memberAll-row']} >
                  <div className={style['astro-img'] + ' col-lg-12'}>
                    <img src={transaction.img}/>
                  </div>
                  <Link to={`/info/${transaction._id}`} activeStyle={{textDecoration: 'none'}}>
                    <h3 style={{paddingLeft: '1rem', textAlign: 'center', fontSize: '24px', color: '#2b2c35'}}>{transaction.title}</h3>
                  </Link>
                  <p className={style['my-memberAll-p']} >{transaction.intro}</p>
                  <div className="col-lg-12" style={{bottom: '20px', position: 'absolute'}}>
                    <strong className="col-lg-4" style={{lineHeight: '40px'}}>分享至{' : '}</strong>
                    <div className="col-lg-8">
                      <ShareButtons
                          sites = {['qzone', 'weibo', 'qq', 'wechat']}
                          url = {portId + '/info/' + transaction._id}
                          title = {transaction.title}
                          description = {transaction.title + '--区块链新金融实验室会员项目'}
                      />
                    </div>
                  </div>
                </div>
            </div>
        );
      });
    }
    const memberColor = {background: '#e6e8f2', marginTop: '-55px', paddingBottom: '1px'};
    return (
        <div>
          <HeaderNew/>
          <div className= {style.member}>
          </div>
         <div style={memberColor}>
           <div className={'container ' + style.banner}>
             <h2>会员信息</h2>
             <p>众筹项目均为众筹联盟会员企业提交，信息提交确认后存证于区块链网络中，确保信息无法篡改</p>
           </div>
           <div className="container">
             <div className={'row ' + style.row}>
               <div className="col-lg-12" style={{marginTop: '2rem'}}>
                 <a style={{cursor: 'pointer'}}><img src={key} className={style.search} onClick={this.onSearch.bind(this)}/></a>
                 <input type="text" id="search-memberAll" className="form-control" placeholder="请输入要查询的会员名" onKeyPress={this.onSearch.bind(this)}/>
               </div>
             </div>
             <div className="row">
               {testList}
             </div>
             <div className="container" style={{textAlign: 'center', marginBottom: '10%'}}>
               { !butn &&
               <button className={style.buttonBootom} onClick={this.selectPage.bind(this)}>查看更多</button>
               }
             </div>
           </div>
         </div>
        </div>
    );
  }
}
