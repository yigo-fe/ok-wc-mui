/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-03 17:28:13
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-15 16:00:24
 * @FilePath: /packages/ok-person-card/hook.ts
 */

import { computed, effect } from 'ok-lit'
import { nextTick, ref, watch } from 'vue'

import setLang from './lang'
import { getDeptItemHeight } from './utils'
export default function (props) {
  const personInfoCom: any = ref({})
  const relationType = computed(
    () => props.personInfo?.msg_relation_type || props.msgRelationType
  )

  const statusType = computed(() => props.statusType)

  const deptText = computed(() => {
    if (props.deptList?.length) {
      return props.deptList.map(
        (v: any) =>
          `${v.dept_name_path.replace(/@/g, '/')}${
            v.main_dept_flag === '1' ? ' (主)' : ''
          }`
      )
    } else {
      return props.personInfo.department_name
        ? [props.personInfo.department_name]
        : []
    }
  })

  // mock
  // const deptText = ref([
  //   '北京百特云享科技有限公司/产品中心/产品部1',
  //   '产品中心/产品部2',
  //   '北京百特云享科技有限公司/产品中心/产品部3',
  //   '北京百特云享科技有限公司/产品中心/产品部4',
  //   '北京百特云享科技有限公司/产品中心/产品部5',
  //   '北京百特云享科技有限公司/产品中心/测试部',
  //   '北京百特云享科技有限公司/产品中心/测试部/产品中心测试部子部门1',
  //   '北京百特云享科技有限公司/产品中心/测试部/产品中心测试部子部门2',
  // ])

  const langPack = ref({
    terminated: '',
    team: '',
    email: '',
    sendLark: '',
    sendIcon: '',
  })

  const textStyle = ref({
    width: '100%',
    'line-height': '210px',
    'font-size': '90px',
    'font-weight': '500',
    height: '210px',
  })

  const showTeam = ref(props.showTeam)

  const mapFields = obj => {
    // 兼容姓名和部门不是对象
    let name: any
    if (obj.name && typeof obj.name == 'object') {
      name = obj.name
    } else if (typeof obj.employee_name !== 'object') {
      name = {
        zh: obj.employee_name,
        en: obj.employee_en_name,
        ja: obj.employee_name,
      }
    }
    let dept: any
    // 兼容org_name为null的情况
    if (obj.org_name && typeof obj.org_name == 'object') {
      dept = obj.org_name
    } else if (typeof obj.department_name !== 'object') {
      dept = {
        zh: obj.department_name || obj.org_name,
        en: obj.department_en_name,
        ja: obj.department_name,
      }
    }
    return {
      ...obj,
      id: obj.employee_id || obj.user_id || obj.id || obj.employee_number,
      name: name || obj.employee_name,
      email: obj.email,
      avatar: obj.avatar || obj.avatar_url,
      org_name: dept || obj.department_name,
      leaderName: obj.leader_name, // 待确定
      leaderEid: obj.leader_eid,
      terminated: obj.terminated,
      gender: obj.gender,
    }
  }

  const initPersonInfo = () => {
    if (!props.personInfo) return
    personInfoCom.value = mapFields(props.personInfo)
  }

  const initData = () => {
    if (!props.personInfo) return
    initPersonInfo()
    langPack.value = setLang(relationType.value)
    if (!relationType.value) {
      console.warn('请传入平台字段msgRelationType')
    }
  }
  effect(() => {
    initData()
  })

  // 展开，收起
  const deptOpen = ref(false)
  // 是否有展开收起按钮
  const isShowBtn = ref(false)
  // 默认是否为两个部门
  const isTwoDepts = ref(false)
  // footer height
  const footerHeight = ref(0)
  const deptBox = ref(null)

  // 判断文字是否超过两行， 及单个部门两行和两个部门两行的样式区别
  const isOverTwoLine = () => {
    const el: any = deptBox.value
    const offsetWidth = el.offsetWidth

    const o1 = getDeptItemHeight(offsetWidth, deptText.value[0])
    const o2 = deptText.value[1]
      ? getDeptItemHeight(el.offsetWidth, deptText.value[1])
      : 0

    if (deptText.value.length === 1) {
      // 只有一行数据时，判断高度是否大于两行（即42）
      isShowBtn.value = o1 > 42
    } else if (o1 > 21 || o2 > 21) {
      // 如果有两条数据，其中任意一个折行，都展示按钮
      isShowBtn.value = true
    }
    // 有两行，且第一行没有折行
    if (deptText.value.length > 1 && o1 === 21) {
      isTwoDepts.value = true
    }
  }

  // 向上滑动，渐变模糊
  const blurStyle = ref({
    'backdrop-filter': 'blur(0px)',
    '-webkit-backdrop-filter': 'blur(0px)',
  })

  const avatarStyle = ref({
    filter: 'blur(0)',
  })
  // 处理图像毛玻璃渐变效果
  const handleFrostedStyle = (scrollTop: number) => {
    const percent = Math.abs(scrollTop / 210)
    const blur = Math.min(Math.ceil(15 * percent), 15)
    // ios添加毛玻璃效果
    blurStyle.value = {
      'backdrop-filter': `blur(${blur}px)`,
      '-webkit-backdrop-filter': `blur(${blur}px)`,
    }
    // 图片添加毛玻璃效果（兼容安卓）
    avatarStyle.value = {
      filter: `blur(${blur}px)`,
    }
  }

  // inner scrollbox
  const cardInner = ref(null)
  const cardHeader = ref(null)
  const footerRef = ref(null)

  const handleOnScroll = () => {
    const scrollBox: any = cardInner.value
    const header: any = cardHeader.value
    const footer: any = footerRef.value
    const scrollTop = scrollBox.scrollTop
    // 处理毛玻璃效果
    handleFrostedStyle(scrollTop)
    // 注意： footerHeight高度不构将图片顶到定位位置时，不进行定位。
    if (footerHeight.value < 247) return
    if (scrollTop === 96 || scrollTop > 96) {
      header.style.position = 'absolute'
      header.style.top = '-96px'
      header.style.width = '318px'
      header.style['z-index'] = '5'
      header.style['min-height'] = 'none'
      header.style['background'] = '#fff'
      footer.style['margin-top'] = '210px'
    } else {
      header.style.position = 'static'
      header.style.height = '210px'
      header.style['min-height'] = '210px'
      footer.style['margin-top'] = 0
    }
    // 处理顶部回弹空白的问题
    // if (scrollTop < 0) {
    //   const s = 1 + (Math.abs(scrollTop) / 636).toFixed(1)
    //   avatarStyle.value.transform = `scaleY(${s})`
    // } else {
    //   avatarStyle.value.transform = 'initial'
    // }
  }

  // dept 变化时触发， dept是接口返回
  watch(
    () => deptText.value,
    (val: string[]) => {
      if (val.length) {
        nextTick(() => {
          isOverTwoLine()
        })
      }
    },
    {
      immediate: true,
    }
  )

  // scroll up
  const srollUp = () => {
    const scrollBox: any = cardInner.value
    // scrollBox.scrollTop = 96
    let distance = 0
    // 滑动到footer顶部
    const timer = setInterval(() => {
      if (distance < 96) {
        distance += 10
        if (distance > 96) distance = 96
        scrollBox.scrollTop = distance
      } else {
        clearInterval(timer)
      }
    }, 10)
  }

  // 点击展开，收起
  const handleToggleDept = () => {
    deptOpen.value = !deptOpen.value
    if (deptOpen.value) {
      nextTick(() => {
        // 点击展开，自动滑动到顶部
        srollUp()
        // 计算footer高度
        const footer: any = footerRef.value
        footerHeight.value = footer.offsetHeight
      })
    }
  }

  return {
    textStyle,
    deptText,
    showTeam,
    langPack,
    personInfoCom,
    statusType,
    handleOnScroll,
    cardInner,
    cardHeader,
    footerRef,
    deptOpen,
    isShowBtn,
    isTwoDepts,
    footerHeight,
    handleToggleDept,
    deptBox,
    blurStyle,
    avatarStyle,
  }
}
