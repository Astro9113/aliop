import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import { selectModule, closeCMS, openCMS, searchInvest, insertInvest, saveKeyword, investDetail, clearDetail, updateInvest } from '../../../../redux/modules/cms';

class CmsCompany extends Component {
  static propTypes = {
    selectModule: PropTypes.func.isRequired,
    cmsModule: PropTypes.string,

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
  };

  componentWillMount() {
    this.props.searchInvest(this.props.theKeyword, 0);
  }

  onClick(event) {
    const module = event.target.name;
    this.props.selectModule(module);
  }

  onSearch() {
    const keyword = document.getElementById('searchInvest').value;
    this.props.searchInvest(keyword, 0);
    this.props.saveKeyword(keyword);
  }

  getPage(event) {
    const page = event.target.name;
    this.props.searchInvest(this.props.theKeyword, page);
  }

  handleSubmit = (event) => {
    const { cate, title, introduction, cases, img } = this.refs;
    event.preventDefault();
    this.props.insertInvest(cate.value, title.value, introduction.value, cases.value, img.value);

    cate.value = '';
    title.value = '';
    introduction.value = '';
    cases.value = '';
    img.value = '';
    this.props.closeCMS();
  };

  updateInvest = (event) => {
    const { cate, title, introduction, cases, img } = this.refs;
    event.preventDefault();
    this.props.updateInvest(this.props.theInvestDetail._id, cate.value, title.value, introduction.value, cases.value, img.value);
    cate.value = '';
    title.value = '';
    introduction.value = '';
    cases.value = '';
    img.value = '';
    this.props.closeCMS();
  };

  showCard() {
    this.props.openCMS();
    this.props.clearDetail();
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
    const style = require('./CmsCompany.scss');
    const { cmsShow, cmsInvest, theInvestDetail } = this.props;

    let pageResult;

    pageResult = Array.apply(null, {length: cmsInvest.totalPage}).map((value, index) => {
      return (
        <li key={index}><a name={index} onClick={this.getPage.bind(this)}>{index + 1}</a></li>
      );
    });

    let startList;
    if (cmsInvest.data && cmsInvest.data.length > 0 ) {
      startList = cmsInvest.data.map((transaction, index) => {
        return (
          <tr key={transaction._id} style={{whiteSpace: 'nowrap'}}>
            <th>{index + 1}</th>
            <td>{transaction.title}</td>
            <td>{transaction.cate}</td>
            <td>
              <button type="button" className="btn btn-info" name ={transaction._id} onClick={this.showDetail.bind(this)}>修改</button>
              <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className={style['cms-right'] + ' col-lg-7'}>
        <h3>企业信息管理</h3>
        <div className={style['cms-search'] + ' col-lg-12'}>
          <a style={{cursor: 'pointer'}}><img src={key} onClick={this.onSearch.bind(this)}/>
            <input id="searchInvest" type="text" className="form-control" placeholder="请输入名称" onKeyDown={this.onSearch.bind(this)}/>
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

        {!theInvestDetail &&
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
                <label htmlFor="inputText3" className="col-sm-4 control-label">长传logo</label>
                <div className="col-sm-6">
                  <input type="file" id="exampleInputFile" ref="img" />
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
        {theInvestDetail &&
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
                <label htmlFor="inputText3" className="col-sm-4 control-label">长传logo</label>
                <div className="col-sm-6">
                  <input type="file" id="exampleInputFile" ref="img" />
                </div>
              </div>

              <div className={style['modal-group'] + ' form-group'}>
                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-default" onClick={(event) => this.updateInvest(event)}>确定</button>
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
    cmsModule: state.cms.cmsModule,
    cmsShow: state.cms.cmsShow,
    cmsInvest: state.cms.cmsInvest,
    theKeyword: state.cms.theKeyword,
    theInvestDetail: state.cms.theInvestDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectModule: (module) => {
      dispatch(selectModule(module));
    },
    closeCMS: () => {
      dispatch(closeCMS());
    },
    openCMS: () => {
      dispatch(openCMS());
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CmsCompany);
