import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    const styles = require('./Footer.scss');

    const address = require('./phone2.png');
    const phone = require('./email.png');
    const footerlogo = require('./footlogo2png.png');
    return (
      <footer className={styles.bottomPart} >
        <div className={styles.fisrtPart}>
          <div className={styles.wrapper + ' clearfix'}>
            <div className={styles.left}>
              <p><img src={address} />地址：北京市 海淀区 科学院南路2号 融科资讯中心A座409</p>
              <p><img src={phone}/>邮箱：zhongchou@vip.126.com</p>
            </div>
            <div className={styles.right}>
              <img src={footerlogo}/>
              <Link to="/about"><p>[ 关于我们 ]</p></Link>
            </div>
          </div>
        </div>
        <div className={styles.secondPart}>
            <p>备案号：京ICP备17023311号&nbsp;&nbsp;&nbsp;&nbsp;
                免责声明：本网站使用区块链技术进行存证，所有信息经信息提供方进行确认，平台不保证投资项目本身的风险提供保证，请投资人谨慎投资
            </p>
        </div>
      </footer>
    );
  }
}
