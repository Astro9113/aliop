// import { connect } from 'react-redux';
import React, { Component } from 'react';
import HeaderNew from '../../components/HeaderNew';

export default class Member extends Component {

    render() {
      const style = require('./Member.scss');
      const member1 = require('./member1.png');
      const member2 = require('./member2.png');
      const typeColor = '#48a9ff';
      const memberColor = {background: '#e6e8f2', marginTop: '-55px'};
      return (
            <div>
                <HeaderNew/>
                <div className= {style.member}>
                </div>
                <div style={memberColor}>
                    <div className={'container ' + style.banner}>
                        <h2>会员服务</h2>
                        <p>众筹联盟会员单位通过联盟的认证后加入，会员信息经过核对后存证于区块链中，确保信息无法篡改</p>

                        <div className={'col-lg-12 ' + style.star} key="2" style={{marginBottom: '20px'}}>
                            <img id={style['my-invest-img']} src={member1} style={{width: '80px', height: '80px'}}/>
                            <div className={style['my-invest-list'] + ' clearfix '}>
                                <div className={style['my-radius']} style={{borderColor: `${typeColor}`}}></div>
                                <a href="http://www.rcps.org.cn" target="_blank"><strong>中国社科院金融所支付清算中心</strong></a>
                                <p style={{marginBottom: '2rem'}}>中国社科院金融所支付清算研究中心是由中国社会科学院批准设立的所级非实体性研究
                                    单位， 由中国社会科学院金融研究所作为主管单位，专门从事支付清算理论、政策、行业、技术等方面的重大问题研究。
                                    跟踪研究国内外支付清算领域的前沿问题和动态、支付清算行业发展新状况、法规政策的变化，
                                    围绕支付清算体系的改革与发展开展各类学术研究、政策研究，推动支付清算市场的创新活动，通过举办研讨会、
                                    开展课题研究、咨询和培训等形式来促进支付清算市场及监管的改革与发展。</p>
                            </div>
                        </div>

                        <div className={'col-lg-12 ' + style.star} key="3" style={{marginBottom: '20px'}}>
                            <img id={style['my-invest-img']} src={member2} style={{width: '80px', height: '80px'}}/>
                            <div className={style['my-invest-list'] + ' clearfix '}>
                                <div className={style['my-radius']} style={{borderColor: `${typeColor}`}}></div>
                                <a href="http://ifls.cupl.edu.cn/" target="_blank"><strong>中国政法大学互联网金融法律研究院</strong></a>
                                <p style={{marginBottom: '2rem'}}>中国政法大学互联网金融法律研究院成立于2015年12月4日，
                                    是目前中国高校和科研机构中唯一以互联网金融法律研究为中心的专门的教学科研机构，是中国政法大学在编科研机构，
                                    设有硕士点与博士点。以与互联网和金融相关的法律问题为研究重点，以金融监管、金融创新、金融消费者权益保护、
                                    互联网金融、网络安全、大数据及其法制建设等为研究主题，整合法学与互联网金融资源，
                                    力争将研究院建成相关领域的权威专家智库和咨询服务机构、法律研究和人才培养基地，
                                    为国家在互联网金融方面发展过程中的法律问题提出对策和建议。首任院长由中国政法大学教授、
                                    博士生导师李爱君担任。</p>
                            </div>
                        </div>

                        <div className={'col-lg-12 ' + style.star } key="1">
                            <img id={style['my-invest-img']} src={member2} style={{width: '80px', height: '80px'}}/>
                            <div className={style['my-invest-list'] + ' clearfix '}>
                                <div className={style['my-radius']} style={{borderColor: `${typeColor}`}}></div>
                                <a href="http://nads.ruc.edu.cn/displaynews.php?id=4301" target="_blank">
                                    <strong style={{color: '#337ab7'}}>中国人民大学金融科技与互联网安全研究中心</strong></a>
                                <p style={{marginBottom: '2rem'}}>中国人民大学金融科技与互联网安全研究中心是国内首家以金融科技命名的研究中心，
                                    设在国家首批十大智库之一的国家发展与战略研究院内，依托人大法学院、信息学院、财政金融学院、商学院、
                                    高礼研究院、汉青经济与金融高级研究院等院系，汇聚了互联网金融、金融科技、大数据、区块链、信息、
                                    计算机等领域的青年学者。目前研究中心承接了众多国家级和重量级课题，与蚂蚁金服、京东金融、腾讯、奇虎360、
                                    乐视、中国联通等企业和机构保持深度合作关系，与高礼研究院共同成立了大数据金融实验室、
                                    区块链实验室等中国首批创新实验室。研究中心一直致力于打造支持行业发展的高层次、专业化的国家金融创新的智库，
                                    以及金融创新的“政产学研用”合作平台。本平台由中国人民大学法学院副院长、
                                    金融科技与互联网安全研究中心主任杨东教授及其团队运营。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         ishidden: state.header.ishidden,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         chooseHidden: (module) => {
//             dispatch(chooseHidden(module));
//         },
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Header);
