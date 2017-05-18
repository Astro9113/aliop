import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { chooseImg } from '../../redux/modules/home';

class Home extends Component {

  static propTypes = {
    pathname: PropTypes.string,
    homeImg: PropTypes.string,
    chooseImg: PropTypes.func.isRequired,

  };

  onMouseOver(event) {
    // console.log('home-img-name', event.target.name);
    this.props.chooseImg(event.target.name);
  }

  onMouseLeave() {
    this.props.chooseImg('');
  }

  render() {
    const style = require('./Home.scss');
    const left = require('./left.png');
    const right = require('./right.png');
    const end = require('./end.jpg');

    const system = require('./ellipse.jpg');

    // const leftA = require('./LeftArrow.png');
    // const rightA = require('./RightArrow.png');
    // <img className={style.two} src={leftA} />
    // <img className={style.third} src={rightA}/>

    const carousel1 = require('./img/carousel1.png');
    const carousel2 = require('./img/carousel2.png');
    const carousel3 = require('./img/carousel3.png');
    const carousel4 = require('./img/carousel4.png');
    const carousel5 = require('./img/carousel5.png');
    const carousel6 = require('./img/carousel6.png');
    const carousel7 = require('./img/carousel7.png');

    const icon1 = require('./img/1.png');
    const icon2 = require('./img/2.png');
    const icon3 = require('./img/3.png');
    const icon4 = require('./img/4.png');
    const icon5 = require('./img/5.png');

    const {homeImg} = this.props;

    // <p>应用区块链为底层技术更安全</p>
    return (
      <div>
        <Header/>
        <div className={style['my-home-before']}></div>
        <div className= {style.home}></div>
        <div className={'container ' + style.crowd}>
          <h2 className="col-lg-12">会员公示</h2>
          <p className="col-lg-12" style={{color: '#cccccc'}}>使用区块链技术支持的公示与存证</p>
          <div className="col-lg-6">
            <img src={right}/>
            <Link to="/info"><button className={style.butttonRight}>企业信息</button></Link>
            <p className={'col-lg-12 ' + style.pLeft }>使用区块链技术支持的公示与存证</p>
          </div>
          <div className="col-lg-6">
            <img src={left}/>
            <Link to="/project"><button className={style.butttonLeft}>项目信息</button></Link>
            <p className={'col-lg-12 ' + style.pLeft }>使用区块链技术支持的公示与存证</p>
          </div>
        </div>
        { homeImg === '' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img1' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" style={{opacity: '1', zIndex: '999'}} src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img2' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} style={{zIndex: '999'}} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img3' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} style={{zIndex: '999'}} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img4' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} style={{zIndex: '999'}} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img5' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} style={{zIndex: '999'}} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img6' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" style={{opacity: '1', zIndex: '999'}} src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        { homeImg === 'my_img7' &&
        <div className= {style.system}>
          <h2 className="col-lg-12">示范应用</h2>
          <img className={style.one} src={system} />
          <img name="my_img1" src={carousel1} className={style.my_carousel + ' ' + style.my_img1} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img2" src={carousel2} className={style.my_carousel + ' ' + style.my_img2} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img3" src={carousel3} className={style.my_carousel + ' ' + style.my_img3} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img6" src={carousel6} className={style.my_carousel + ' ' + style.my_img6} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img7" src={carousel7} style={{zIndex: '999'}} className={style.my_carousel + ' ' + style.my_img7} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img5" src={carousel5} className={style.my_carousel + ' ' + style.my_img5} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
          <img name="my_img4" src={carousel4} className={style.my_carousel + ' ' + style.my_img4} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}/>
        </div>
        }

        <div className= {style.end}>
          <img src={end} style={{width: '100%'}}/>
          <h2 className="col-lg-12">会员服务</h2>
          <p className={style['my-home-end'] + ' col-lg-12'} style={{color: '#cccccc'}}>相关资讯、咨询服务、相关单位协会快捷导航</p>
          <div className={style.my_icon1}>
            <img src={icon1} /><p>三大学术支持机构</p><hr/>
          </div>
          <div className={style.my_icon2}>
            <img src={icon2} /><p>征信查询</p><hr/>
          </div>
          <div className={style.my_icon3}>
            <img src={icon3} /><p>网络安全风险预警</p><hr/>
          </div>
          <div className={style.my_icon4}>
            <img src={icon4} /><p>相关法律法规查询、咨询服务</p><hr/>
          </div>
          <div className={style.my_icon5}>
            <img src={icon5} /><p>重点相关政府、协会一键直达</p><hr/>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeImg: state.home.homeImg,
    pathname: state.routing.locationBeforeTransitions.pathname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseImg: (module) => {
      dispatch(chooseImg(module));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
