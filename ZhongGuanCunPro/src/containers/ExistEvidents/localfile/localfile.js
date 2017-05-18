import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {fileHash, getFileType, string2Unicode } from '../utils/utils';
import { setFileInfo, add, getShortLink } from '../../../redux/modules/poeLocal';

const TX_TYPE_HASHLINK = 'L';

class LocalFile extends Component {
  static propTypes = {
    txHash: PropTypes.string.isRequired,
    shortLink: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    setFileInfo: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    getShortLink: PropTypes.func.isRequired,
    fileInfo: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    const { txHash } = nextProps;
    if (txHash.length === 66) {
      this.props.getShortLink({txHash});
    }
  }

  handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    fileHash(file, (hash) => {
      this.props.setFileInfo({
        hash: hash,
        filename: file.name,
        filetype: getFileType(file.name),
        filesize: file.size
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { filetype, filename, hash, filesize } = this.props.fileInfo;
    const params = {
      'id': 'CHAINY',
      'version': 1,
      'type': TX_TYPE_HASHLINK
    };
    const description = this.refs.description.value.trim();
    const uDec = string2Unicode(description);
    const uFilename = string2Unicode(filename);
    params.filename = uFilename;
    params.filesize = filesize;
    params.hash = hash;
    params.description = uDec;
    params.filetype = filetype;
    this.props.add(params);
  }

  render() {
    const styles = require('./localfile.scss');
    const alert = require('../../img/ic_alert.png');
    const upload = require('../../img/ic_upload.png');
    const { fileInfo, txHash, shortLink, _id } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <blockquote className={styles.title}>
              <h2>本地文件存证</h2>
            </blockquote>
            <p className={styles.alert}>
              <img src={alert} className={styles.nomargin}/>&nbsp;&nbsp;
              提示：请选择本地文件，区块链将记录文件的哈希值，但并不存储源文件，源文件请妥善保存以便于验证
            </p>
            <div className={'row ' + styles.file_upload}>
              <div className="col-lg-6 col-lg-offset-3">
                <a className={'btn ' + styles.file + ' ' + styles['upload-a']}>
                  <input type="file" name="" id="" onDrop={(event) => this.handleDrop(event)} onChange={(event) => this.handleChange(event)}/>
                  <img src={upload} />
                </a>
                <p>请将需要存证的文件拖放于框内（小于5MB，格式不限)</p>
              </div>
            </div>
            {fileInfo && fileInfo.filename &&
              <div className={styles['ele-layout']}>
                <div className="text-left">
                文件名: {' '}<span>{fileInfo.filename}</span>
                </div>
              <div className="text-left">
                文件类型: {' '}<span>{fileInfo.filetype}</span>
              </div>
              <div className="text-left">
                文件大小（字节）: {' '}<span>{fileInfo.filesize}</span>
              </div>
              <div className="text-left">
                Hash: {' '}<span>{fileInfo.hash}</span>
              </div>
              <div className="form-group">
                <p className="text-left">描述:</p>
                <textarea id="file-info-description" className="form-control"
                      name="upload-file-info-description" rows="3" placeholder="请输入描述，字数请控制在500字以内"
                      ref="description" maxLength="500" />
              </div>
              </div>}
            {txHash &&
              <div className="text-left">
                Transaction Hash: {'  '}<span>{txHash}</span>
              </div>
            }
            {shortLink &&
              <div className="text-left">
                Resource Shortlink: {'  '}<span>{shortLink}</span>
              </div>
            }
            {txHash && shortLink &&
              <h4><Link to={'/transactions/' + _id}>查看交易明细</Link></h4>
            }
            <div className="text-center">
          <a className="btn btn-lg btn-success"
             data-toggle="modal"
             data-target=".bs-example-modal-lg"
             onClick={(event) => this.handleSubmit(event)}>
            <i className="fa fa-sign-in"/>{' '}提交
          </a>
        </div>
          </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fileInfo: state.poeLocal.fileInfo,
    txHash: state.poeLocal.txHash,
    shortLink: state.poeLocal.shortLink,
    _id: state.poe._id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFileInfo: (val) => {
      dispatch(setFileInfo(val));
    },
    add: (val) => {
      dispatch(add(val));
    },
    getShortLink: (val) => {
      dispatch(getShortLink(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalFile);
