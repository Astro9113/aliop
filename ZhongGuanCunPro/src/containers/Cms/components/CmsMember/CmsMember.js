import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';
import moment from 'moment';
moment.locale('zh');
import Popup from '../../../../components/Popup/index';

import { connect } from 'react-redux';
import { closeCMS, openCMS, searchMember, insertMember, saveKeyword, memberDetail, clearMemberDetail, updateMember, prohibitMember, savePage, queryMember, changeVersion, imgeUpload, saveFile} from '../../../../redux/modules/cmsMember';
import { modalOpen, setContent } from '../../../../redux/modules/popup';

class CmsMember extends Component {
  static propTypes = {
    queryMember: PropTypes.func.isRequired,
    cmsMember: PropTypes.object,
    closeCMS: PropTypes.func.isRequired,
    openCMS: PropTypes.func.isRequired,
    cmsShow: PropTypes.bool,

    theKeyword: PropTypes.string,
    theMemberDetail: PropTypes.object,
    pageNum: PropTypes.string,

    savePage: PropTypes.func.isRequired,
    saveKeyword: PropTypes.func.isRequired,
    searchMember: PropTypes.func.isRequired,
    insertMember: PropTypes.func.isRequired,

    memberDetail: PropTypes.func.isRequired,
    clearMemberDetail: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
    prohibitMember: PropTypes.func.isRequired,

    changeVersion: PropTypes.func.isRequired,
    isVersion: PropTypes.string,

    isopen: PropTypes.bool,
    alertOpen: PropTypes.func.isRequired,
    alertText: PropTypes.func.isRequired,

    imgeUpload: PropTypes.func.isRequired,
    memberUrl: PropTypes.object,
    fileName: PropTypes.object,
    saveFile: PropTypes.func.isRequired,

  };

  componentWillMount() {
    this.props.queryMember(0);
  }


  onSearch() {
    const keyword = document.getElementById('searchMember').value;
    this.props.searchMember(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  getPage(event) {
    const page = event.target.name;
    this.props.savePage(page);
    setTimeout(() => {
      this.props.searchMember(this.props.theKeyword, page);
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
    const { title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreatedOn, address, phone, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url;
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    // const webUrl = website.value.match(/http:\/\/.+/);
    if (!reg.test(website.value)) {
      alert('网址不是以http://https://开头，或者不是网址！');
    } else {
      if (!webCreatedOn.value) {
        alert('请选择网址备案时间');
      } else {
        const create = new Date(webCreatedOn.value).toISOString();

        const regBox = {
          regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          regName: /^[a-z0-9_-]{3,16}$/,
          regMobile: /^0?1[3|4|5|8][0-9]\d{8}$/,
          regTel: /^0[\d]{2,3}-[\d]{7,8}$/
        };
        const mflag = regBox.regMobile.test(phone.value);
        const tflag = regBox.regTel.test(phone.value);
        if (!( mflag || tflag )) {
          alert('手机或者电话有误！');
        } else {
          this.props.insertMember(title.value, platform.value, website.value, intro.value, legalRepresentative.value, stakeHolders.value, managementTeam.value, webRef.value, create, address.value, phone.value, imgUrl);

          title.value = ''; platform.value = ''; website.value = ''; intro.value = ''; legalRepresentative.value = ''; stakeHolders.value = '';
          managementTeam.value = ''; webCreatedOn.value = ''; address.value = ''; phone.value = ''; img.value = ''; webRef.value = '';

          setTimeout(() => {
            this.props.queryMember(0);
            this.props.closeCMS();
          }, 1000);
        }
      }
    }
  };

  updateMember = (event) => {
    const { title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreatedOn, address, phone, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url === '' ? '' : this.props.memberUrl.url;

    const titleValue = title.value !== '' ? title.value : this.props.theMemberDetail.title;
    const platformValue = platform.value !== '' ? platform.value : this.props.theMemberDetail.platform;
    const websiteValue = website.value !== '' ? website.value : this.props.theMemberDetail.website;
    const introValue = intro.value !== '' ? intro.value : this.props.theMemberDetail.intro;
    const legalRepresentativeValue = legalRepresentative.value !== '' ? legalRepresentative.value : this.props.theMemberDetail.legalRepresentative;
    const stakeHoldersValue = stakeHolders.value !== '' ? stakeHolders.value : this.props.theMemberDetail.stakeHolders;
    const managementTeamValue = managementTeam.value !== '' ? managementTeam.value : this.props.theMemberDetail.managementTeam;
    const webRefValue = webRef.value !== '' ? webRef.value : this.props.theMemberDetail.webRef;
    const webCreatedOnValue = webCreatedOn.value !== '' ? webCreatedOn.value : this.props.theMemberDetail.webCreatedOn;
    const addressValue = address.value !== '' ? address.value : this.props.theMemberDetail.address;
    const phoneValue = phone.value !== '' ? phone.value : this.props.theMemberDetail.phone;
    const imgValue = imgUrl !== '' ? imgUrl : this.props.theMemberDetail.img;
    this.props.updateMember(this.props.theMemberDetail._id, titleValue, platformValue, websiteValue, introValue, legalRepresentativeValue, stakeHoldersValue, managementTeamValue, webRefValue, webCreatedOnValue, addressValue, phoneValue, imgValue);

    title.value = ''; platform.value = ''; website.value = ''; intro.value = ''; legalRepresentative.value = ''; stakeHolders.value = '';
    managementTeam.value = ''; webCreatedOn.value = ''; address.value = ''; phone.value = ''; img.value = '';

    setTimeout(() => {
      this.props.searchMember(this.props.theKeyword, this.props.pageNum);
      this.props.closeCMS();
    }, 1000);
  };

  prohibit(event) {
    const id = event.target.name;
    this.props.prohibitMember(id);

    setTimeout(() => {
      this.props.searchMember(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  proOpen(event) {
    const id = event.target.name;
    // const isPublished = true;
    this.props.prohibitMember(id);

    setTimeout(() => {
      this.props.searchMember(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  showCard() {
    this.props.clearMemberDetail();
    this.props.openCMS();
  }

  showDetail(event) {
    const updateId = event.target.name;
    this.props.memberDetail(updateId);

    setTimeout(() => {
      const status = this.props.theMemberDetail.status;
      if (status === 'mined') {
        this.props.changeVersion('false');
        this.props.openCMS();
      } else {
        // console.log('status', status);
        const aa = {'test': '该条记录上链尚未完成，请稍后再修改！'};
        this.props.alertText(aa);
        this.props.alertOpen();
      }
    }, 500);
  }

  showVersion(event) {
    const updateId = event.target.name;
    this.props.memberDetail(updateId);

    this.props.changeVersion('true');
    this.props.openCMS();
  }

  closeCard() {
    setTimeout(() => {
      this.props.searchMember(this.props.theKeyword, this.props.pageNum);
      this.props.closeCMS();
      this.props.changeVersion('false');
    }, 1000);
  }

  render() {
    const key = require('../../../../components/Investment/Key.png');
    const style = require('./CmsMember.scss');
    const { cmsShow, cmsMember, theMemberDetail, isVersion } = this.props;

    // 页码
    let pageResult;
    pageResult = Array.apply(null, {length: cmsMember.totalPage}).map((value, index) => {
      return (
        <li key={index}><a name={index} onClick={this.getPage.bind(this)}>{index + 1}</a></li>
      );
    });

    // 列表
    let startList;
    if (cmsMember.data && cmsMember.data.length > 0 ) {
      startList = cmsMember.data.map((transaction, index) => {
        return (
          <tr key={transaction._id} style={{whiteSpace: 'nowrap'}}>
            <th>{index + 1}</th>
            <td>{transaction.title}</td>
            <td>{transaction.legalRepresentative}</td>
            <td>{transaction.phone}</td>
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
    if (theMemberDetail) {
      if ( theMemberDetail.history) {
        versionList = theMemberDetail.history.map((transaction, index) => {
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
        <h3>会员信息管理</h3>
        <div className={style['cms-search'] + ' col-lg-12'}>
          <a style={{cursor: 'pointer'}}><img src={key} onClick={this.onSearch.bind(this)}/>
            <input id="searchMember" type="text" className="form-control" placeholder="请输入要查询的公司名称" onKeyPress={this.onSearch.bind(this)}/>
          </a>
        </div>
        <button className="col-lg-4 btn btn-success" style={{marginTop: '20px', marginLeft: '17px', width: '100px'}} onClick={this.showCard.bind(this)}>新增会员</button>
        <table className="col-lg-12 table table-hover" style={{marginTop: '30px', marginLeft: '16px'}}>
          <thead>
          <tr>
            <th>序号</th>
            <th>公司名称</th>
            <th>法人代表</th>
            <th>电话</th>
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
        {!theMemberDetail._id &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">企业会员详情</Modal.Title>
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
                  <input ref="title" type="text" className="form-control" id="inputText3" placeholder="公司名称" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">平台名称</label>
                <div className="col-sm-6">
                  <input ref="platform" type="text" className="form-control" id="inputText3" placeholder="平台名称" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">网址</label>
                <div className="col-sm-6">
                  <input ref="website" type="url" className="form-control" id="inputText3" placeholder="例: http://www.wanglutech.com" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">简介</label>
                <div className="col-sm-6">
                  <input ref="intro" type="text" className="form-control" id="inputText3" placeholder="公司简介" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">法人代表</label>
                <div className="col-sm-6">
                  <input ref="legalRepresentative" type="text" className="form-control" id="inputText3" placeholder="法人代表姓名" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">核心股东</label>
                <div className="col-sm-6">
                  <input ref="stakeHolders" type="text" className="form-control" id="inputText3" placeholder="核心股东姓名" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">高管团队</label>
                <div className="col-sm-6">
                  <input ref="managementTeam" type="text" className="form-control" id="inputText3" placeholder="高管团队(重点部门名称)" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">备案号</label>
                <div className="col-sm-6">
                  <input ref="webRef" type="text" className="form-control" id="inputText3" placeholder="网站备案号" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">网站备案时间</label>
                <div className="col-sm-6">
                  <input ref="webCreatedOn" type="date" className="form-control" id="inputText3"/>
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">地址</label>
                <div className="col-sm-6">
                  <input ref="address" type="text" className="form-control" id="inputText3" placeholder="公司地址" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">电话</label>
                <div className="col-sm-6">
                  <input ref="phone" type="text" className="form-control" id="inputText3" placeholder="公司电话" />
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

        {/* 提示弹窗*/}
        <Popup/>
        {/* 修改弹窗*/}
        {theMemberDetail._id && isVersion === 'false' &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">企业会员详情</Modal.Title>
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
                  <input ref="title" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.title} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">平台名称</label>
                <div className="col-sm-6">
                  <input ref="platform" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.platform}/>
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">网址</label>
                <div className="col-sm-6">
                  <input ref="website" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.website} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">简介</label>
                <div className="col-sm-6">
                  <input ref="intro" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.intro} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">法人代表</label>
                <div className="col-sm-6">
                  <input ref="legalRepresentative" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.legalRepresentative} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">核心股东</label>
                <div className="col-sm-6">
                  <input ref="stakeHolders" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.stakeHolders} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">高管团队</label>
                <div className="col-sm-6">
                  <input ref="managementTeam" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.managementTeam} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">备案号</label>
                <div className="col-sm-6">
                  <input ref="webRef" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.webRef} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">网站备案时间</label>
                <div className="col-sm-6">
                  <input ref="webCreatedOn" type="date" className="form-control" id="inputText3"/>
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">地址</label>
                <div className="col-sm-6">
                  <input ref="address" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.address} />
                </div>
              </div>


              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">电话</label>
                <div className="col-sm-6">
                  <input ref="phone" type="text" className="form-control" id="inputText3" placeholder={theMemberDetail.phone} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-default" onClick={(event) => this.updateMember(event)}>确定</button>
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
    cmsMember: state.cmsMember.cmsMember,
    cmsShow: state.cmsMember.cmsShow,

    theKeyword: state.cmsMember.theKeyword,
    theMemberDetail: state.cmsMember.theMemberDetail,
    pageNum: state.cmsMember.pageNum,
    isVersion: state.cmsMember.isVersion,

    isopen: state.popup.isopen,

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
    queryMember: (pageid) => {
      dispatch(queryMember(pageid));
    },

    savePage: (page) => {
      dispatch(savePage(page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },
    searchMember: (keyword, page) => {
      dispatch(searchMember(keyword, page));
    },
    insertMember: (title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img ) => {
      dispatch(insertMember(title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img ));
    },

    memberDetail: (id) => {
      dispatch(memberDetail(id));
    },
    clearMemberDetail: () => {
      dispatch(clearMemberDetail());
    },
    updateMember: (id, title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img) => {
      dispatch(updateMember(id, title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img));
    },
    prohibitMember: (id) => {
      dispatch(prohibitMember(id));
    },
    changeVersion: (state) => {
      dispatch(changeVersion(state));
    },

    alertOpen: () => {
      dispatch(modalOpen());
    },
    alertText: (desc) => {
      dispatch(setContent(desc));
    },

    imgeUpload: (file) => {
      dispatch(imgeUpload(file));
    },
    saveFile: (fileName) => {
      dispatch(saveFile(fileName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CmsMember);
