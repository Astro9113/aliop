import React, { Component, PropTypes } from 'react';

export default class Warning extends Component {
  static propTypes = {
    warningData: PropTypes.object,
    queryWarningInfo: PropTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.queryWarningInfo();
  }

  render() {
    const style = require('./Warning.scss');
    const icon1 = require('./icon1.png');
    const icon2 = require('./icon2.png');
    const icon3 = require('./icon3.png');

    const warn1 = require('./warn1.png');
    const warn2 = require('./warn2.png');
    const {warningData} = this.props;


    return (
     <div style={{height: '700px'}}>
       {warningData && warningData.data &&
       <div className={style['astro-warning-container']}>
         {warningData.data.basics &&
         <div className={style['astro-warning-container-part1'] + ' ' + style['astro-warning--total']}>
           <h2>困难群众基本信息</h2>
           <p>FIELD NAMES</p>
           <div>
             <strong>收录信息{' '}</strong>
             <img src={icon1} />
             <div className={style['astro-warning-container-part1-line']}></div>
             <h4>{warningData.data.basics.totalRecord}{' '}<small>条</small></h4>

             <strong style={{top: '44%'}}>上链信息{' '}</strong>
             <img src={icon2} style={{top: '44.5%'}}/>
             <h4 style={{top: '42%'}}>{warningData.data.basics.totalMined}{' '}<small>条</small></h4>

             <strong style={{top: '64%', left: '3%'}}>不一致信息{' '}</strong>
             <img src={icon3} style={{top: '64.5%'}}/>
             <h4 style={{top: '62%'}}>{warningData.data.basics.totalInconsistency}{' '}<small>条</small></h4>
           </div>

           <div className={style['astro-warning-container-part1-foot']} >
             <img src={warn1} /><p>{warningData.data.basics.toBeApproved}</p><h2>待审核</h2>
             <div className={style['astro-warning-container-part1-line']} style={{top: '23px', left: '150px', height: '30px'}}></div>
             <img src={warn2} style={{left: '64.5%'}}/><p style={{left: '72%'}}>{warningData.data.basics.hacked}</p><h2 style={{left: '64%'}}>非法篡改</h2>
           </div>
         </div>
         }
         {warningData.data.balance &&
           <div className={style['astro-warning-container-part2'] + ' ' + style['astro-warning--total']} style={{backgroundColor: '#f9fafd'}}>
             <h2>年度收支信息</h2>
             <p>FIELD NAMES</p>
             <div className={style['astro-warning-container-part2']}>
               <strong>收录信息{' '}</strong>
               <img src={icon1} />
               <div className={style['astro-warning-container-part1-line']}></div>
               <h4>{warningData.data.balance.totalRecord}{' '}<small>条</small></h4>

               <strong style={{top: '44%'}}>上链信息{' '}</strong>
               <img src={icon2} style={{top: '44.5%'}}/>
               <h4 style={{top: '42%'}}>{warningData.data.balance.totalMined}{' '}<small>条</small></h4>

               <strong style={{top: '64%', left: '29%'}}>不一致信息{' '}</strong>
               <img src={icon3} style={{top: '64.5%'}}/>
               <h4 style={{top: '62%'}}>{warningData.data.balance.totalInconsistency}{' '}<small>条</small></h4>
             </div>

             <div className={style['astro-warning-container-part1-foot']} >
               <img src={warn1} style={{left: '9%'}} /><p>{warningData.data.balance.toBeApproved}</p><h2>待审核</h2>
               <div className={style['astro-warning-container-part1-line']} style={{top: '23px', left: '150px', height: '30px'}}></div>
               <img src={warn2} style={{left: '64.5%'}}/><p style={{left: '72%'}}>{warningData.data.balance.hacked}</p><h2 style={{left: '64%'}}>非法篡改</h2>
             </div>
           </div>
         }
         {warningData.data.application &&
           <div className={style['astro-warning-container-part3'] + ' ' + style['astro-warning--total']} >
             <h2>救助申请信息</h2>
             <p>FIELD NAMES</p>
             <div className={style['astro-warning-container-part2']}>
               <strong>收录信息{' '}</strong>
               <img src={icon1} />
               <div className={style['astro-warning-container-part1-line']}></div>
               <h4>{warningData.data.application.totalRecord}{' '}<small>条</small></h4>

               <strong style={{top: '44%'}}>上链信息{' '}</strong>
               <img src={icon2} style={{top: '44.5%'}}/>
               <h4 style={{top: '42%'}}>{warningData.data.application.totalMined}{' '}<small>条</small></h4>

               <strong style={{top: '64%', left: '54.5%'}}>不一致信息{' '}</strong>
               <img src={icon3} style={{top: '64.5%'}}/>
               <h4 style={{top: '62%'}}>{warningData.data.application.totalInconsistency}{' '}<small>条</small></h4>
             </div>

             <div className={style['astro-warning-container-part1-foot']} >
               <img src={warn1} style={{left: '9%'}} /><p>{warningData.data.application.toBeApproved}</p><h2>待审核</h2>
               <div className={style['astro-warning-container-part1-line']} style={{top: '23px', left: '150px', height: '30px'}}></div>
               <img src={warn2} style={{left: '64.5%'}}/><p style={{left: '72%'}}>{warningData.data.application.hacked}</p><h2 style={{left: '64%'}}>非法篡改</h2>
             </div>
           </div>
         }
         {warningData.data.service &&
           <div className={style['astro-warning-container-part4'] + ' ' + style['astro-warning--total']} style={{width: '25%', height: '100%', float: 'left', backgroundColor: '#f9fafd'}}>
             <h2>服务信息</h2>
             <p>FIELD NAMES</p>
             <div className={style['astro-warning-container-part2']}>
               <strong>收录信息{' '}</strong>
               <img src={icon1} />
               <div className={style['astro-warning-container-part1-line']}></div>
               <h4>{warningData.data.service.totalRecord}{' '}<small>条</small></h4>

               <strong style={{top: '44%'}}>上链信息{' '}</strong>
               <img src={icon2} style={{top: '44.5%'}}/>
               <h4 style={{top: '42%'}}>{warningData.data.service.totalMined}{' '}<small>条</small></h4>

               <strong style={{top: '64%', left: '79.5%'}}>不一致信息{' '}</strong>
               <img src={icon3} style={{top: '64.5%'}}/>
               <h4 style={{top: '62%'}}>{warningData.data.service.totalInconsistency}{' '}<small>条</small></h4>
             </div>

             <div className={style['astro-warning-container-part1-foot']} >
               <img src={warn1} style={{left: '9%'}} /><p>{warningData.data.service.toBeApproved}</p><h2>待审核</h2>
               <div className={style['astro-warning-container-part1-line']} style={{top: '23px', left: '150px', height: '30px'}}></div>
               <img src={warn2} style={{left: '64.5%'}}/><p style={{left: '72%'}}>{warningData.data.service.hacked}</p><h2 style={{left: '64%'}}>非法篡改</h2>
             </div>
           </div>
         }
       </div>
       }
     </div>
    );
  }
}
