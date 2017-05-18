import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Popup from '../../containers/Popup/Popup';

export default class MemberDetail extends Component {
  static propTypes = {
    alertContent: PropTypes.func.isRequired,
    alertClose: PropTypes.func.isRequired,
    alertOpen: PropTypes.func.isRequired,
    isopen: PropTypes.bool
  };

  handleChange() {
    event.preventDefault();
    // const file = event.target.files[0];
    // const msgHash = event.target.name;

    const hash = 'text';
    const msgHash = 'text';

    if (hash === msgHash) {
      const text = {'text': '验证成功！文件没有修改'};
      this.props.alertContent(text);
      this.props.alertOpen();
    } else {
      const text = {'text': '验证失败！您对文件进行了修改'};
      this.props.alertContent(text);
      this.props.alertOpen();
    }

    // fileHash(file, (hash) => {
    //   if (hash === msgHash) {
    //     const text = {'text': '验证成功！文件没有修改'};
    //     this.props.alertContent(text);
    //     this.props.alertOpen();
    //   } else {
    //     const text = {'text': '验证失败！您对文件进行了修改'};
    //     this.props.alertContent(text);
    //     this.props.alertOpen();
    //   }
    // });
  }


  render() {
    const style = require('./MemberDetail.scss');
    const upload = require('./upload.png');

    const address = require('./address.png');
    const beian = require('./baian.png');
    const beiantime = require('./beiantime.png');
    const buildtime = require('./buildtime.png');
    const online = require('./online.png');
    const people = require('./people.png');
    const phone = require('./phone.png');

    return (
      <div>
        <div className= {style.member}>
          <div className={'col-lg-12 ' + style.msg}>
            <div className="container">
              <h2>会员快捷查询导航</h2>
              <p>相关资讯、咨询服务、相关单位协会快捷导航</p>
            </div>
          </div>
        </div>
        <Popup />
        <div className="container">
          <div className={'row ' + style.row} style={{marginTop: '2rem'}}>
            <div className={'col-lg-12 ' + style['my-img']}>
              <div className="col-lg-3"><img src={beian}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>备案号</h2><p style={{paddingLeft: '3rem'}}>京601119888</p></div>
              <div className="col-lg-3"><img src={beiantime}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>网站备案时间</h2><p style={{paddingLeft: '3rem'}}>2016-06-11</p></div>
              <div className="col-lg-3"><img src={people}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>会员法人代表</h2><p style={{paddingLeft: '3rem'}}>***</p></div>
              <div className="col-lg-3"><img src={address}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>地址</h2><p style={{paddingLeft: '3rem'}}>***************</p></div>
              <div className="col-lg-3"><img src={phone}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>电话</h2><p style={{paddingLeft: '3rem'}}>*********************</p></div>
              <div className="col-lg-3"><img src={online}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>网站上线时间</h2><p style={{paddingLeft: '3rem'}}>*********************</p></div>
              <div className="col-lg-3"><img src={buildtime}/><h2 style={{display: 'inline-block', paddingLeft: '1rem'}}>企业成立时间</h2><p style={{paddingLeft: '3rem'}}>*********************</p></div>
            </div>
          </div>

          <div className={style.row}>
            <table className={style['proof-content-table']}>
              <tbody>
              <tr>
                <td className={'clearfix ' + style['file-area-td']}>
                  <div className="container">
                    <div className={'upload-bg ' + style['proof-upload-bg'] }>
                      <Link to="/test">
                        <img src={upload} />
                        <button className={style.butttonLeft}>信息区块链查验</button>
                        <p>使用区块链技术支持的公示与存证</p>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
