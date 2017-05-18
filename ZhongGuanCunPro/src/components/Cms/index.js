import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import HeaderNew from '../../components/HeaderNew';

export default class Cms extends Component {
  static propTypes = {
    children: PropTypes.object,
    selectModule: PropTypes.func.isRequired,
    cmsModule: PropTypes.string,

    closeCMS: PropTypes.func.isRequired,
    openCMS: PropTypes.func.isRequired,
    cmsShow: PropTypes.bool,
    pathname: PropTypes.string,

    user: PropTypes.object,
  };

  render() {
    const style = require('./Cms.scss');

    const { pathname, user } = this.props;
    const butColor = {background: '#0588fa', color: '#ffffff'};
    const notlogin = {marginTop: '150px', marginBottom: '350px'};

    return (
        <div>
          {user && user.uid &&
          <div className={style['cms-container'] + ' container'}>
            <HeaderNew/>
            <h2>区块链新金融实验室管理后台</h2>
            {pathname === '/cms' &&
            <div className={style['cms-left'] + ' col-lg-3'}>
              <Link to="/cms"><button name="Member" className="col-lg-12" style={butColor}>会员信息管理</button></Link>
              <Link to="/cms/projects"><button name="Project" className="col-lg-12" >项目信息管理</button></Link>
              <Link to="/cms/invests"><button name="Invest" className="col-lg-12" >投资机构管理</button></Link>
            </div>
            }
            {pathname === '/cms/projects' &&
            <div className={style['cms-left'] + ' col-lg-3'}>
              <Link to="/cms"><button name="Member" className="col-lg-12" >会员信息管理</button></Link>
              <Link to="/cms/projects"><button name="Project" className="col-lg-12" style={butColor}>项目信息管理</button></Link>
              <Link to="/cms/invests"><button name="Invest" className="col-lg-12" >投资机构管理</button></Link>
            </div>
            }
            {pathname === '/cms/invests' &&
            <div className={style['cms-left'] + ' col-lg-3'}>
              <Link to="/cms"><button name="Member" className="col-lg-12" >会员信息管理</button></Link>
              <Link to="/cms/projects"><button name="Project" className="col-lg-12" >项目信息管理</button></Link>
              <Link to="/cms/invests"><button name="Invest" className="col-lg-12" style={butColor}>投资机构管理</button></Link>
            </div>
            }
            {this.props.children}
          </div>
          }
          {!(user && user.uid) &&
          <div className={style['cms-container'] + ' container'}>
            <HeaderNew/>
            <h2>区块链新金融实验室管理后台</h2>
            <h2 style={notlogin}>您未登录！！！</h2>
          </div>
          }
        </div>
    );
  }
}
