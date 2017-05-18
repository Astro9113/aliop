import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import { closeCMS, openCMS, searchProject, insertProject, saveKeyword, projectDetail, clearProjectDetail, updateProject, prohibitProject, savePage, queryProject, allProject } from '../../../../redux/modules/cmsProject';
import { changeVersion } from '../../../../redux/modules/cmsMember';
import { imgeUpload, saveFile} from '../../../../redux/modules/cmsMember';

import moment from 'moment';
moment.locale('zh');

class CmsProject extends Component {
  static propTypes = {
    queryProject: PropTypes.func.isRequired,
    cmsProject: PropTypes.object,
    closeCMS: PropTypes.func.isRequired,
    openCMS: PropTypes.func.isRequired,
    cmsShow: PropTypes.bool,

    allProject: PropTypes.func.isRequired,
    allProjects: PropTypes.object,

    theKeyword: PropTypes.string,
    theProjectDetail: PropTypes.object,
    pageNum: PropTypes.string,

    savePage: PropTypes.func.isRequired,
    saveKeyword: PropTypes.func.isRequired,
    searchProject: PropTypes.func.isRequired,
    insertProject: PropTypes.func.isRequired,
    projectDetail: PropTypes.func.isRequired,
    clearProjectDetail: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    prohibitProject: PropTypes.func.isRequired,

    changeVersion: PropTypes.func.isRequired,
    isVersion: PropTypes.string,

    imgeUpload: PropTypes.func.isRequired,
    memberUrl: PropTypes.object,
    fileName: PropTypes.object,
    saveFile: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.queryProject(0, 'A');
    this.props.allProject();
  }


  onSearch() {
    const keyword = document.getElementById('searchProject').value;
    this.props.searchProject(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  getPage(event) {
    const page = event.target.name;
    this.props.savePage(page);
    setTimeout(() => {
      this.props.searchProject(this.props.theKeyword, page);
    }, 1000);
  }

  handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.props.saveFile(file);
  }

  handleDrop(event) {
    event.preventDefault();
  }

  handleUpload(event) {
    event.preventDefault();
    const fileToUpload = new FormData();
    fileToUpload.append('file', this.props.fileName);
    this.props.imgeUpload(fileToUpload);
    if (!this.props.fileName) {
      alert('上传图片失败！请重新上传');
    } else {
      alert('成功！');
    }
  }

  handleSubmit = (event) => {
    const { companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url;

    const numTest = /^\+?[1-9][0-9]*$/;
    if (!numTest.test(targetFunds.value)) {
      alert('请输入金额，单位为万元');
    } else if (!numTest.test(numStakeHolders.value)) {
      alert('股东人数必须为整数');
    } else {
      this.props.insertProject(companyName.value, projectName.value, initiatedBy.value, intro.value, targetFunds.value, plannedRounds.value, numStakeHolders.value, industry.value, stages.value, imgUrl);

      companyName.value = ''; projectName.value = ''; initiatedBy.value = ''; intro.value = ''; targetFunds.value = ''; plannedRounds.value = ''; numStakeHolders.value = '';
      industry.value = ''; stages.value = ''; img.value = '';

      setTimeout(() => {
        this.props.queryProject(0, 'A');
        this.props.closeCMS();
      }, 1000);
    }
  };

  updateProject = (event) => {
    const { companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url === '' ? '' : this.props.memberUrl.url;

    const companyNameValue = companyName.value !== '' ? companyName.value : this.props.theProjectDetail.companyName;
    const projectNameValue = projectName.value !== '' ? projectName.value : this.props.theProjectDetail.projectName;
    const initiatedByValue = initiatedBy.value !== '' ? initiatedBy.value : this.props.theProjectDetail.initiatedBy;
    const introValue = intro.value !== '' ? intro.value : this.props.theProjectDetail.intro;
    const targetFundsValue = targetFunds.value !== '' ? targetFunds.value : this.props.theProjectDetail.targetFunds;
    const plannedRoundsValue = plannedRounds.value !== '' ? plannedRounds.value : this.props.theProjectDetail.plannedRounds;
    const numStakeHoldersValue = numStakeHolders.value !== '' ? numStakeHolders.value : this.props.theProjectDetail.numStakeHolders;
    const industryValue = industry.value !== '' ? industry.value : this.props.theProjectDetail.industry;
    const stagesValue = stages.value !== '' ? stages.value : this.props.theProjectDetail.stages;
    const imgValue = imgUrl !== '' ? imgUrl : this.props.theProjectDetail.img;

    this.props.updateProject(this.props.theProjectDetail._id, companyNameValue, projectNameValue, initiatedByValue, introValue, targetFundsValue, plannedRoundsValue, numStakeHoldersValue, industryValue, stagesValue, imgValue);

    companyName.value = ''; projectName.value = ''; initiatedBy.value = ''; intro.value = ''; targetFunds.value = ''; plannedRounds.value = ''; numStakeHolders.value = '';
    industry.value = ''; stages.value = ''; img.value = '';

    setTimeout(() => {
      this.props.searchProject(this.props.theKeyword, this.props.pageNum);
      this.props.closeCMS();
    }, 1000);
  };

  prohibit(event) {
    const id = event.target.name;
    // const isPublished = false;
    this.props.prohibitProject(id);

    setTimeout(() => {
      this.props.searchProject(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  proOpen(event) {
    const id = event.target.name;
    // const isPublished = true;
    this.props.prohibitProject(id);

    setTimeout(() => {
      this.props.searchProject(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  showCard() {
    this.props.clearProjectDetail();
    this.props.openCMS();
  }

  showDetail(event) {
    this.props.changeVersion('false');

    const updateId = event.target.name;
    this.props.projectDetail(updateId);
    this.props.openCMS();
  }

  showVersion(event) {
    const updateId = event.target.name;
    this.props.projectDetail(updateId);

    this.props.changeVersion('true');
    this.props.openCMS();
  }

  closeCard() {
    setTimeout(() => {
      this.props.searchProject(this.props.theKeyword, this.props.pageNum);
      this.props.closeCMS();
      this.props.changeVersion('false');
    }, 1000);
  }

  render() {
    const key = require('../../../../components/Investment/Key.png');
    const style = require('./CmsProject.scss');
    const { cmsShow, cmsProject, allProjects, theProjectDetail, isVersion } = this.props;

    // 项目来源列表
    let memberList;
    if (allProjects.data && allProjects.data.length > 0) {
      memberList = allProjects.data.map((transaction, index) => {
        return (
          <option key={index} value={transaction._id}>{transaction.platform}</option>
        );
      });
    }

    // 页码
    let pageResult;
    pageResult = Array.apply(null, {length: cmsProject.totalPage}).map((value, index) => {
      return (
        <li key={index}><a name={index} onClick={this.getPage.bind(this)}>{index + 1}</a></li>
      );
    });

    // 列表
    let startList;
    if (cmsProject.data && cmsProject.data.length > 0 ) {
      startList = cmsProject.data.map((transaction, index) => {
        let stages;
        if (transaction.stages === 'post') {
          stages = '成功退出';
        } else if (transaction.stages === 'complete') {
          stages = '众筹完成';
        } else if (transaction.stages === 'ongoing') {
          stages = '众筹中';
        } else if (transaction.stages === 'planning') {
          stages = '即将开启';
        }
        return (
          <tr key={transaction._id} style={{whiteSpace: 'nowrap'}}>
            <th>{index + 1}</th>
            <td>{transaction.companyName}</td>
            <td>{transaction.projectName}</td>
            <td>{stages}</td>
            <td>
              <button type="button" className="btn btn-info" name ={transaction._id} onClick={this.showDetail.bind(this)}>修改</button>
              { transaction.isPublished &&
              <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}} name ={transaction._id} onClick={this.prohibit.bind(this)}>禁用</button>
              }

              { !transaction.isPublished &&
              <button type="button" className="btn btn-danger" style={{marginLeft: '10px'}} name ={transaction._id} onClick={this.proOpen.bind(this)}>开启</button>
              }
              <button type="button" className="btn btn-default" style={{marginLeft: '10px'}} name ={transaction._id} onClick={this.showVersion.bind(this)}>查看版本</button>
            </td>
          </tr>
        );
      });
    }

    // 版本号信息
    let versionList;
    if (theProjectDetail) {
      if ( theProjectDetail.history) {
        versionList = theProjectDetail.history.map((transaction, index) => {
          return (
            <tr key={transaction._id}>
              <th>{index + 1}</th>
              <td>version{' '}{transaction.version}.0</td>
              <td>{moment(transaction.createdOn).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          );
        });
      }
    }

    return (
      <div className={style['cms-right'] + ' col-lg-7'}>
        <h3>项目信息管理</h3>
        <div className={style['cms-search'] + ' col-lg-12'}>
          <a style={{cursor: 'pointer'}}><img src={key} onClick={this.onSearch.bind(this)}/>
            <input id="searchProject" type="text" className="form-control" placeholder="请输入名称" onKeyPress={this.onSearch.bind(this)}/>
          </a>
        </div>
        <button className="col-lg-4 btn btn-success" style={{marginTop: '20px', marginLeft: '17px', width: '100px'}} onClick={this.showCard.bind(this)}>新增会员</button>
        <table className="col-lg-12 table table-hover" style={{marginTop: '30px', marginLeft: '16px'}}>
          <thead>
          <tr>
            <th>序号</th>
            <th>公司名称</th>
            <th>项目名称</th>
            <th>项目状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          {startList}
          </tbody>
        </table>

        <ul className={style['cms-page'] + ' pagination pagination-lg col-lg-12'} >
          <li><a>&laquo;</a></li>
          {pageResult}
          <li><a>&raquo;</a></li>
        </ul>


        {/* 新增弹窗*/}
        {!theProjectDetail._id &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">项目详情</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={style['modal-invest']}>
            <form className="col-lg-12">
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-3 control-label">长传logo</label>
                <div className="col-sm-5">
                  <input type="file" id="exampleInputFile" ref="img" onDrop={(event) => this.handleDrop(event)} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="col-sm-2">
                  <input type="button" name="b1" value="提交图片" onClick={(event) => this.handleUpload(event)} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">公司名称</label>
                <div className="col-sm-6">
                  <input ref="companyName" type="text" className="form-control" id="inputText3" placeholder="公司名称" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目名称</label>
                <div className="col-sm-6">
                  <input ref="projectName" type="text" className="form-control" id="inputText3" placeholder="项目名称" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目来源</label>
                <div className="col-sm-6">
                  <select ref="initiatedBy" className="form-control">
                    {memberList}
                  </select>
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目简介</label>
                <div className="col-sm-6">
                  <input ref="intro" type="text" className="form-control" id="inputText3" placeholder="项目简介" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">融资金额</label>
                <div className="col-sm-6">
                  <input ref="targetFunds" type="number" className="form-control" id="inputText3" placeholder="融资金额(万元)" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">融资轮次</label>
                <div className="col-sm-6">
                  <input ref="plannedRounds" type="text" className="form-control" id="inputText3" placeholder="融资轮次" />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">股东人数</label>
                <div className="col-sm-6">
                  <input ref="numStakeHolders" type="number" className="form-control" id="inputText3" placeholder="股东人数" />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">行业</label>
                <div className="col-sm-6">
                  <input ref="industry" type="text" className="form-control" id="inputText3" placeholder="行业" />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目状态</label>
                <div className="col-sm-6">
                  <select ref="stages" className="form-control">
                    <option value="planning">即将开启</option>
                    <option value="ongoing">众筹中</option>
                    <option value="complete">众筹完成</option>
                    <option value="post">成功退出</option>
                  </select>
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-default" onClick={(event) => this.handleSubmit(event)}>确定</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCard.bind(this)}>关闭</Button>
          </Modal.Footer>
        </Modal>
        }

        {/* 修改弹窗*/}
        {theProjectDetail._id && isVersion === 'false' &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">项目详情</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={style['modal-invest']}>
            <form className="col-lg-12">
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-3 control-label">长传logo</label>
                <div className="col-sm-5">
                  <input type="file" id="exampleInputFile" ref="img" onDrop={(event) => this.handleDrop(event)} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="col-sm-2">
                  <input type="button" name="b1" value="提交图片" onClick={(event) => this.handleUpload(event)} />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">公司名称</label>
                <div className="col-sm-6">
                  <input ref="companyName" type="text" className="form-control" id="inputText3" placeholder={theProjectDetail.companyName} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目名称</label>
                <div className="col-sm-6">
                  <input ref="projectName" type="text" className="form-control" id="inputText3" placeholder={theProjectDetail.projectName} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目来源</label>
                <div className="col-sm-6">
                  <select ref="initiatedBy" className="form-control">
                    {theProjectDetail.initiatedBy &&
                    <option key="0" value={theProjectDetail._id}>{theProjectDetail.initiatedBy.title}</option>
                    }
                    {memberList}
                  </select>
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目简介</label>
                <div className="col-sm-6">
                  <input ref="intro" type="text" className="form-control" id="inputText3" placeholder={theProjectDetail.intro} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">融资金额</label>
                <div className="col-sm-6">
                  <input ref="targetFunds" type="number" className="form-control" id="inputText3" placeholder={theProjectDetail.targetFunds} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">融资轮次</label>
                <div className="col-sm-6">
                  <input ref="plannedRounds" type="text" className="form-control" id="inputText3" placeholder={theProjectDetail.plannedRounds} />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">股东人数</label>
                <div className="col-sm-6">
                  <input ref="numStakeHolders" type="number" className="form-control" id="inputText3" placeholder={theProjectDetail.numStakeHolders} />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">行业</label>
                <div className="col-sm-6">
                  <input ref="industry" type="text" className="form-control" id="inputText3" placeholder={theProjectDetail.industry}/>
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">项目状态</label>
                <div className="col-sm-6">
                  <select ref="stages" className="form-control">
                    { theProjectDetail.industry === 'planning' &&
                    <option value="planning">即将开启</option>
                    }
                    { theProjectDetail.industry === 'ongoing' &&
                    <option value="ongoing">众筹中</option>
                    }
                    { theProjectDetail.industry === 'complete' &&
                    <option value="complete">众筹完成</option>
                    }
                    { theProjectDetail.industry === 'post' &&
                    <option value="post">成功退出</option>
                    }
                    <option value="planning">即将开启</option>
                    <option value="ongoing">众筹中</option>
                    <option value="complete">众筹完成</option>
                    <option value="post">成功退出</option>
                  </select>
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-default" onClick={(event) => this.updateProject(event)}>确定</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCard.bind(this)}>关闭</Button>
          </Modal.Footer>
        </Modal>
        }

        {/* 查看版本号*/}
        {isVersion === 'true' &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">版本信息</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={style['modal-invest']}>
            <table className="col-lg-12 table table-hover">
              <thead>
              <tr>
                <th>序号</th>
                <th>版本号</th>
                <th>修改时间</th>
              </tr>
              </thead>
              <tbody>
              {versionList}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCard.bind(this)}>关闭</Button>
          </Modal.Footer>
        </Modal>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cmsProject: state.cmsProject.cmsProject,
    cmsShow: state.cmsProject.cmsShow,
    allProjects: state.cmsProject.allProjects,

    theKeyword: state.cmsProject.theKeyword,
    theProjectDetail: state.cmsProject.theProjectDetail,
    pageNum: state.cmsProject.pageNum,

    isVersion: state.cmsMember.isVersion,

    memberUrl: state.cmsMember.memberUrl,
    fileName: state.cmsMember.fileName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeCMS: () => {
      dispatch(closeCMS());
    },
    openCMS: () => {
      dispatch(openCMS());
    },
    queryProject: (pageid, stage) => {
      dispatch(queryProject(pageid, stage));
    },
    allProject: () => {
      dispatch(allProject());
    },

    savePage: (page) => {
      dispatch(savePage(page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },
    searchProject: (keyword, page) => {
      dispatch(searchProject(keyword, page));
    },
    insertProject: (companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img ) => {
      dispatch(insertProject(companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img ));
    },

    projectDetail: (id) => {
      dispatch(projectDetail(id));
    },
    clearProjectDetail: () => {
      dispatch(clearProjectDetail());
    },
    updateProject: (id, companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img) => {
      dispatch(updateProject(id, companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img ));
    },
    prohibitProject: (id) => {
      dispatch(prohibitProject(id));
    },
    changeVersion: (state) => {
      dispatch(changeVersion(state));
    },
    imgeUpload: (file) => {
      dispatch(imgeUpload(file));
    },
    saveFile: (fileName) => {
      dispatch(saveFile(fileName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CmsProject);
