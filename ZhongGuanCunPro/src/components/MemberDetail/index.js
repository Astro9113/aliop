import React, { Component, PropTypes } from 'react';
import Popup from '../../containers/Popup/Popup';
import LoadStep from '../../containers/LoadStep/LoadStep';
import HeaderNew from '../../components/HeaderNew';

import moment from 'moment';
moment.locale('zh');

import ShareButtons from '../../containers/ShareButton';
import {portId} from '../../port';

export default class MemberDetail extends Component {
  static propTypes = {
    unclick: PropTypes.func.isRequired,
    myloading: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired,
    isclick: PropTypes.bool,
    isloading: PropTypes.bool,
    memberdetail: PropTypes.func.isRequired,
    detailId: PropTypes.string,
    theDetail: PropTypes.object,
  };

  componentDidMount() {
    this.props.unclick();
    this.props.memberdetail(this.props.detailId);
  }

  onClick() {
    this.props.myloading();
    setTimeout(() => {
      this.props.click();
    }, 7000);
  }

  render() {
    const style = require('./MemberDetail.scss');
    const upload = require('./upload.png');
    const address = require('./address.png');
    const beian = require('./baian.png');
    const beiantime = require('./beiantime.png');
    // const buildtime = require('./buildtime.png');
    const online = require('./online.png');
    const people = require('./people.png');
    const phone = require('./phone.png');

    const { isclick, isloading, theDetail } = this.props;

    const imgStyle = {opacity: '1', margin: '2rem', left: '15%'};
    const imgStyle2 = {opacity: '0', margin: '2rem', left: '15%'};


    const style1 = require('../ProjectDetail/ProjectDetail.scss');
    const style2 = require('./MyLoadDefault.scss');
    // <div className={style2.loader + ' ' + style2['loader-default'] + ' ' + style2['is-active']} data-text></div>

    // const cert = require('../ProjectDetail/cert.png');
    const cert = require('../ProjectDetail/background.png');

    const memberColor = {background: '#e6e8f2', marginTop: '-55px', paddingBottom: '1px'};

    return (
      <div>
        <HeaderNew/>
        <div className= {style.member}>
          <div className={'col-lg-12 ' + style.msg}>
            <div className={'container ' + style['memberDetail-ad']}>
              <img src={theDetail.img} style={{width: '120px', height: '120px'}} />
              <h2>{theDetail.title}</h2>
              <h2 className={style['memberDetail-ad-second-h2']}>{theDetail.intro}</h2>
            </div>
          </div>
        </div>
        <Popup />
        <div style={memberColor}>
          <div className="container">
            <div className={'row ' + style.row}>
              <div className={'col-lg-12 ' + style['my-img']}>
                <div className="col-lg-3"><img src={beian}/><h2 >备案号</h2><p>{theDetail.webRef}</p></div>
                <div className="col-lg-3"><img src={beiantime}/><h2 >网站备案时间</h2><p>{moment(theDetail.webCreatedOn).format('YYYY-MM-DD HH:mm:ss')}</p></div>
                <div className="col-lg-3"><img src={people}/><h2 >会员法人代表</h2><p>{theDetail.legalRepresentative}</p></div>
                <div className="col-lg-3"><img src={address}/><h2>地址</h2><p>{theDetail.address}</p></div>
                <hr/>
                <div className="col-lg-3"><img src={phone}/><h2 >电话</h2><p>{theDetail.phone}</p></div>
                <div className="col-lg-3"><img src={online}/><h2>网站上线时间</h2><p>{moment(theDetail.createdOn).format('YYYY-MM-DD HH:mm:ss')}</p></div>
              </div>
            </div>

            <div>
              <div className={style1.right + ' col-lg-12'} style={{marginBottom: '4rem', position: 'relative', marginRight: '0', marginLeft: '0'}}>
                <div className={style['memberDetail-cert']}>
                  <strong>区块链证书</strong>
                  <hr/>
                  <hr className={style['memberDetail-cert-second-hr']}/>
                </div>
                {!isclick && !isloading &&
                <img src={cert} style={imgStyle2}/>
                }
                {!isclick && !isloading &&
                <div className={'col-lg-12 ' + style.image2}>
                  <img src={upload}/>
                  <button className={style.butttonLeft} onClick={this.onClick.bind(this)}>信息区块链查验</button>
                  <p>众筹项目均为众筹联盟会员企业提交，信息提交确认后存证于区块链网络中，确保信息无法篡改</p>
                </div>
                }

                {isloading &&
                <div>
                  <img src={cert} style={imgStyle2}/>
                  <div className={style2.loader + ' ' + style2['loader-default'] + ' ' + style2['is-active']} data-text="Loading">
                    <LoadStep/>
                  </div>
                </div>
                }
                {isclick && !isloading &&
                <div className={style.book}>
                  <img src={cert} style={imgStyle}/>
                  <h2>区块链电子存证证书</h2>
                  <div className={style.bookP}>
                    <p><strong>信息名称&nbsp;:&nbsp;</strong>{theDetail.title}</p>
                    <p><strong>项目来源&nbsp;:&nbsp;</strong>{theDetail.platform}</p>
                    <p><strong>管理团队&nbsp;:&nbsp;</strong>{theDetail.managementTeam}</p>
                    <p><strong>网址&nbsp;:&nbsp;</strong>{theDetail.website}</p>
                    <hr/>
                    <p><strong>存储区块摘要值&nbsp;:&nbsp;</strong></p>
                    <p>{theDetail.blockHash}</p>
                    <p><strong>信息摘要值&nbsp;:&nbsp;</strong></p>
                    <p>{theDetail.refHash}</p>
                    <div className={style['my-memberDetail-footer']}>
                      <p style={{marginBottom: '0'}}>该条信息经过区块链存证，确保数据与原始提交时完全相符，并未经过违法的篡改</p>
                      <span style={{color: '#cccccc', fontSize: '14px'}}>以上区块链技术由网录科技提供</span>
                    </div>
                  </div>
                  <div className="col-lg-12" style={{float: 'right'}}>
                    <strong className="col-lg-10" style={{lineHeight: '40px', textAlign: 'right'}}>分享至{' : '}</strong>
                    <div style={{float: 'right'}}>
                      <ShareButtons
                          sites = {['qzone', 'weibo', 'qq', 'wechat']}
                          title = {theDetail.title + '--区块链新金融实验室会员'}
                          url = {portId + '/info/' + theDetail._id}
                          description = {theDetail.title + '--区块链新金融实验室会员'}
                      />
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

