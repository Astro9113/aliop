import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('zh');

import {trBody} from '../../../../../Helper/from/tr';

import { userDetailInfoChangeOpen, userDetailInfoChangeClose, queryUserDetail } from '../../../../../../redux/modules/userDetail';

class InfoTable extends Component {
  static propTypes = {
    name: PropTypes.string,
    userDetailInfoChange: PropTypes.bool,
    userDetailInfoChangeOpen: PropTypes.func,
    userDetailInfoChangeClose: PropTypes.func,

    // userinfo: PropTypes.object,
    queryUserDetail: PropTypes.func,
    applyId: PropTypes.string,

    userDetailData: PropTypes.object,
  };

  // componentWillMount() {
  //   this.props.queryUserDetail(this.props.applyId);
  // }
  showCard() {
    this.props.userDetailInfoChangeOpen();
  }
  render() {
    const style = require('./InfoTable.scss');

    const {userDetailData} = this.props;

    let meta;
    if (userDetailData && userDetailData.data && userDetailData.data.basics && userDetailData.data.basics.meta) {
      meta = userDetailData.data.basics.meta;
    }
    return (
      <table className={style['astro-personal-service-table'] + ' table table-bordered'}>
        <thead>
        <tr className={style['astro-personal-service-table-tr']} >
          <th>字段名称<p>FILED NAMES</p></th><th>内容<p>CONTENT</p></th>
          <th>字段名称<p>FILED NAMES</p></th><th>内容<p>CONTENT</p></th>
        </tr>
        </thead>
        {meta &&
        <tbody className={style['astro-personal-service-table-tbody']}>
        {trBody(['姓名', meta.name, '身份证号', meta.identifier], 1)}
        {trBody(['性别', meta.sex, '出生日期', meta.birth ? moment(meta.birth).format('YYYY-MM-DD') : '未填写'], 2)}
        {trBody(['民族', meta.nationality, '类别', meta.category], 3)}
        {trBody(['所属居委会', meta.community, '政治面貌', meta.politicalStatus], 4)}
        {trBody(['婚姻状况', meta.maritalStatus, '户口类别', meta.residenceCategory], 5)}
        {trBody(['户口地址', meta.residenceAddr, '家庭地址', meta.homeAddr], 6)}
        {trBody(['工作单位', meta.company, '月收入', meta.salaryPerMonth], 7)}
        {trBody(['文化程度', meta.educationLevel, '联系电话', meta.contactPhone], 8)}
        {trBody(['电话属性', meta.contactRelation, '籍贯', meta.ancientPlace], 9)}
        {trBody(['生活自理程度', meta.selfCareLevel, '监护人', meta.custodian], 10)}
        {trBody(['监护人与本人关系', meta.custodianRelation, '监护人电话', meta.custodianPhone], 11)}
        {trBody(['家庭人数', meta.familyQTY, '家庭特殊情况', meta.familySpecialCondition], 12)}
        {trBody(['二级残疾人证', meta.disabilityCertificate, '残疾证号', meta.certificateNum], 13)}
        {trBody(['办证日期', meta.certificateIssuedOn ? moment(meta.certificateIssuedOn).format('YYYY-MM-DD') : '未填写', '残疾类别', meta.disabilityCategory], 14)}
        {trBody(['残疾等级', meta.disabilityLevel, '残疾原因', meta.disabilityReason], 15)}
        {trBody(['残疾状况描述', meta.disabilityDesc, '自评健康状况', meta.selfEvalHealthStatus], 16)}
        {trBody(['评定方式', meta.evaluationMethod, '家庭拥有彩色电视机', meta.haveColorTV], 17)}
        {trBody(['个人生活来源', meta.mainLivingIncome, '家庭经济状况', meta.familyEconStatus], 18)}
        {trBody(['学业状态', meta.eduStatus, '是否接受义务教育', meta.isCompulsoryEducated], 19)}
        {trBody(['未入学原因', meta.uneducatedReason, '就读学校类别', meta.schoolCategory], 20)}
        {trBody(['就读班级类型', meta.classCategory, '享受教育补贴', meta.eduAllowance], 21)}
        {trBody(['奖励情况', meta.awards, '是否就业', meta.employed], 22)}
        {trBody(['劳动就业能力', meta.laborAbility, '失业登记', meta.joblessReg], 23)}
        {trBody(['未就业原因', meta.joblessReason, '就业形式', meta.jobCategory], 24)}
        {trBody(['所属行业', meta.industry, '单位性质', meta.companyCate], 25)}
        {trBody(['用工形式', meta.contractCategory, '工作类型', meta.partTime], 26)}
        {trBody(['技能等级', meta.skillLevel, '职业资格类别', meta.professionCategory], 27)}
        {trBody(['职业资格等级', meta.professionLevel, '医疗保障', meta.healthInsurance], 28)}
        {trBody(['医疗保障缴纳方式', meta.healthInsuranceMethod, '医疗费性质', meta.healthInsuranceCategory], 29)}
        {trBody(['养老保险', meta.endowmentInsurance, '养老保险缴纳方式', meta.endowmentInsuranceMethod], 30)}
        {trBody(['其它社会保险', meta.otherSocialInsurance, '生活保障形式', meta.lifeGuaranteeMethod], 31)}
        {trBody(['享受低保情况', meta.basicLivingAllow, '纳入保障日期', meta.basicLivingAllowOn ? moment(meta.basicLivingAllowOn).format('YYYY-MM-DD') : '未填写'], 32)}
        {trBody(['保障人口', meta.basicLivingAllowPopuQty, '住房来源', meta.houseSource], 33)}
        {trBody(['自有住房人均面积', meta.livingAreaPerPerson, '是否危房', meta.houseStatus], 34)}
        {trBody(['房屋结构', meta.houseStructure, ' ', ' '], 35)}
        </tbody>
        }
      </table>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailChange: state.userDetail.userDetailChange,
    show: ownProps.show,

    userDetailData: state.userDetail.userDetailData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailInfoChangeOpen: () => {
      dispatch(userDetailInfoChangeOpen());
    },
    userDetailInfoChangeClose: () => {
      dispatch(userDetailInfoChangeClose());
    },

    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoTable);


