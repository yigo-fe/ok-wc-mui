// import { Person } from '@c/ok-wc-ui.d'

import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp, ref } from 'vue'

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
defineComponent('mok-person-card', { ...props }, (props, context) => {
  onMounted(() => {
    const options = {
      setup() {
        const {
          textStyle,
          showTeam,
          langPack,
          personInfoCom,
          deptText,
          statusType,
        } = usePersonCardHandle(props)

        const handleCloseCard = () => {
          context.emit('close')
        }

        return {
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
        }
      },
      template: `
        <div>
          <header class="person-image">
            <div class="headCover"/>
            <mok-avatar
              width="318px"
              height="210px"
              :round="false"
              :personInfo="JSON.stringify(personInfoCom)"          
              :textStyle="JSON.stringify(textStyle)"
              showMask
            ></mok-avatar>
            <span class="user-name-wraper">
              <span class="person-card-name" :class="{'isTerminated': statusType === '0'}">{{personInfoCom['name'][i18n]}}</span>
              <img v-if="personInfoCom.gender ==2" :src="femaleIcon" class="gender-icon" />
              <img v-else :src="maleIcon" class="gender-icon" />
              <div v-if="statusType === '0'" class="terminated-text">{{langPack.terminated}}</div>
            </span>

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

          </header>

          <footer class="person-detail-footer">
            <div class="content-wraper">
              <div v-if="!personInfoCom.terminated && showTeam" class="item-row">
                  <span class="item-label">{{langPack.team}}：</span>
                  <p class="item-content" v-if="!deptText?.length"> -- </p>
                  <ul v-else>
                    <li class="dept-item" v-for="dept in deptText"> {{dept}}</li>              
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
    <div ref="showPersonCard" class="ok-person-detail"></div>
  `
})
