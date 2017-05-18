// import { connect } from 'react-redux';
import React, { Component } from 'react';
import HeaderNew from '../../components/HeaderNew';

export default class Member extends Component {

    render() {
      const style = require('./About.scss');
      const member1 = require('./page1.png');
      const member2 = require('./page2.png');
      // const typeColor = '#48a9ff';
      return (
            <div >
                <HeaderNew/>
                <div style={{background: '#e6e8f2', marginTop: '-25px'}}>
                    <div className={'container ' + style.banner}>
                        <div className={'col-lg-12 ' + style.star} key="2" style={{marginBottom: '10px'}}>
                            <img id={style['my-invest-img']} src={member2} />
                            <p>中关村众筹联盟是中关村管委会直接倡导和支持，
                                由国内知名的股权众筹、天使投资、孵化器、银行等相关机构联合发起的全国性众筹行业社团组织。</p>

                            <p>
                                联盟致力于积极推动股权众筹融资试点进程及互联网股权融资行业的健康发展，密切跟踪研究国内外股权众筹、
                                Fintech、区块链等领域的前沿理论和创新实践，服务于创新创业的新模式、新生态。</p>
                        </div>

                        <div className={'col-lg-12 ' + style.star} key="1" style={{marginBottom: '50px'}}>
                            <img id={style['my-invest-img']} src={member1}/>
                            <p> 为了积极推动中关村打造区块链新金融示范应用中心建设，
                                服务于中关村打造全国科技创新中心、国家金融科技创新中心的战略目标，中关村众筹联盟联合中关村大河资本、
                                北京股权交易中心、北京股权登记管理中心、网录科技等多家单位，发起成立区块链新金融实验室。</p>

                            <p>区块链新金融实验室将重点跟踪研究国外先进的区块链技术在新金融领域的创新趋势，
                                积极推动区块链技术在国内新金融领域的示范应用，吸引国内外优秀的区块链新金融相关创业公司到中关村聚集发展。</p>

                            <p>实验室将通过行业调研、专题研讨、应用培训、投融资对接、创业孵化、社群互动、示范应用展示等多种形式，
                                营造区块链新金融生态在中关村创新引领发展的良好氛围。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

