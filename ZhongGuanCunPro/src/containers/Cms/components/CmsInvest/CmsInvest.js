import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { closeCMS, openCMS, searchInvest, insertInvest, saveKeyword, investDetail, clearDetail, updateInvest, prohibit, savePage } from '../../../../redux/modules/cms';
import { imgeUpload, saveFile} from '../../../../redux/modules/cmsMember';

class CmsInvest extends Component {
  static propTypes = {
    closeCMS: PropTypes.func.isRequired,
    openCMS: PropTypes.func.isRequired,
    cmsShow: PropTypes.bool,
    searchInvest: PropTypes.func.isRequired,
    cmsInvest: PropTypes.object.isRequired,
    insertInvest: PropTypes.func.isRequired,
    saveKeyword: PropTypes.func.isRequired,
    theKeyword: PropTypes.string,
    investDetail: PropTypes.func.isRequired,
    theInvestDetail: PropTypes.object,
    clearDetail: PropTypes.func.isRequired,
    updateInvest: PropTypes.func.isRequired,
    prohibit: PropTypes.func.isRequired,
    savePage: PropTypes.func.isRequired,
    pageNum: PropTypes.string,

    imgeUpload: PropTypes.func.isRequired,
    memberUrl: PropTypes.object,
    fileName: PropTypes.object,
    saveFile: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.searchInvest(this.props.theKeyword, 0);
  }

  onSearch() {
    const keyword = document.getElementById('searchInvest').value;
    this.props.searchInvest(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  getPage(event) {
    const page = event.target.name;
    this.props.savePage(page);
    setTimeout(() => {
      this.props.searchInvest(this.props.theKeyword, page);
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
    const { cate, title, introduction, cases, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url;

    this.props.insertInvest(cate.value, title.value, introduction.value, cases.value, imgUrl);

    cate.value = ''; title.value = ''; introduction.value = ''; cases.value = ''; img.value = '';

    setTimeout(() => {
      this.props.searchInvest(this.props.theKeyword, 0);
      this.props.closeCMS();
    }, 1000);
  };

  updateInvest = (event) => {
    const { cate, title, introduction, cases, img } = this.refs;
    event.preventDefault();
    const imgUrl = this.props.memberUrl.url === '' ? '' : this.props.memberUrl.url;

    const cateValue = cate.value !== '' ? cate.value : this.props.theInvestDetail.cate;
    const titleValue = title.value !== '' ? title.value : this.props.theInvestDetail.title;
    const introductionValue = introduction.value !== '' ? introduction.value : this.props.theInvestDetail.introduction;
    const casesValue = cases.value !== '' ? cases.value : this.props.theInvestDetail.cases;
    const imgValue = imgUrl !== '' ? imgUrl : this.props.theInvestDetail.img;

    this.props.updateInvest(this.props.theInvestDetail._id, cateValue, titleValue, introductionValue, casesValue, imgValue);
    cate.value = ''; title.value = ''; introduction.value = ''; cases.value = ''; img.value = '';

    setTimeout(() => {
      this.props.searchInvest(this.props.theKeyword, this.props.pageNum);
      this.props.closeCMS();
    }, 1000);
  };

  prohibit(event) {
    const id = event.target.name;
    // const isPublished = false;
    this.props.prohibit(id);

    setTimeout(() => {
      this.props.searchInvest(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  proOpen(event) {
    const id = event.target.name;
    // const isPublished = true;
    this.props.prohibit(id);

    setTimeout(() => {
      this.props.searchInvest(this.props.theKeyword, this.props.pageNum);
    }, 500);
  }

  showCard() {
    this.props.clearDetail();
    this.props.openCMS();
  }

  showDetail(event) {
    const updateId = event.target.name;
    this.props.investDetail(updateId);
    this.props.openCMS();
  }

  closeCard() {
    this.props.closeCMS();
  }


  render() {
    const key = require('../../../../components/Investment/Key.png');
    const style = require('./CmsInvest.scss');
    const { cmsShow, cmsInvest, theInvestDetail } = this.props;

    // 页码
    let pageResult;
    pageResult = Array.apply(null, {length: cmsInvest.totalPage}).map((value, index) => {
      return (
        <li key={index}><a name={index} onClick={this.getPage.bind(this)}>{index + 1}</a></li>
      );
    });

    // 列表
    let startList;
    if (cmsInvest.data && cmsInvest.data.length > 0 ) {
      startList = cmsInvest.data.map((transaction, index) => {
        let cate;
        if (transaction.cate === 'P') {
          cate = '投资人';
        } else if (transaction.cate === 'C') {
          cate = '投资机构';
        }

        return (
          <tr key={transaction._id} style={{whiteSpace: 'nowrap'}}>
            <th>{index + 1}</th>
            <td>{transaction.title}</td>
            <td>{cate}</td>
            <td>
              <button type="button" className="btn btn-info" name ={transaction._id} onClick={this.showDetail.bind(this)}>修改</button>
              { transaction.isPublished &&
              <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}} name ={transaction._id} onClick={this.prohibit.bind(this)}>禁用</button>
              }

              { !transaction.isPublished &&
              <button type="button" className="btn btn-danger" style={{marginLeft: '10px'}} name ={transaction._id} onClick={this.proOpen.bind(this)}>开启</button>
              }

            </td>
          </tr>
        );
      });
    }
    return (
      <div className={style['cms-right'] + ' col-lg-7'}>
        <h3>投资机构管理</h3>
        <div className={style['cms-search'] + ' col-lg-12'}>
          <a style={{cursor: 'pointer'}}><img src={key} onClick={this.onSearch.bind(this)}/>
            <input id="searchInvest" type="text" className="form-control" placeholder="请输入要查询的投资机构、投资人" onKeyPress={this.onSearch.bind(this)}/>
          </a>
        </div>
        <button className="col-lg-4 btn btn-success" style={{marginTop: '20px', marginLeft: '17px', width: '100px'}} onClick={this.showCard.bind(this)}>新增会员</button>
        <table className="col-lg-12 table table-hover" style={{marginTop: '30px', marginLeft: '16px'}}>
          <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>类型</th>
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
        {!theInvestDetail._id &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">投资人/机构</Modal.Title>
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
                <label htmlFor="inputText3" className="col-sm-4 control-label">投资类型</label>
                <div className="col-sm-6">
                  <select ref="cate" className="form-control">
                    <option value="C">投资机构</option>
                    <option value="P">投资人</option>
                  </select>
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">名称</label>
                <div className="col-sm-6">
                  <input ref="title" type="text" className="form-control" id="inputText3" placeholder="投资机构/投资人姓名" />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">简介</label>
                <div className="col-sm-6">
                  <input ref="introduction" type="text" className="form-control" id="inputText3" placeholder="简介" />
                </div>
              </div>
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">机构案例</label>
                <div className="col-sm-6">
                  <input ref="cases" type="text" className="form-control" id="inputText3" placeholder="机构案例" />
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
        {theInvestDetail._id &&
        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">投资人/机构</Modal.Title>
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

              {theInvestDetail.cate === 'C' &&
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">投资类型</label>
                <div className="col-sm-6">
                  <select ref="cate" className="form-control">
                    <option value="C">投资机构</option>
                    <option value="P">投资人</option>
                  </select>
                </div>
              </div>
              }

              { theInvestDetail.cate === 'P' &&
              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">投资类型</label>
                <div className="col-sm-6">
                  <select ref="cate" className="form-control">
                    <option value="P">投资人</option>
                    <option value="C">投资机构</option>
                  </select>
                </div>
              </div>
              }

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">名称</label>
                <div className="col-sm-6">
                  <input ref="title" type="text" className="form-control" id="inputText3" placeholder={theInvestDetail.title} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">简介</label>
                <div className="col-sm-6">
                  <input ref="introduction" type="text" className="form-control" id="inputText3" placeholder={theInvestDetail.introduction} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <label htmlFor="inputText3" className="col-sm-4 control-label">机构案例</label>
                <div className="col-sm-6">
                  <input ref="cases" type="text" className="form-control" id="inputText3" placeholder={theInvestDetail.cases} />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-default" name ={theInvestDetail._id} onClick={(event) => this.updateInvest(event)}>确定</button>
                </div>
              </div>
            </form>
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
    cmsShow: state.cms.cmsShow,
    cmsInvest: state.cms.cmsInvest,
    theKeyword: state.cms.theKeyword,
    theInvestDetail: state.cms.theInvestDetail,
    pageNum: state.cms.pageNum,

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
    savePage: (page) => {
      dispatch(savePage(page));
    },
    saveKeyword: (keyword) => {
      dispatch(saveKeyword(keyword));
    },
    searchInvest: (keyword, page) => {
      dispatch(searchInvest(keyword, page));
    },
    insertInvest: (cate, title, introduction, cases, img ) => {
      dispatch(insertInvest(cate, title, introduction, cases, img ));
    },

    investDetail: (id) => {
      dispatch(investDetail(id));
    },
    clearDetail: () => {
      dispatch(clearDetail());
    },
    updateInvest: (id, cate, title, introduction, cases, img ) => {
      dispatch(updateInvest(id, cate, title, introduction, cases, img ));
    },
    prohibit: (id) => {
      dispatch(prohibit(id));
    },

    imgeUpload: (file) => {
      dispatch(imgeUpload(file));
    },
    saveFile: (fileName) => {
      dispatch(saveFile(fileName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CmsInvest);
