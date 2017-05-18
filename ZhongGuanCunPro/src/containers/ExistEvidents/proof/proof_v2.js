import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
// import AlertDialog from '../dialog/alert';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fileHash } from '../utils/utils';
import { getFileInfo, verify, setProof } from '../../../redux/modules/proof';
import { unicode2String } from '../utils/utils';
import moment from 'moment';
moment.locale('zh');


const styles = require('./proof.scss');

class Proof extends Component {
  static propTypes = {
    senderAddress: PropTypes.string.isRequired,
    txHash: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    fileInfo: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
    getFileInfo: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
    console.log('componentWillUnmount', this.props);
  }

  handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const msgHash = event.target.name;

    fileHash(file, (hash) => {
      if (hash === msgHash) {
        alert('验证成功！文件没有修改');
      } else {
        alert('验证失败！您对文件进行了修改');
      }
    });
  }

  handleSubmit() {
    event.preventDefault();
    const shortCodeTmp = ReactDOM.findDOMNode(this.refs.input_short_code).value.trim();
    console.log(shortCodeTmp);
    this.props.verify(shortCodeTmp);
    console.log(this.props);
  }

  uniDescription(desc, description) {
    return desc || description;
  }


  render() {
    const upload = require('../../img/ic_upload.png');

    const { fileInfo, senderAddress } = this.props;
    const { hash, desc, description, filetype, url } = fileInfo;
    let { filename } = fileInfo;
    let { timestamp } = this.props;
    let oDescription;
    if (timestamp) timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    if (desc || description) {
      oDescription = this.uniDescription(desc, description);
      oDescription = unicode2String(oDescription);
    }
    if (filename) filename = unicode2String(filename);

    return (
      <div className={styles.title}>
        <Helmet title="验证"/>
        <div className={styles['ele-layout']}>
          <label className={styles['proof-title']} >搜索存证</label>
          <div className={styles['short-code-input-group']}>
            <table style={{width: '1200px'}}>
              <tbody>
              <tr>
                <td>
                  <input type="text" ref="input_short_code" className={styles['short-code-input']} placeholder="请输入短码"/>
                </td>
                <td className="">
                  <button className={styles['proof-btn']} type="button" onClick={(event) => this.handleSubmit(event)}>&nbsp;</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style={{height: '300px'}}>
            <table className={styles['proof-content-table']}>
              <tbody>
              <tr>
                <td className={'clearfix ' + styles['file-area-td']}>
                  <div className={styles['proof-file-area']}>
                    <div className={'upload-bg ' + styles['proof-upload-bg'] }>
                      <a className={'btn ' + styles.file + ' ' + styles['upload-a']}>
                        <input type="file" name={hash} id="" onDrop={this.handleDrop} onChange={this.handleChange}/>
                        <img src={upload} />
                        <p>
                          请将需要存证的<br/>文件拖放于框内<br/>（小于5MB，格式不限）
                        </p>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className={styles['text-td']} ref="display_text_td" style={{width: '1200px', margin: '0 auto'}}>
            <table className="table table-hover">
              <tbody>
              <tr>
                <td>
                  <div className="clearfix">
                    <h2 >对应的区块链数据：</h2>
                    <br/>
                    <span className={styles['proof-text-content']}><strong>提示：</strong></span>
                    <br/>
                    <div className={styles['proof-text-content']}>
                        <span >
                            当前页面包含嵌入到网录区块链的数字签名文件的信息，因为交易已经被确认，所以是被永远存证的。
                        </span>
                    </div>
                  </div>
                </td>
              </tr>
              {hash &&
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>
                      <span id="trasaction-time"><strong>入链时间：</strong>{timestamp}</span>
                    </div>
                  </div>
                </td>
              </tr>
              }
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>文件HASH：</strong>{hash && <span id="trasaction-time">{hash}</span>}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>文件名：</strong>{filename && <span id="trasaction-time">{filename}</span>}</span>

                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>文件描述： </strong>{oDescription && <span id="trasaction-time">{oDescription}</span> }</span>

                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>文件类型： </strong>{filetype && <span id="trasaction-time">{filetype}</span> }</span>

                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>远程文件URI： </strong>{url && <span id="trasaction-time">{url}</span>}</span>

                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="clearfix">
                    <div className={styles['proof-text-content']}>

                      <span><strong>交易发起账户： </strong>{senderAddress && <span id="trasaction-time">{senderAddress}</span> }</span>

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

const mapStateToProps = (state) => {
  return {
    senderAddress: state.proof.senderAddress,
    txHash: state.proof.txHash,
    fileInfo: state.proof.fileInfo,
    timestamp: state.proof.timeStamp
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (code) => {
      dispatch(verify(code));
    },
    getFileInfo: (code) => {
      dispatch(getFileInfo(code));
    },
    reset: () => {
      dispatch(setProof());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proof);
