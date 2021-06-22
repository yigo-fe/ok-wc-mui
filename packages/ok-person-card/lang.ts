import dingtalk from '../assets/images/dingtalk.svg'
import kim from '../assets/images/kim.svg'
import wechat from '../assets/images/wechat.svg'
import { i18n } from '../locales'
const setLang = function (msgRelationType = 'NONE') {
  let msgType = msgRelationType
  let flag = ['WX', 'DD', 'JD', 'WX_THIRD_APP', 'LARK', 'NONE'].includes(
    msgType
  )
  if (!flag) {
    msgType = 'NONE'
  }
  const typeTitle = {
    WX: {
      title: i18n.$t('control.personCard.wechat', '企微'),
      icon: wechat,
    },
    DD: {
      title: i18n.$t('control.personCard.dingtalk', '钉钉'),
      icon: dingtalk,
    },
    JD: {
      title: i18n.$t('control.personCard.ME', 'ME'),
      icon: '',
    },
    WX_THIRD_APP: {
      title: i18n.$t('control.personCard.wechat', '企微'),
      icon: wechat,
    },
    LARK: {
      title: i18n.$t('control.personCard.lark', '飞书'),
      icon: kim,
    },
    NONE: {
      title: '',
      icon: '',
    },
  }

  let title = ''
  let icon = ''
  const curLark = typeTitle[msgType.toUpperCase()]

  if (curLark) {
    icon = curLark.icon
    title = curLark.title
  }

  const lang = {
    terminated: i18n.$t('control.personCard.terminated', '已停用'),
    team: i18n.$t('control.personCard.department', '部门'),
    email: i18n.$t('control.personCard.email', '邮箱'),
    sendLark: i18n.$t('control.personCard.sendLark', `发送${title}消息`, {
      title,
    }),
    sendIcon: icon,
    expand: i18n.$t('control.personCard.expand', '展开'),
    collapse: i18n.$t('control.personCard.collapse', '收起'),
  }
  return lang
}
export default setLang
