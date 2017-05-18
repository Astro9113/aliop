import React from 'react';
import QRCode from 'qrcode.react';

//
// sites               : ["qzone", "weibo", "google", "twitter", "qq",
//   "tencent", "wechat", "douban", "linkedin", "facebook"], // 启用的站点
//     url                 : '', // 网址，默认使用 window.location.href
//     source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="https://github.com/DawnyWu/react-share-buttons" />
//     title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="react-share-buttons" />
//     description         : '', // 描述, 默认读取head标签：<meta name="description" content="一键分享到各大社交网站的react组件" />
//     image               : '', // 图片, 默认取网页中第一个img标签
//     wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
//     wechatQrcodeHelper  : '微信里点“发现”，扫一下二维码便可将本文分享至朋友圈'

const propTypes = {
  url: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  sites: React.PropTypes.array,
  wechatQrcodeTitle: React.PropTypes.string,
  wechatQrcodeHelper: React.PropTypes.string,
  origin: React.PropTypes.string,
  site: React.PropTypes.string,
};

function getMetaContentByName(name) {
  if (typeof window !== 'undefined') {
    return (document.getElementsByName(name)[0] || 0).content;
  }
}

let image;
let site;
let title;
let description;
let url;
let origin;
if (typeof window !== 'undefined') {
  image = (document.images[0] || 0).src || '';
  site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
  title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
  description = getMetaContentByName('description') || getMetaContentByName('Description') || '';
  url = location.href;
  origin = location.origin;
}

const defaultProps = {
  url: url,
  origin: origin,
  title: title,
  description: description,
  summary: description,
  image: image,
  site: site,
  source: site,
  sites: ['qzone', 'weibo', 'google', 'twitter', 'qq',
          'tencent', 'wechat', 'douban', 'linkedin', 'facebook'],
  wechatQrcodeTitle: '微信扫一扫：分享',
  wechatQrcodeHelper: '微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。',
};

class ShareButtons extends React.Component {

  render() {
    const sites = this.props.sites;
    url = this.props.url;
    const wechatQrcodeTitle = this.props.wechatQrcodeTitle;
    const wechatQrcodeHelper = this.props.wechatQrcodeHelper;

    title = encodeURIComponent(this.props.title);
    description = encodeURIComponent(this.props.description);
    image = encodeURIComponent(this.props.image);
    site = encodeURIComponent(this.props.site);
    origin = encodeURIComponent(this.props.origin);

    const summary = description;
    const source = site;

    const templates = {
      qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
      tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
      weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
      wechat: `javascript:`,
      douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
      diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
      linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
      google: `https://plus.google.com/share?url=${url}`
    };

    const css = require('./css/share.scss');
    const html = sites.map((sit, index) => {
      if (sit === 'wechat') {
        return (
            <a className={css['social-share-icon'] + ' ' + css['icon-wechat']} target="_blank" href="javascript:" key={index}>
              <div className={css['wechat-qrcode']}>
                <h4>{wechatQrcodeTitle}</h4>
                <div className={css.qrcode}>
                  <QRCode value={url} size={100} />
                </div>
                <div className={css.help}>
                  <p>{wechatQrcodeHelper}</p>
                </div>
              </div>
            </a>
        );
      } else if (sit !== 'wechat') {
        const className = css[`icon-${sit}`] + ' ' + css['social-share-icon'];
        return (
            <a className={className} href={templates[sit]} target="_blank" key={index}></a>
        );
      }
    });
    return (
      <div className={css['social-share']}>
        {html}
      </div>
    );
  }
}

ShareButtons.propTypes = propTypes;
ShareButtons.defaultProps = defaultProps;

export default ShareButtons;
