import React, { Component, PropTypes } from 'react';
import LoadStep from '../../containers/LoadStep/LoadStep';
import HeaderNew from '../../components/HeaderNew';
import moment from 'moment';
moment.locale('zh');

import ShareButtons from '../../containers/ShareButton';
import {portId} from '../../port';

export default class ProjectDetail extends Component {
  static propTypes = {
    unclick: PropTypes.func.isRequired,
    myloading: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired,
    isclick: PropTypes.bool,
    isloading: PropTypes.bool,
    projectdetail: PropTypes.func.isRequired,
    detailId: PropTypes.string,
    theDetail: PropTypes.object,
  };

  componentDidMount() {
    this.props.unclick();
    this.props.projectdetail(this.props.detailId);
  }

  onClick() {
    this.props.myloading();
    setTimeout(() => {
      this.props.click();
    }, 7000);
  }

  render() {
    const { isclick, isloading, theDetail } = this.props;
    const imgStyle = {opacity: '1', margin: '2rem'};
    const imgStyle2 = {opacity: '0', margin: '2rem'};

    const style = require('./ProjectDetail.scss');
    const style2 = require('../MemberDetail/MyLoadDefault.scss');
    // const cert = require('./cert.png');
    const cert = require('./background.png');
    const upload = require('../MemberDetail/upload.png');
    // const project = require('../Project/project.png');
    const icon = require('./ivon.png');

    let targetFunds;
    let stages;
    if (theDetail.stages === 'planning') {
      stages = '即将开启';
      // .toString().substring(0, 3)
      targetFunds = theDetail.targetFunds;
    } else if (theDetail.stages === 'ongoing') {
      stages = '众筹中';
      // .toString().substring(0, 3)
      targetFunds = theDetail.targetFunds;
    } else if (theDetail.stages === 'complete') {
      stages = '众筹完成';
      // .toString().substring(0, 3)
      targetFunds = theDetail.targetFunds;
    } else if (theDetail.stages === 'post') {
      stages = '成功退出';
      // .toString().substring(0, 3)
      targetFunds = theDetail.targetFunds;
    }

    const memberColor = {background: '#e6e8f2', paddingBottom: '1px'};
    return (
        <div>
          <HeaderNew/>
          <div style={memberColor} >
            <div className="container" style={{paddingBottom: '4rem'}}>
              <div className={'col-lg-3 ' + style.left}>
                <img src={theDetail.img} style={{width: '270px', height: '161px'}}/>
                <div className={style['left-div']}>
                  <img src={icon}/>
                  <h4>{stages}</h4>
                  <div className={ 'col-lg-12 ' + style['my-projectDetail']}>
                    <div className="col-lg-4 ">
                      <h3 >{targetFunds}W</h3>
                      <p >融资金额</p>
                    </div>
                    <div className="col-lg-4 ">
                      <h3 >{theDetail.plannedRounds}</h3>
                      <p >融资轮次</p>
                    </div>
                    <div className="col-lg-4 ">
                      <h3 >{theDetail.numStakeHolders}</h3>
                      <p >股东人数</p>
                    </div>
                  </div>
                </div>
                <strong className="col-lg-12" style={{paddingTop: '10px', fontSize: '18px', textAlign: 'center'}}>{theDetail.companyName}</strong>
              </div>
              <div className="col-lg-8">
                <div className={style.right}>
                  {!isclick && !isloading &&
                  <img src={cert} style={imgStyle2}/>
                  }
                  {!isclick && !isloading &&
                  <div className={'col-lg-12 ' + style.image}>
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
                      <p><strong>信息名称&nbsp;:&nbsp;</strong>{theDetail.projectName}</p>
                      <p><strong>存证提交时间&nbsp;:&nbsp;</strong>{moment(theDetail.createdOn).format('YYYY-MM-DD HH:mm:ss')}</p>
                      <p><strong>存证上链时间&nbsp;:&nbsp;</strong>{moment(theDetail.minedOn).format('YYYY-MM-DD HH:mm:ss')}</p>
                      <p><strong>存证更新时间&nbsp;:&nbsp;</strong>{moment(theDetail.history[theDetail.history.length - 1].createdOn).format('YYYY-MM-DD HH:mm:ss')}</p>
                      <p><strong>存储区块序号&nbsp;:&nbsp;</strong>{theDetail.blockNum}</p>
                      <hr/>
                      <p><strong>存储区块摘要值&nbsp;:&nbsp;</strong></p>
                      <p>{theDetail.blockHash}</p>
                      <p><strong>信息摘要值&nbsp;:&nbsp;</strong></p>
                      <p>{theDetail.refHash}</p>
                      <div className={style['my-projectDetail-footer']}>
                        <p>该条信息经过区块链存证，确保数据与原始提交时完全相符，并未经过违法的篡改</p>
                        <span style={{color: '#cccccc', fontSize: '14px'}}>以上区块链技术由网录科技提供</span>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{float: 'right'}}>
                      <strong className="col-lg-9" style={{lineHeight: '40px', textAlign: 'right'}}>分享至{' : '}</strong>
                      <div style={{float: 'right'}}>
                        <ShareButtons
                            sites = {['qzone', 'weibo', 'qq', 'wechat']}
                            title = {theDetail.projectName + '--区块链新金融实验室会员'}
                            url = {portId + '/project/' + theDetail._id}
                            description = {theDetail.projectName + '--区块链新金融实验室会员'}
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
