import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Cms extends Component {
  static propTypes = {
    selectModule: PropTypes.func.isRequired,
    cmsModule: PropTypes.string,

    closeCMS: PropTypes.func.isRequired,
    openCMS: PropTypes.func.isRequired,
    cmsShow: PropTypes.bool,
  };
  onClick(event) {
    const module = event.target.name;
    this.props.selectModule(module);
  }

  showCard() {
    this.props.openCMS();
  }
  closeCard() {
    this.props.closeCMS();
  }

  render() {
    const key = require('../Investment/Key.png');
    const style = require('./Cms.scss');
    const { cmsModule, cmsShow } = this.props;

    let title;
    if (cmsModule === 'PERSON') {
      title = '会员信息管理';
    } else if (cmsModule === 'CORP') {
      title = '企业信息管理';
    } else if (cmsModule === 'PROJECT') {
      title = '项目信息管理';
    } else if (cmsModule === 'INVEST') {
      title = '投资机构管理';
    }
    return (
      <div className={style['cms-container'] + ' container'}>
        <h2>区块链新金融实验室管理后台</h2>

        <Modal
          show={cmsShow}
          onHide={this.closeCard.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">会员详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputNumber3" className="col-sm-2 control-label">手机号</label>
                <div className="col-sm-10">
                  <input type="number" className="form-control" id="inputNumber3" placeholder="phone" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputText3" className="col-sm-2 control-label">姓名</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputText3" placeholder="name" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputText3" className="col-sm-2 control-label">会员类型</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputText3" placeholder="type" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputText3" className="col-sm-2 control-label">企业名称</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputText3" placeholder="company" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputText3" className="col-sm-2 control-label">企业简介</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputText3" placeholder="description" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword3" className="col-sm-2 control-label">更改密码</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword3" className="col-sm-2 control-label">确认密码</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword3" placeholder="Password Second" />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">确定</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCard.bind(this)}>关闭</Button>
          </Modal.Footer>
        </Modal>

        <div className={style['cms-left'] + ' col-lg-3'}>
          <button name="PERSON" className="col-lg-12" onClick={this.onClick.bind(this)}>会员信息管理</button>
          <button name="CORP" className="col-lg-12" onClick={this.onClick.bind(this)}>企业信息管理</button>
          <button name="PROJECT" className="col-lg-12" onClick={this.onClick.bind(this)}>项目信息管理</button>
          <button name="INVEST" className="col-lg-12" onClick={this.onClick.bind(this)}>投资机构管理</button>
        </div>
        <div className={style['cms-right'] + ' col-lg-7'}>
          <h3>{title}</h3>
          <div className={style['cms-search'] + ' col-lg-12'}>
            <a style={{cursor: 'pointer'}}><img src={key}/></a>
            <input type="text" className="form-control" placeholder="请输入会员姓名或手机号" />
          </div>
          <button className="col-lg-4 btn btn-success" style={{marginTop: '20px', marginLeft: '17px', width: '100px'}} onClick={this.showCard.bind(this)}>新增会员</button>
          <table className="col-lg-12 table table-hover" style={{marginTop: '30px', marginLeft: '16px'}}>
            <thead>
            <tr>
              <th>序号</th>
              <th>手机号</th>
              <th>姓名</th>
              <th>会员类型</th>
              <th>企业名称</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>1</th>
              <td>1234567890</td>
              <td>astro</td>
              <td>个人</td>
              <td>网录科技</td>
              <td>
                <button type="button" className="btn btn-info">修改</button>
                <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
              </td>
            </tr>

            <tr>
              <th>2</th>
              <td>1234567890</td>
              <td>astro</td>
              <td>个人</td>
              <td>网录科技</td>
              <td>
                <button type="button" className="btn btn-info">修改</button>
                <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
              </td>
            </tr>

            <tr>
              <th>3</th>
              <td>1234567890</td>
              <td>astro</td>
              <td>个人</td>
              <td>网录科技</td>
              <td>
                <button type="button" className="btn btn-info">修改</button>
                <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
              </td>
            </tr>

            <tr>
              <th>4</th>
              <td>1234567890</td>
              <td>astro</td>
              <td>个人</td>
              <td>网录科技</td>
              <td>
                <button type="button" className="btn btn-info">修改</button>
                <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
              </td>
            </tr>

            <tr>
              <th>5</th>
              <td>1234567890</td>
              <td>astro</td>
              <td>个人</td>
              <td>网录科技</td>
              <td>
                <button type="button" className="btn btn-info">修改</button>
                <button type="button" className="btn btn-warning" style={{marginLeft: '10px'}}>禁用</button>
              </td>
            </tr>
            </tbody>
          </table>

          <ul className="pagination pagination-lg col-lg-12" style={{paddingLeft: '80px', paddingBottom: '60px'}}>
            <li><a>&laquo;</a></li>
            <li><a>1</a></li>
            <li><a>2</a></li>
            <li><a>3</a></li>
            <li><a>4</a></li>
            <li><a>5</a></li>
            <li><a>&raquo;</a></li>
          </ul>

        </div>
      </div>
    );
  }
}
