import { defineComponent, html, onMounted } from 'ok-lit'
import { computed, createApp } from 'vue'

import closeIcon from '../assets/images/closed.svg'
import femaleIcon from '../assets/images/female.svg'
import maleIcon from '../assets/images/male.svg'
import { locale } from '../locales'
import usePersonCardHandle from './hook'
defineComponent(
  'mok-person-card',
  {
    personInfo: {
      type: [Object, String],
      default() {
        return {}
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
    deptList: {
      type: Array,
      default: () => {
        return []
      },
    },
    statusType: {
      type: String,
    },
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const visible = computed(() => props.visible)
          const labelClass = computed(() => {
            return locale === 'en-US' ? 'en' : locale === 'ja-JP' ? 'ja' : ''
          })

          const {
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
            toggleText,
          } = usePersonCardHandle(props)

          // 点击关闭按钮，关闭弹窗
          const handleCloseCard = (e: any) => {
            window.event
              ? (window.event.cancelBubble = true)
              : e.stopPropagation()
            context.emit('close')
          }

          // 点击弹层，判断target是否为卡片，非卡片的地方，关闭
          const handleMaskClick = (e: any) => {
            window.event
              ? (window.event.cancelBubble = true)
              : e.stopPropagation()
            var event = e || window.event
            var target = event.target || event.srcElement

            if (target?.className?.indexOf?.('person-card-mask') < 0) return
            context.emit('close')
          }

          return {
            maleIcon,
            femaleIcon,
            closeIcon,
            statusType,
            visible,
            handleCloseCard,
            handleMaskClick,
            handleOnScroll,
            cardInner,
            cardHeader,
            footerRef,
            deptOpen,
            isShowBtn,
            isTwoDepts,
            footerHeight,
            textStyle,
            showTeam,
            langPack,
            personInfoCom,
            deptBox,
            deptText,
            handleToggleDept,
            blurStyle,
            avatarStyle,
            toggleText,
            labelClass,
          }
        },
        template: `
       
        <teleport to="body">
          <div
            @click="handleMaskClick"       
            style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 8000; background: rgba(0, 0, 0, 0.3);"
            :style="{ display: visible ? 'block' : 'none' }"
          >
            <div
              class="person-card-mask"
              style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"
            >
              <div
                class="mok-personcard-box"
                style="position: relative; width: 318px; overflow:hidden; z-index:100; cursor: default; border-radius: 14px;"
              >
                <span class="card-close-icon" @click="handleCloseCard">
                  <svg
                    t="1616573273136"
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

                <div
                  ref="cardInner"
                  class="scroll-box"
                  @scroll="handleOnScroll"
                  style="height: 361px; overflow: auto;"
                >
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
                        <span class="person-card-name" :class="{'isTerminated': statusType === '0'}">{{personInfoCom['name']['zh']}}</span>
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
                        <div class="item-row">
                            <div class="item-label" :class="labelClass">{{langPack.team}}：</div>
                            <p class="item-content" v-if="!deptText.length"> -- </p>
                            <ul ref="deptBox" class="dept-box" :class="{open: deptOpen, 'two-lines': isTwoDepts}" v-else>
                              <li class="dept-item" v-for="dept in deptText"> {{dept}}</li> 
                              <li v-if="isShowBtn" class="toggle-btn" @click="handleToggleDept">{{toggleText}}</li>             
                            </ul>
                        </div>
                        <div class="item-row">
                            <div class="item-label" :class="labelClass">{{langPack.email}}：</div>
                            <p class="item-content">{{ personInfoCom.email || '--'}}</p>
                        </div>
                      </div>
                  </footer>

                </div>
              </div>
            </div>
          </div>
        </teleport>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.showPersonCard as HTMLElement)
    })

    return () => html` <div ref="showPersonCard"></div> `
  }
)
