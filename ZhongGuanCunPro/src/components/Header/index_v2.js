import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
export default class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string,
  };

  render() {
    const { pathname } = this.props;
    const logo1 = require('./logo1.png');
    const logo2 = require('../HeaderNew/logo2.png');

    const style1 = require('./Header.scss');
    const style2 = require('../HeaderNew/NewHeader.scss');

    return (
      <div style={{margin: '0'}}>
        <div className= "container">
          { pathname === '/' &&
          <div className= {'container ' + style1['container-1']}>
            <IndexLink to="/"><img src={logo1}/></IndexLink>
            <ul>
              <li><IndexLink to="/">首页</IndexLink></li>
              <li className={style1.my_li}><Link to="/project">众筹公示
                <div className={style1.wb_arrow}></div>
              </Link>
                <ul className={style1.dropdown}>
                  <div className={style1.triangle_border_up}>
                    <span></span>
                  </div>
                  <li><Link to="/project">项目公示</Link></li>
                  <li className={style1.topLine}><Link to="/info">会员详情</Link></li>
                </ul>
              </li>
              <li><IndexLink to="/">北京四板</IndexLink></li>
              <li><Link to="/invest">投资机构</Link></li>
              <li> <Link to="/member">会员服务</Link></li>
            </ul>
          </div>
          }

          { pathname !== '/' &&
          <div className= {'container ' + style2['container-2']}>
            <IndexLink to="/"><img src={logo2}/></IndexLink>
            <ul className={style2.black}>
              <li><IndexLink to="/">首页</IndexLink></li>
              <li className={style2.my_li2}><Link to="/project">众筹公示
                <div className={style2.wb_arrow2}></div>
              </Link>
                <ul className={style2.dropdown2}>
                  <div className={style2.triangle_border_up2}>
                    <span></span>
                  </div>
                  <li><Link to="/project">项目公示</Link></li>
                  <li className={style2.topLine}><Link to="/info">会员详情</Link></li>
                </ul>
              </li>
              <li><IndexLink to="/">北京四板</IndexLink></li>
              <li><Link to="/invest">投资机构</Link></li>
              <li> <Link to="/member">会员服务</Link></li>
            </ul>
          </div>
          }

        </div>
      </div>
    );
  }
}
