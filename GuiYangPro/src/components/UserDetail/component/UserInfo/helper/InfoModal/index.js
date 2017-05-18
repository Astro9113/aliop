import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';

import {enumaKey} from '../../../../../Helper/enumaVal';
import {isCardNo} from '../../../../../Helper/isCardNo';
import {textInput} from '../../../../../Helper/from/text';
import {selectInput} from '../../../../../Helper/from/select';
import {dateInput} from '../../../../../Helper/from/date';
import {numberInput} from '../../../../../Helper/from/number';
import {boxInput} from '../../../../../Helper/from/checkbox';

import { userDetailInfoChangeOpen, userDetailInfoChangeClose, queryUserDetail, postChange, postChangeAgain, postChangeSubmit,
    userDetailInfoState, clearInfoChange} from '../../../../../../redux/modules/userDetail';
import { insertApply, draftApply, applyUnique } from '../../../../../../redux/modules/home';


class InfoModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    userDetailInfoChange: PropTypes.bool,
    userDetailInfoChangeOpen: PropTypes.func,
    userDetailInfoChangeClose: PropTypes.func,

    // userinfo: PropTypes.object,
    draftApply: PropTypes.func.isRequired,
    insertApply: PropTypes.func.isRequired,

    userDetailData: PropTypes.object,
    queryUserDetail: PropTypes.func,
    isUnique: PropTypes.number,
    applyUnique: PropTypes.func.isRequired,
    applyId: PropTypes.string,

    postChange: PropTypes.func,
    postChangeAgain: PropTypes.func,
    postChangeSubmit: PropTypes.func,

    submitState: PropTypes.object,
    theInfoState: PropTypes.bool,
    userDetailInfoState: PropTypes.func,
    clearInfoChange: PropTypes.func,
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps');
  //   if (nextProps.theInfoState) {
  //     this.props.queryUserDetail(this.props.applyId);
  //     this.props.userDetailInfoState(false);
  //   }
  // }
  //
  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  //   this.props.queryUserDetail(this.props.applyId);
  // }
  onBlur() {
    const {identifier} = this.refs;
    const cert = identifier.value.toLocaleUpperCase().replace(/(^\s*)|(\s*$)/g, '');
    if (cert) {
      const cardNo = isCardNo(cert);
      if (cardNo) {
        this.props.applyUnique(cert);
      }
    }
  }

  onSubmit(event) {
    const { name, identifier, sex, birth, nationality, community, politicalStatus, maritalStatus,
        residenceCategory, residenceAddr, homeAddr, company, salaryPerMonth, educationLevel, contactPhone, contactRelation,
        ancientPlace, selfCareLevel, custodian, custodianRelation, custodianPhone, familyQTY, familySpecialCondition,
        disabilityCertificate, certificateNum, certificateIssuedOn, disabilityLevel, disabilityReason,
        disabilityDesc, selfEvalHealthStatus, evaluationMethod, haveColorTV, familyEconStatus, eduStatus,
        isCompulsoryEducated, uneducatedReason, schoolCategory, classCategory, eduAllowance, awards, employed, laborAbility,
        joblessReg, joblessReason, jobCategory, industry, companyCate, contractCategory, partTime, skillLevel, professionCategory,
        professionLevel, healthInsuranceMethod, healthInsuranceCategory, endowmentInsurance, endowmentInsuranceMethod,
        otherSocialInsurance, basicLivingAllowOn, basicLivingAllowPopuQty, houseSource,
        livingAreaPerPerson, houseStatus, houseStructure } = this.refs;
    event.preventDefault();

    const cert = identifier.value.toLocaleUpperCase().replace(/(^\s*)|(\s*$)/g, '');
    let cardNo;
    if (cert) {
      cardNo = isCardNo(cert);
      if (cardNo) {
        this.props.applyUnique(cert);

        const str = document.getElementsByName('mainLivingIncome');
        const objarray = str.length;
        const mainLivingIncome = [];

        for ( let ii = 0; ii < objarray; ii++ ) {
          if (str[ii].checked === true) {
            mainLivingIncome.push(str[ii].value);
          }
        }

        const str2 = document.getElementsByName('healthInsurance');
        const objarray2 = str2.length;
        const healthInsurance = [];

        for ( let ii = 0; ii < objarray2; ii++ ) {
          if (str2[ii].checked === true) {
            healthInsurance.push(str2[ii].value);
          }
        }

        const str3 = document.getElementsByName('lifeGuaranteeMethod');
        const objarray3 = str3.length;
        const lifeGuaranteeMethod = [];

        for ( let ii = 0; ii < objarray3; ii++ ) {
          if (str3[ii].checked === true) {
            lifeGuaranteeMethod.push(str3[ii].value);
          }
        }

        const str4 = document.getElementsByName('basicLivingAllow');
        const objarray4 = str4.length;
        const basicLivingAllow = [];

        for ( let ii = 0; ii < objarray4; ii++ ) {
          if (str4[ii].checked === true) {
            basicLivingAllow.push(str4[ii].value);
          }
        }

        const str5 = document.getElementsByName('category');
        const objarray5 = str5.length;
        const category = [];

        for ( let ii = 0; ii < objarray5; ii++ ) {
          if (str5[ii].checked === true) {
            category.push(str5[ii].value);
          }
        }

        const str6 = document.getElementsByName('disabilityCategory');
        const objarray6 = str6.length;
        const disabilityCategory = [];

        for ( let ii = 0; ii < objarray6; ii++ ) {
          if (str6[ii].checked === true) {
            disabilityCategory.push(str6[ii].value);
          }
        }

        let userinfo;
        if (this.props.userDetailData && this.props.userDetailData.data && this.props.userDetailData.data.basics && this.props.userDetailData.data.basics.meta) {
          userinfo = this.props.userDetailData.data.basics.meta;
        }
        // tel, identifier, username, role, password
        const nameValue = name.value === '' ? userinfo.name : name.value;
        // const identifierValue = identifier.value === '' ? userinfo.identifier : identifier.value;
        const sexValue = sex.value === '' ? userinfo.sex : sex.value;
        const birthValue = birth.value === '' ? userinfo.birth : birth.value;
        const nationalityValue = nationality.value === '' ? userinfo.nationality : nationality.value;
        const categoryValue = category === '' ? userinfo.category : category;
        const communityValue = community.value === '' ? userinfo.community : community.value;
        const politicalStatusValue = politicalStatus.value === '' ? userinfo.politicalStatus : politicalStatus.value;
        const maritalStatusValue = maritalStatus.value === '' ? userinfo.maritalStatus : maritalStatus.value;

        const residenceCategoryValue = residenceCategory.value === '' ? userinfo.residenceCategory : residenceCategory.value;
        const residentAddrValue = residenceAddr.value === '' ? userinfo.residenceAddr : residenceAddr.value;
        const homeAddrValue = homeAddr.value === '' ? userinfo.homeAddr : homeAddr.value;
        const companyValue = company.value === '' ? userinfo.company : company.value;

        const salaryPerMonthValue = salaryPerMonth.value === '' ? userinfo.salaryPerMonth : salaryPerMonth.value;
        const educationLevelValue = educationLevel.value === '' ? userinfo.educationLevel : educationLevel.value;
        const contactPhoneValue = contactPhone.value === '' ? userinfo.contactPhone : contactPhone.value;
        const contactRelationValue = contactRelation.value === '' ? userinfo.contactRelation : contactRelation.value;

        const ancientPlaceValue = ancientPlace.value === '' ? userinfo.ancientPlace : ancientPlace.value;
        const selfCareLevelValue = selfCareLevel.value === '' ? userinfo.selfCareLevel : selfCareLevel.value;
        const custodianValue = custodian.value === '' ? userinfo.custodian : custodian.value;
        const custodianRelationValue = custodianRelation.value === '' ? userinfo.custodianRelation : custodianRelation.value;

        const custodianPhoneValue = custodianPhone.value === '' ? userinfo.custodianPhone : custodianPhone.value;
        const familyQTYValue = familyQTY.value === '' ? userinfo.familyQTY : familyQTY.value;
        const familySpecialConditionValue = familySpecialCondition.value === '' ? userinfo.familySpecialCondition : familySpecialCondition.value;
        const disabilityCertificateValue = disabilityCertificate.value === '' ? userinfo.disabilityCertificate : disabilityCertificate.value;

        const certificateNumValue = certificateNum.value === '' ? userinfo.certificateNum : certificateNum.value;
        const certificateIssuedOnValue = certificateIssuedOn.value === '' ? userinfo.certificateIssuedOn : certificateIssuedOn.value;
        const disabilityCategoryValue = disabilityCategory === '' ? userinfo.disabilityCategory : disabilityCategory;
        const disabilityLevelValue = disabilityLevel.value === '' ? userinfo.disabilityLevel : disabilityLevel.value;

        const disabilityReasonValue = disabilityReason.value === '' ? userinfo.disabilityReason : disabilityReason.value;
        const disabilityDescValue = disabilityDesc.value === '' ? userinfo.disabilityDesc : disabilityDesc.value;
        const selfEvalHealthStatusValue = selfEvalHealthStatus.value === '' ? userinfo.selfEvalHealthStatus : selfEvalHealthStatus.value;
        const evaluationMethodValue = evaluationMethod.value === '' ? userinfo.evaluationMethod : evaluationMethod.value;

        const haveColorTVValue = haveColorTV.value === '' ? userinfo.haveColorTV : haveColorTV.value;
        const mainLivingIncomeValue = mainLivingIncome === '' ? userinfo.mainLivingIncome : mainLivingIncome;
        const familyEconStatusValue = familyEconStatus.value === '' ? userinfo.familyEconStatus : familyEconStatus.value;
        const eduStatusValue = eduStatus.value === '' ? userinfo.eduStatus : eduStatus.value;

        const isCompulsoryEducatedValue = isCompulsoryEducated.value === '' ? userinfo.isCompulsoryEducated : isCompulsoryEducated.value;
        const uneducatedReasonValue = uneducatedReason.value === '' ? userinfo.uneducatedReason : uneducatedReason.value;
        const schoolCategoryValue = schoolCategory.value === '' ? userinfo.schoolCategory : schoolCategory.value;
        const classCategoryValue = classCategory.value === '' ? userinfo.classCategory : classCategory.value;

        const eduAllowanceValue = eduAllowance.value === '' ? userinfo.eduAllowance : eduAllowance.value;
        const awardsValue = classCategory.awards === '' ? userinfo.awards : awards.value;
        const employedValue = employed.value === '' ? userinfo.employed : employed.value;
        const laborAbilityValue = laborAbility.value === '' ? userinfo.laborAbility : laborAbility.value;

        const joblessRegValue = joblessReg.value === '' ? userinfo.joblessReg : joblessReg.value;
        const joblessReasonValue = joblessReason.value === '' ? userinfo.joblessReason : joblessReason.value;
        const jobCategoryValue = jobCategory.value === '' ? userinfo.jobCategory : jobCategory.value;
        const industryValue = industry.value === '' ? userinfo.industry : industry.value;

        const companyCateValue = companyCate.value === '' ? userinfo.companyCate : companyCate.value;
        const contractCategoryValue = contractCategory.value === '' ? userinfo.contractCategory : contractCategory.value;
        const partTimeValue = partTime.value === '' ? userinfo.partTime : partTime.value;
        const skillLevelValue = skillLevel.value === '' ? userinfo.skillLevel : skillLevel.value;

        const professionCategoryValue = professionCategory.value === '' ? userinfo.professionCategory : professionCategory.value;
        const professionLevelValue = professionLevel.value === '' ? userinfo.professionLevel : professionLevel.value;
        const healthInsuranceValue = healthInsurance === '' ? userinfo.healthInsurance : healthInsurance;
        const healthInsuranceMethodValue = healthInsuranceMethod.value === '' ? userinfo.healthInsuranceMethod : healthInsuranceMethod.value;

        const healthInsuranceCategoryValue = healthInsuranceCategory.value === '' ? userinfo.healthInsuranceCategory : healthInsuranceCategory.value;
        const endowmentInsuranceValue = endowmentInsurance.value === '' ? userinfo.endowmentInsurance : endowmentInsurance.value;
        const endowmentInsuranceMethodValue = endowmentInsuranceMethod.value === '' ? userinfo.endowmentInsuranceMethod : endowmentInsuranceMethod.value;
        const otherSocialInsuranceValue = otherSocialInsurance.value === '' ? userinfo.otherSocialInsurance : otherSocialInsurance.value;

        const lifeGuaranteeMethodValue = lifeGuaranteeMethod === '' ? userinfo.lifeGuaranteeMethod : lifeGuaranteeMethod;
        const basicLivingAllowValue = basicLivingAllow === '' ? userinfo.basicLivingAllow : basicLivingAllow;
        const basicLivingAllowOnValue = basicLivingAllowOn.value === '' ? userinfo.basicLivingAllowOn : basicLivingAllowOn.value;
        const basicLivingAllowPopuQtyValue = basicLivingAllowPopuQty.value === '' ? userinfo.basicLivingAllowPopuQty : basicLivingAllowPopuQty.value;

        const houseSourceValue = houseSource.value === '' ? userinfo.houseSource : houseSource.value;
        const livingAreaPerPersonValue = livingAreaPerPerson.value === '' ? userinfo.livingAreaPerPerson : livingAreaPerPerson.value;
        const houseStatusValue = houseStatus.value === '' ? userinfo.houseStatus : houseStatus.value;
        const houseStructureValue = houseStructure.value === '' ? userinfo.houseStructure : houseStructure.value;

        let data = {};
        if (cert) {
          data = {
            name: nameValue, sex: sexValue, birth: birthValue, nationality: nationalityValue, identifier: cert,
            category: categoryValue, community: communityValue, politicalStatus: politicalStatusValue, maritalStatus: maritalStatusValue,
            residenceCategory: residenceCategoryValue, residenceAddr: residentAddrValue, homeAddr: homeAddrValue, company: companyValue,
            salaryPerMonth: salaryPerMonthValue, educationLevel: educationLevelValue, contactPhone: contactPhoneValue, contactRelation: contactRelationValue,
            ancientPlace: ancientPlaceValue, selfCareLevel: selfCareLevelValue, custodian: custodianValue, custodianRelation: custodianRelationValue,
            custodianPhone: custodianPhoneValue, familyQTY: familyQTYValue, familySpecialCondition: familySpecialConditionValue, disabilityCertificate: disabilityCertificateValue,
            certificateNum: certificateNumValue, certificateIssuedOn: certificateIssuedOnValue, disabilityCategory: disabilityCategoryValue, disabilityLevel: disabilityLevelValue,
            disabilityReason: disabilityReasonValue, disabilityDesc: disabilityDescValue, selfEvalHealthStatus: selfEvalHealthStatusValue, evaluationMethod: evaluationMethodValue,
            haveColorTV: haveColorTVValue, mainLivingIncome: mainLivingIncomeValue, familyEconStatus: familyEconStatusValue, eduStatus: eduStatusValue,
            isCompulsoryEducated: isCompulsoryEducatedValue, uneducatedReason: uneducatedReasonValue, schoolCategory: schoolCategoryValue, classCategory: classCategoryValue,
            eduAllowance: eduAllowanceValue, awards: awardsValue, employed: employedValue, laborAbility: laborAbilityValue,
            joblessReg: joblessRegValue, joblessReason: joblessReasonValue, jobCategory: jobCategoryValue, industry: industryValue,
            companyCate: companyCateValue, contractCategory: contractCategoryValue, partTime: partTimeValue, skillLevel: skillLevelValue,
            professionCategory: professionCategoryValue, professionLevel: professionLevelValue, healthInsurance: healthInsuranceValue, healthInsuranceMethod: healthInsuranceMethodValue,
            healthInsuranceCategory: healthInsuranceCategoryValue, endowmentInsurance: endowmentInsuranceValue, endowmentInsuranceMethod: endowmentInsuranceMethodValue,
            otherSocialInsurance: otherSocialInsuranceValue, lifeGuaranteeMethod: lifeGuaranteeMethodValue, basicLivingAllow: basicLivingAllowValue, basicLivingAllowOn: basicLivingAllowOnValue,
            basicLivingAllowPopuQty: basicLivingAllowPopuQtyValue, houseSource: houseSourceValue, livingAreaPerPerson: livingAreaPerPersonValue, houseStatus: houseStatusValue, houseStructure: houseStructureValue
          };
        } else {
          data = {
            name: nameValue, sex: sexValue, birth: birthValue, nationality: nationalityValue,
            category: categoryValue, community: communityValue, politicalStatus: politicalStatusValue, maritalStatus: maritalStatusValue,
            residenceCategory: residenceCategoryValue, residenceAddr: residentAddrValue, homeAddr: homeAddrValue, company: companyValue,
            salaryPerMonth: salaryPerMonthValue, educationLevel: educationLevelValue, contactPhone: contactPhoneValue, contactRelation: contactRelationValue,
            ancientPlace: ancientPlaceValue, selfCareLevel: selfCareLevelValue, custodian: custodianValue, custodianRelation: custodianRelationValue,
            custodianPhone: custodianPhoneValue, familyQTY: familyQTYValue, familySpecialCondition: familySpecialConditionValue, disabilityCertificate: disabilityCertificateValue,
            certificateNum: certificateNumValue, certificateIssuedOn: certificateIssuedOnValue, disabilityCategory: disabilityCategoryValue, disabilityLevel: disabilityLevelValue,
            disabilityReason: disabilityReasonValue, disabilityDesc: disabilityDescValue, selfEvalHealthStatus: selfEvalHealthStatusValue, evaluationMethod: evaluationMethodValue,
            haveColorTV: haveColorTVValue, mainLivingIncome: mainLivingIncomeValue, familyEconStatus: familyEconStatusValue, eduStatus: eduStatusValue,
            isCompulsoryEducated: isCompulsoryEducatedValue, uneducatedReason: uneducatedReasonValue, schoolCategory: schoolCategoryValue, classCategory: classCategoryValue,
            eduAllowance: eduAllowanceValue, awards: awardsValue, employed: employedValue, laborAbility: laborAbilityValue,
            joblessReg: joblessRegValue, joblessReason: joblessReasonValue, jobCategory: jobCategoryValue, industry: industryValue,
            companyCate: companyCateValue, contractCategory: contractCategoryValue, partTime: partTimeValue, skillLevel: skillLevelValue,
            professionCategory: professionCategoryValue, professionLevel: professionLevelValue, healthInsurance: healthInsuranceValue, healthInsuranceMethod: healthInsuranceMethodValue,
            healthInsuranceCategory: healthInsuranceCategoryValue, endowmentInsurance: endowmentInsuranceValue, endowmentInsuranceMethod: endowmentInsuranceMethodValue,
            otherSocialInsurance: otherSocialInsuranceValue, lifeGuaranteeMethod: lifeGuaranteeMethodValue, basicLivingAllow: basicLivingAllowValue, basicLivingAllowOn: basicLivingAllowOnValue,
            basicLivingAllowPopuQty: basicLivingAllowPopuQtyValue, houseSource: houseSourceValue, livingAreaPerPerson: livingAreaPerPersonValue, houseStatus: houseStatusValue, houseStructure: houseStructureValue
          };
        }

        const dataVal = enumaKey(data);
        const approvalStatus = this.props.userDetailData.data.basics.approvalStatus;
        const infoId = this.props.userDetailData.data.basics._id;

        this.props.clearInfoChange();
        if (approvalStatus === 2 || approvalStatus === 3) {
          this.props.postChange(infoId, dataVal);
        } else if (approvalStatus === 0) {
          const buttonName = event.target.name;
          if (buttonName === 'save') {
            this.props.postChangeAgain(infoId, dataVal);
          } else if (buttonName === 'submit') {
            this.props.postChangeSubmit(infoId, dataVal);
          }
        }

        setTimeout(() => {
          // this.props.userDetailInfoState(true);
          // this.props.queryUserDetail(this.props.applyId);
          if (this.props.submitState && this.props.submitState.msg) {
            const alertTx = this.props.submitState.msg;
            alert(`${alertTx}`);
          } else {
            alert('未知错误导致保存失败， 请联系我相关技术人员。');
          }
          this.props.clearInfoChange();
          this.props.userDetailInfoChangeClose();
          window.location.reload();
        }, 2000);
      }
    } else {
      alert('创建失败，请检查身份证是否正确！');
    }
  }

  showCard() {
    this.props.userDetailInfoChangeOpen();
  }
  closeCard() {
    this.props.userDetailInfoChangeClose();
  }

  render() {
    const style = require('./InfoModal.scss');
    const formClass = style['astro-home-modal-form'] + ' form-group col-lg-4';
    const boxClass = style['astro-home-modal-box'] + ' form-group col-lg-12';

    const {userDetailData} = this.props;

    let userinfo;
    if (userDetailData && userDetailData.data && userDetailData.data.basics && userDetailData.data.basics.meta) {
      userinfo = userDetailData.data.basics.meta;
    }
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <div className={style['astro-home-modal']}>
          <h4>修改基本信息</h4>
          {userinfo &&
        <form className= "form-inline container" style={{margin: '20px 10px 10px 20px'}} >
          {textInput(formClass, '姓名', 'name', userinfo.name)}
          {textInput(formClass, '身份证号', 'identifier', userinfo.identifier, this.onBlur.bind(this))}
          {selectInput(formClass, '性别', 'sex', ['男', '女'], '', userinfo.sex)}

          {dateInput(formClass, '出生日期', 'birth', userinfo.birth)}
          {textInput(formClass, '民族', 'nationality', userinfo.nationality)}


          {selectInput(formClass, '所属居委会', 'community', ['红云', '新星', '天林', '蓝天', '无'], '', userinfo.community)}
          {selectInput(formClass, '政治面貌', 'politicalStatus', ['中共党员', '团员', '群众', '学生', '无'], '', userinfo.politicalStatus)}
          {selectInput(formClass, '婚姻状况', 'maritalStatus', ['未婚', '初婚', '再婚', '复婚', '丧偶', '离异'], '', userinfo.maritalStatus)}

          {selectInput(formClass, '户口类别', 'residenceCategory', ['农', '非农'], '', userinfo.residenceCategory)}
          {textInput(formClass, '户口地址', 'residenceAddr', userinfo.residenceAddr)}
          {textInput(formClass, '家庭地址', 'homeAddr', userinfo.homeAddr)}

          {textInput(formClass, '工作单位', 'company', userinfo.company)}
          {textInput(formClass, '月收入', 'salaryPerMonth', userinfo.salaryPerMonth)}
          {selectInput(formClass, '文化程度', 'educationLevel', ['博士', '硕士', '本科', '大专', '中专和中技', '技工学校', '高中', '初中', '小学', '文盲与半文盲', '无'], '', userinfo.educationLevel)}

          {textInput(formClass, '联系电话', 'contactPhone', userinfo.contactPhone)}
          {selectInput(formClass, '电话属性', 'contactRelation', ['本人', '亲属', '居委会／社区', '其它'], '', userinfo.contactRelation)}
          {textInput(formClass, '籍贯', 'ancientPlace', userinfo.ancientPlace)}

          {selectInput(formClass, '生活自理程度', 'selfCareLevel', ['完全自理', '完全不能自理', '部分自理'], '', userinfo.selfCareLevel)}
          {textInput(formClass, '监护人', 'custodian', userinfo.custodian)}
          {textInput(formClass, '监护人与本人关系', 'custodianRelation', userinfo.custodianRelation)}

          {textInput(formClass, '监护人电话', 'custodianPhone', userinfo.custodianPhone)}
          {numberInput(formClass, '家庭人数', 'familyQTY', userinfo.familyQTY)}
          {selectInput(formClass, '家庭特殊情况', 'familySpecialCondition', ['老残一体', '一户多残', '其它', '无'], '', userinfo.familySpecialCondition)}

          {selectInput(formClass, '二级残疾人证', 'disabilityCertificate', ['已办', '未办'], '', userinfo.disabilityCertificate)}
          {textInput(formClass, '残疾证号', 'certificateNum', userinfo.certificateNum)}
          {dateInput(formClass, '办证日期', 'certificateIssuedOn', userinfo.certificateIssuedOn)}


          {selectInput(formClass, '残疾等级', 'disabilityLevel', ['一级', '二级', '三级', '四级', '未评定'], '', userinfo.disabilityLevel)}
          {textInput(formClass, '残疾原因', 'disabilityReason', userinfo.disabilityReason)}

          {textInput(formClass, '残疾状况描述', 'disabilityDesc', userinfo.disabilityDesc)}
          {selectInput(formClass, '自评健康状况', 'selfEvalHealthStatus', ['健康', '不健康'], '', userinfo.selfEvalHealthStatus)}
          {selectInput(formClass, '评定方式', 'evaluationMethod', ['医院评定', '目测评定', '其它'], '', userinfo.evaluationMethod)}

          {selectInput(formClass, '家庭拥有彩色电视机', 'haveColorTV', ['是', '否'], '', userinfo.haveColorTV)}
          {selectInput(formClass, '家庭经济状况', 'familyEconStatus', ['低于国家贫困标准', '低于最低生活保障', '当地政府认定低收入', '其它'], '', userinfo.familyEconStatus)}
          {selectInput(formClass, '学业状态', 'eduStatus', ['学前', '在校', '毕业', '肄业', '未入学', '其它'], '', userinfo.eduStatus)}

          {selectInput(formClass, '是否接受义务教育', 'isCompulsoryEducated', ['是', '否'], '', userinfo.isCompulsoryEducated)}
          {selectInput(formClass, '未入学原因', 'uneducatedReason', ['残疾程度较重', '家庭经济困难', '无特殊学校（班）', '交通不便', '其它'], '', userinfo.uneducatedReason)}
          {selectInput(formClass, '就读学校类别', 'schoolCategory', ['盲校', '聋校', '智障学校', '特殊教育学校', '其它'], '', userinfo.schoolCategory)}

          {selectInput(formClass, '就读班级类型', 'classCategory', ['盲生班', '聋生班', '智障班', '随班', '其它'], '', userinfo.classCategory)}
          {selectInput(formClass, '享受教育补贴', 'eduAllowance', ['是', '否'], '', userinfo.eduAllowance)}
          {selectInput(formClass, '奖励情况', 'awards', ['教育专项补贴', '助学金', '奖学金', '其它', '无'], '', userinfo.awards)}

          {selectInput(formClass, '是否就业', 'employed', ['是', '否'], '', userinfo.employed)}
          {selectInput(formClass, '劳动就业能力', 'laborAbility', ['有', '丧失', '部分丧失', '无'], '', userinfo.laborAbility)}
          {selectInput(formClass, '失业登记', 'joblessReg', ['登记', '未登记'], '', userinfo.joblessReg)}

          {selectInput(formClass, '未就业原因', 'joblessReason', ['在校学习', '离退休', '料理家务', '丧失劳动能力', '毕业后未工作', '因单位原因失去工作', '因本人原因失去工作', '承包土地被征用', '其它', '无'], '', userinfo.joblessReason)}
          {selectInput(formClass, '就业形式', 'jobCategory', ['集中就业', '按比例就业', '个体就业', '从事农村成产劳动', '残疾人扶贫基地就业', '公益性岗位', '辅助性就业', '其它'], '', userinfo.jobCategory)}
          {selectInput(formClass, '所属行业', 'industry', ['国家机关', '党群组织', '企业事业单位负责人', '专业技术人员 、办事人员和有关人', '商业、 服务业人员', '农、林、牧、副、渔、水利生产人员', '生产、运输、设备操作人员及有关人员', '军人', '不便分类的其他从业人员', '无'], '', userinfo.industry)}

          {selectInput(formClass, '单位性质', 'companyCate', ['机关', '事业', '全额拨款事业', '差额拨款事业', '自收自支事业、企业', '国有企业', '非国有企业', '民间组织', '社会团体', '民办非企业', '军队', '其它', '无'], '', userinfo.companyCate)}
          {selectInput(formClass, '用工形式', 'contractCategory', ['合同制', '聘用制', '临时工', '其它'], '', userinfo.contractCategory)}
          {selectInput(formClass, '工作类型', 'partTime', ['全职', '兼职', '无'], '', userinfo.partTime)}

          {selectInput(formClass, '技能等级', 'skillLevel', ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级', '无'], '', userinfo.skillLevel)}
          {selectInput(formClass, '职业资格类别', 'professionCategory', ['电子电器维修', '按摩', '计算机', '服装', '工艺拳术', '机电', '园艺', '传统民间工艺', '数控专业', '建筑', '翻译', '教育', '律师', '心理咨询', '烹饪', '其它', '无'], '', userinfo.professionCategory)}
          {selectInput(formClass, '职业资格等级', 'professionLevel', ['初级', '中级', '中高级', '高级', '无'], '', userinfo.professionLevel)}

          {selectInput(formClass, '医疗保障缴纳方式', 'healthInsuranceMethod', ['国家或单位代缴', '国家或单位部分代缴', '个人全额缴纳', '无'], '', userinfo.healthInsuranceMethod)}
          {selectInput(formClass, '医疗费性质', 'healthInsuranceCategory', ['公费', '自费', '医保', '其它', '无'], '', userinfo.healthInsuranceCategory)}
          {selectInput(formClass, '养老保险', 'endowmentInsurance', ['无任何养老保险', '企业职工基本养老保险', '城镇居民养老保险', '新型农村社会养老保险', '其它商业养老保险'], '', userinfo.endowmentInsurance)}

          {selectInput(formClass, '养老保险缴纳方式', 'endowmentInsuranceMethod', ['国家或单位待缴', '国家或单位部分代缴', '个人全额缴纳', '无'], '', userinfo.endowmentInsuranceMethod)}
          {selectInput(formClass, '其它社会保险', 'otherSocialInsurance', ['无', '失业保险', '工伤保险', '生育保险', '意外伤害保险', '其它商业保险'], '', userinfo.otherSocialInsurance)}
          {dateInput(formClass, '纳入保障日期', 'basicLivingAllowOn', userinfo.basicLivingAllowOn)}

          {numberInput(formClass, '保障人口', 'basicLivingAllowPopuQty', userinfo.basicLivingAllowPopuQty)}
          {selectInput(formClass, '住房来源', 'houseSource', ['自有', '租赁', '借用', '其它', '无'], '', userinfo.houseSource)}
          {numberInput(formClass, '自有住房人均面积', 'livingAreaPerPerson', userinfo.livingAreaPerPerson)}

          {selectInput(formClass, '是否危房', 'houseStatus', ['是', '否', '局部', '整体'], '', userinfo.houseStatus)}
          {selectInput(formClass, '房屋结构', 'houseStructure', ['土坯房', '土石房', '土木房', '砖木房', '草房', '窑洞', '瓦房', '砖混', '砖包皮', '其它', '无'], '', userinfo.houseStructure)}
          {boxInput(boxClass, '类别', 'category', ['低保户', '临时困难户', '医疗救助户', '残疾人'], userinfo.category)}
          {boxInput(boxClass, '残疾类别', 'disabilityCategory', ['视力', '听力', '言语', '肢体', '智力', '精神'], userinfo.disabilityCategory)}
          {boxInput(boxClass, '个人生活来源', 'mainLivingIncome', ['无', '政府抚养', '社会救济', '家庭抚养', '工薪收入', '经营收入', '离退休金', '保险收入', '各类赔偿收入', '财产性收入', '其它'], userinfo.mainLivingIncome)}
          {boxInput(boxClass, '医疗保障', 'healthInsurance', ['无任何保险', '城镇职工基本医疗保险', '城镇居民基本医疗保险', '新型农村合作医疗保险', '城镇无业老人及学生儿童大病保险', '公费医疗或单位报销', '医疗、康复救助', '其它医疗保险', '医疗费用全部自理'], userinfo.healthInsurance)}
          {boxInput(boxClass, '生活保障形式', 'lifeGuaranteeMethod', ['无任何保障', '五保供养', '集中供养', '民政救济', '社会扶助（现金或实物）最低生活保障', '养老保险', '失业保险', '贫困重度残疾救助', '退休金', '其它'], userinfo.lifeGuaranteeMethod)}
          {boxInput(boxClass, '享受低保情况', 'basicLivingAllow', ['未享受', '无生活来源、无劳动能力、无法定赡养或抚养人的居民', '领取失业救济金期间或失业期满仍没能重新就业; 家庭人均月收入低于当地最低生活保障的居民', '在职和下岗人员在领取工资或最低工资、基本生活费'], userinfo.basicLivingAllow)}
        </form>
        }
          <div className={style['astro-home-modal-button']}>
            <button key="1" name="save" style={{background: 'green'}} onClick={this.onSubmit.bind(this)}>保存</button>
            <button key="2" name="submit" onClick={this.onSubmit.bind(this)}>提交</button>
            <button key="3" style={{background: '#f6f6f6', color: '#2b2c35'}} onClick={this.closeCard.bind(this)}>关闭</button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactionId: ownProps.name,
    // transactionId: ownProps.params.name, 链接传参
    userDetailChange: state.userDetail.userDetailChange,
    show: ownProps.show,

    userDetailData: state.userDetail.userDetailData,
    isUnique: state.home.isUnique,
    submitState: state.userDetail.submitState,

    theInfoState: state.userDetail.theInfoState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryUserDetail: (uid) => {
      dispatch(queryUserDetail(uid));
    },
    insertApply: (data) => {
      dispatch(insertApply(data));
    },
    draftApply: (data) => {
      dispatch(draftApply(data));
    },
    userDetailInfoChangeOpen: () => {
      dispatch(userDetailInfoChangeOpen());
    },
    userDetailInfoChangeClose: () => {
      dispatch(userDetailInfoChangeClose());
    },
    applyUnique: (cert) => {
      dispatch(applyUnique(cert));
    },

    postChange: (infoId, data) => {
      dispatch(postChange(infoId, data));
    },

    postChangeAgain: (infoId, data) => {
      dispatch(postChangeAgain(infoId, data));
    },
    postChangeSubmit: (infoId, data) => {
      dispatch(postChangeSubmit(infoId, data));
    },
    userDetailInfoState: (state) => {
      dispatch(userDetailInfoState(state));
    },
    clearInfoChange: () => {
      dispatch(clearInfoChange());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
