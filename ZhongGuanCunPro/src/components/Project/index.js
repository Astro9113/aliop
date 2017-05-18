import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderNew from '../../components/HeaderNew';
import ShareButtons from '../../containers/ShareButton';

import {portId} from '../../port';

export default class Project extends Component {
  static propTypes = {
    queryProject: PropTypes.func.isRequired,
    projectData: PropTypes.object,
    count: PropTypes.number,
    stage: PropTypes.string,
    selectPage: PropTypes.func.isRequired,
    selectStage: PropTypes.func.isRequired,
    searchProject: PropTypes.func.isRequired,

    saveKeyword: PropTypes.func.isRequired,
    theKeyword: PropTypes.string,
  };

  componentDidMount() {
    this.props.queryProject(0, 'A');
  }

  componentWillUnmount() {
    this.props.selectPage(0);
  }

  onSearch() {
    this.props.selectPage(0);
    const keyword = document.getElementById('search-project').value;
    this.props.searchProject(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  selectPage(event) {
    const page = this.props.count + 1;
    this.props.selectPage(page);

    const keyword = event.target.name;
    if (keyword === '' || keyword === undefined) {
      this.props.queryProject(page, this.props.stage);
    } else {
      this.props.searchProject(this.props.theKeyword, page);
    }
  }

  selectStage(event) {
    const stage = event.target.name;
    this.props.selectStage(stage);
    this.props.queryProject(0, stage);
    this.props.selectPage(0);
  }

  render() {
    const style = require('./Project.scss');
    const key = require('../Investment/Key.png');
    const icon1 = require('./icon1.png');
    const icon2 = require('./icon2.png');
    let testList;

    // const photo = require('./project2.png');
    const { projectData, theKeyword, stage } = this.props;
    const num = projectData.data.length;

    const opacity = '0';

    let butn;
    if (projectData) {
      if (projectData.totalPage !== 0) {
        butn = projectData.isLastPage;
      } else {
        butn = true;
      }
    }

    if (projectData.data && projectData.data.length !== 0 ) {
      testList = projectData.data.map((transaction) => {
        // .toString().substring(0, 3);
        const targetFunds = transaction.targetFunds;
        let stages;
        let mycolor;
        let left;
        if (transaction.stages === 'planning') {
          stages = '即将开启';
          mycolor = '#43f2df';
          left = '77%';
        } else if (transaction.stages === 'ongoing') {
          stages = '众筹中';
          mycolor = '#48a9ff';
          left = '81%';
        } else if (transaction.stages === 'complete') {
          stages = '众筹完成';
          mycolor = '#fdcd0b';
          left = '77%';
        } else if (transaction.stages === 'post') {
          stages = '成功退出';
          mycolor = '#fd3e0b';
          left = '77%';
        }

        return (
          <div className="col-lg-4" style={{padding: '9px'}} key={transaction._id}>
              <div className={ 'clearfix ' + style.row }>
                <Link to={`/project/${transaction._id}`} activeStyle={{textDecoration: 'none'}}>
                  <img className={style['my-project-row-img'] } src={transaction.img} /></Link>
                <div className={style.my_color} style={{background: mycolor, left: left}}>
                  <p>{stages}</p>
                </div>
                <h3 style={{paddingLeft: '3rem', color: '#2b2c35'}}>{transaction.companyName}</h3>
                <p style={{paddingLeft: '3rem', color: '#cccccc'}}>{transaction.projectName}</p>
                <div className="col-lg-12 ">
                  <div className="col-lg-4 ">
                    <h3 style={{display: 'inline-block', paddingRight: '2rem', color: '#2b2c35'}}>{targetFunds}W</h3>
                    <p style={{display: 'inline-block', color: '#cccccc'}}>融资金额</p>
                  </div>
                  <div className="col-lg-4 ">
                    <h3 style={{display: 'inline-block', paddingRight: '2rem', color: '#2b2c35'}}>{transaction.plannedRounds}</h3>
                    <p style={{display: 'inline-block', color: '#cccccc'}}>融资轮次</p>
                  </div>
                  <div className="col-lg-4 ">
                    <h3 style={{display: 'inline-block', paddingRight: '2rem', color: '#2b2c35'}} >{transaction.numStakeHolders}人</h3>
                    <p style={{display: 'inline-block', color: '#cccccc'}}>股东人数</p>
                  </div>
                </div>
                <hr className={style['my-project-hr']}/>
                <div className="col-lg-12 ">
                  <h4 style={{display: 'inline-block', paddingRight: '2rem', color: '#2b2c35', marginLeft: '15px'}} >项目来源&nbsp;:&nbsp;
                    { transaction.initiatedBy && transaction.initiatedBy.platform }
                    { !(transaction.initiatedBy) && '未填写' }
                  </h4>
                </div>
                <div className="col-lg-12" style={{float: 'right'}}>
                  <strong className="col-lg-6" style={{lineHeight: '40px', textAlign: 'right'}}>分享至{' : '}</strong>
                  <div style={{float: 'right'}}>
                    <ShareButtons
                        sites = {['qzone', 'weibo', 'qq', 'wechat']}
                        url = {portId + '/project/' + transaction._id}
                        title = {transaction.projectName}
                        description = {transaction.projectName + '--区块链新金融实验室会员'}
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
            <h2>众筹项目</h2>
            <p>众筹项目均为众筹联盟会员企业提交，信息提交确认后存证于区块链网络中，确保信息无法篡改</p>
          </div>
          <div className="container">
            <div className={'row ' + style.row} style={{marginTop: '2rem'}}>
              {stage === 'A' &&
              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '2rem'}}>
                <img src={icon1}/>
                <strong className="col-lg-2">众筹状态:</strong>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a name="A" onClick={this.selectStage.bind(this)}>全部</a></p>
                <p><a name="planning" onClick={this.selectStage.bind(this)}>即将开启</a></p>
                <p><a name="ongoing" onClick={this.selectStage.bind(this)}>众筹中</a></p>
                <p><a name="complete" onClick={this.selectStage.bind(this)}>众筹完成</a></p>
                <p><a name="post" onClick={this.selectStage.bind(this)}>成功退出</a></p>
              </div>
              }

              {stage === 'planning' &&
              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '2rem'}}>
                <img src={icon1}/>
                <strong className="col-lg-2">众筹状态:</strong>
                <p><a name="A" onClick={this.selectStage.bind(this)} >全部</a></p>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a name="planning" onClick={this.selectStage.bind(this)} >即将开启</a></p>
                <p><a name="ongoing" onClick={this.selectStage.bind(this)}>众筹中</a></p>
                <p><a name="complete" onClick={this.selectStage.bind(this)}>众筹完成</a></p>
                <p><a name="post" onClick={this.selectStage.bind(this)}>成功退出</a></p>
              </div>
              }

              {stage === 'ongoing' &&
              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '2rem'}}>
                <img src={icon1}/>
                <strong className="col-lg-2">众筹状态:</strong>
                <p><a name="A" onClick={this.selectStage.bind(this)} >全部</a></p>
                <p><a name="planning" onClick={this.selectStage.bind(this)}>即将开启</a></p>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a name="ongoing" onClick={this.selectStage.bind(this)} >众筹中</a></p>
                <p><a name="complete" onClick={this.selectStage.bind(this)}>众筹完成</a></p>
                <p><a name="post" onClick={this.selectStage.bind(this)}>成功退出</a></p>
              </div>
              }

              {stage === 'complete' &&
              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '2rem'}}>
                <img src={icon1}/>
                <strong className="col-lg-2">众筹状态:</strong>
                <p><a name="A" onClick={this.selectStage.bind(this)} >全部</a></p>
                <p><a name="planning" onClick={this.selectStage.bind(this)}>即将开启</a></p>
                <p><a name="ongoing" onClick={this.selectStage.bind(this)}>众筹中</a></p>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a name="complete" onClick={this.selectStage.bind(this)} >众筹完成</a></p>
                <p><a name="post" onClick={this.selectStage.bind(this)}>成功退出</a></p>
              </div>
              }

              {stage === 'post' &&
              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '2rem'}}>
                <img src={icon1}/>
                <strong className="col-lg-2">众筹状态:</strong>
                <p><a name="A" onClick={this.selectStage.bind(this)} >全部</a></p>
                <p><a name="planning" onClick={this.selectStage.bind(this)}>即将开启</a></p>
                <p><a name="ongoing" onClick={this.selectStage.bind(this)}>众筹中</a></p>
                <p><a name="complete" onClick={this.selectStage.bind(this)}>众筹完成</a></p>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a name="post" onClick={this.selectStage.bind(this)} >成功退出</a></p>
              </div>
              }

              <div className={style['my-project-search'] + ' col-lg-6'}>
                <a style={{cursor: 'pointer'}}><img src={key} className={style.search} onClick={this.onSearch.bind(this)}/></a>
                <input type="text" id="search-project" className="form-control" placeholder="根据众筹平台关键字搜索" onKeyPress={this.onSearch.bind(this)}/>
              </div>

              <div className={'col-lg-6 ' + style.my_state} style={{marginTop: '1rem', opacity: `${opacity}`}}>
                <img src={icon2}/>
                <strong className="col-lg-2">项目来源:</strong>
                <p style={{background: '#0588fa', color: '#ffffff', display: 'inline-block', marginRight: '10px', borderRadius: '15px'}}><a>全部</a></p>
                <p><a>天使汇</a></p>
                <p><a>天使汇1</a></p>
                <p><a>天使汇2</a></p>
                <p><a>天使汇3</a></p>
              </div>
              <div className="col-lg-6">
                <p style={{float: 'right', paddingTop: '1rem'}}>查询结果共{num}个项目</p>
              </div>
            </div>
            <div className="row">
              {testList}
            </div>
            <div className="container" style={{textAlign: 'center', marginBottom: '10%'}}>
              { !butn &&
              <button name = {theKeyword} className={style.buttonBootom} onClick={this.selectPage.bind(this)} >查看更多</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
