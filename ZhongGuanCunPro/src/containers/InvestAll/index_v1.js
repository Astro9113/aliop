import React, { Component, PropTypes } from 'react';

const investment = {
  type: '机构',
  totalList: [
    {'id': '1', 'title': '有闲有品', 'eag': '投资案列', 'eagDes': '用途用途用途用途用途用途用途用途用途用途',
      'description': '将input和img放同一行，img标签总是比input高出一个头，难看。后来在网站搜到最多的就是给img添加一个 align=absmiddle属性，这个方法似乎的确可行，但是不符合HTML标准。' +
      '后来发现同时给input和img添加vertical- align:middle就行在写css时，使得input和img在同一行居中对齐的方法'},
    {'id': '2', 'title': '有闲有品', 'eag': '投资案列', 'eagDes': '用途用途用途用途用途用途用途用途用途用途',
      'description': '将input和img放同一行，img标签总是比input高出一个头，难看。后来在网站搜到最多的就是给img添加一个 align=absmiddle属性，这个方法似乎的确可行，但是不符合HTML标准。' +
      '后来发现同时给input和img添加vertical- align:middle就行在写css时，使得input和img在同一行居中对齐的方法'},
  ]
};

export default class InvestAll extends Component {
  static propTypes = {
    pathname: PropTypes.string,
  };

  render() {
    const style = require('./InvestAll.scss');
    const { pathname } = this.props;
    console.log('pathname', pathname);
    let startList;


    const eg1 = require('./eg.png');
    // const eg2 = require('./eg2.png');

    if (investment.totalList && investment.totalList.length !== 0 ) {
      startList = investment.totalList.map((transaction) => {
        return (
          <div className={'col-lg-12 ' + style.star}>
            <img src={eg1}/>
            <div style={{marginLeft: '18rem'}}>
              <h2 style={{display: 'inline-block'}}>{transaction.title}</h2>
              <p className={style.myP}>{investment.type}</p>
              <p>{transaction.description}</p>
              <h4 style={{marginTop: '2rem'}}>{transaction.eag}</h4>
              <p>{transaction.eagDes}</p>
              <li className="row" style={{listStyle: 'none'}}>
                <p className="col-lg-1" style={{marginTop: '1rem'}}>分享到:</p>
                <div className="social-share col-lg-10" data-sites="weibo,qq,qzone,tencent,wechat" style={{padding: '0'}}></div>
              </li>
            </div>
          </div>
        );
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
