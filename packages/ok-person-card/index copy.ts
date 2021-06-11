import { computed, defineComponent, html, onMounted, watch } from 'ok-lit'
import { createApp, nextTick, ref } from 'vue'

import closeIcon from '../assets/images/closed.svg'
import femaleIcon from '../assets/images/female.svg'
import maleIcon from '../assets/images/male.svg'
import usePersonCardHandle from './hook'
/**
 * 人员卡片
 * @props person 人员信息
 * @slot footer-button 按钮位置自定义
 */
import props from './props'
import okPersonCardCss from './style/ok-person-card.less'
import { getDeptItemHeight } from './utils'
defineComponent('mok-person-card', { ...props }, (props, context) => {
  onMounted(() => {
    const options = {
      setup() {
        const {
          textStyle,
          showTeam,
          langPack,
          personInfoCom,

          statusType,
        } = usePersonCardHandle(props)

        // mock
        const deptText = ref([
          '产品中心/产品部1',
          '北京百特云享科技有限公司/产品中心/产品部2',
          '北京百特云享科技有限公司/产品中心/产品部3',
          '北京百特云享科技有限公司/产品中心/产品部4',
          '北京百特云享科技有限公司/产品中心/产品部5',
          '北京百特云享科技有限公司/产品中心/测试部',
          '北京百特云享科技有限公司/产品中心/测试部/产品中心测试部子部门1',
          '北京百特云享科技有限公司/产品中心/测试部/产品中心测试部子部门2',
        ])

        const handleCloseCard = () => {
          context.emit('close')
        }
        // inner scrollbox
        const cardInner = ref(null)
        const cardHeader = ref(null)
        const footerRef = ref(null)
        const deptBox = ref(null)
        // 展开，收起
        const deptOpen = ref(false)
        // 是否有展开收起按钮
        const isShowBtn = ref(false)
        // 默认是否为两个部门
        const isTwoDepts = ref(false)
        // footer height
        const footerHeight = ref(0)

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

        // 打开弹窗， 初始化状态
        const visible = computed(() => props.visible)
        watch(
          visible,
          (val: any) => {
            if (val) {
              deptOpen.value = false
            }
          },
          {
            immediate: true,
          }
        )
        // dept 变化时触发， dept是接口返回
        watch(
          () => deptText.value,
          (val: string[]) => {
            if (val.length) {
              nextTick(() => {
                isOverTwoLine()
                console.log(isShowBtn.value)
              })
            }
          },
          {
            immediate: true,
          }
        )
        // test
        // nextTick(() => {
        //   isOverTwoLine()
        // })

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
        const handleBoxScroll = () => {
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
            header.style.bottom = '247px'
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
        }

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
        const handleOpen = () => {
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
          deptOpen,
          textStyle,
          showTeam,
          langPack,
          personInfoCom,
          deptText,
          statusType,
          maleIcon,
          femaleIcon,
          closeIcon,
          i18n: ref(props.i18n),
          handleCloseCard,
          handleOpen,
          footerRef,
          deptBox,
          isShowBtn,
          isTwoDepts,
          handleBoxScroll,
          cardInner,
          cardHeader,
          blurStyle,
          avatarStyle,
        }
      },
      template: `
        <span class="card-close-icon" @click="handleCloseCard">
          <svg
            t="1616573273136"
            class="icon abort-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="27041"
            width="20"
            height="20"
          >
            <path
              d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
              p-id="27042"
              fill="#fff"
            ></path>
          </svg>
        </span>
        <div ref="cardInner" 
          class="ok-person-card-inner" 
          @scroll="handleBoxScroll">
          <div ref="cardHeader" class="head">
            <header class="person-image">
              <div class="headCover"/>
              <div class="shadow" :style="blurStyle" />
              <mok-avatar
                style="position: absolute; display: block; height: 100%;"
                width="318px"
                height="100%"
                :round="false"
                :personInfo="JSON.stringify(personInfoCom)"          
                :textStyle="JSON.stringify(textStyle)"
                :avatarStyle="JSON.stringify(avatarStyle)"
                showMask
              ></mok-avatar>
              <span class="user-name-wraper">
                <span class="person-card-name" :class="{'isTerminated': statusType === '0'}">{{personInfoCom['name'][i18n]}}</span>
                <img v-if="personInfoCom.gender ==2" :src="femaleIcon" style="width: 24px; height:24px;" />
                <img v-else :src="maleIcon" style="width: 24px; height:24px;" />
                <div v-if="statusType === '0'" class="terminated-text">{{langPack.terminated}}</div>
              </span>
            </header>
          </div>

          <footer 
            class="person-detail-footer"
            ref="footerRef"
            >
              <div class="content-wraper">
                <div v-if="!personInfoCom.terminated && showTeam" class="item-row">
                    <span class="item-label">{{langPack.team}}：</span>
                    <p class="item-content" v-if="!deptText.length"> -- </p>
                    <ul ref="deptBox" class="dept-box" :class="{open: deptOpen, 'two-lines': isTwoDepts}" v-else>
                      <li class="dept-item" v-for="dept in deptText"> {{dept}}</li> 
                      <li v-if="isShowBtn" class="toggle-btn" @click="handleOpen">{{deptOpen ? '收起' : '展开'}}</li>             
                    </ul>
                </div>
                <div class="item-row">
                    <span class="item-label">{{langPack.email}}：</span>
                    <p class="item-content">{{ personInfoCom.email || '--'}}</p>
                </div>
              </div>
          </footer>
        </div>
        `,
    }
    const app = createApp(options)
    app.mount(context.$refs.showPersonCard as HTMLElement)
  })

  return () => html`
    <style>
      ${okPersonCardCss}
    </style>
    <div
      ref="showPersonCard"
      class="ok-person-detail"
      style="position: relative"
    ></div>
  `
})
