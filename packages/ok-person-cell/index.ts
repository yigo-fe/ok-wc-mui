// import { setPopover } from '@c/utils'
import { defineComponent, html, ref } from 'ok-lit'

import { apiInitPersoncard } from '../services/api'
// import { personInfo } from '../mock'
/**
 * person: {Person} 用户信息
 * TODO:
 * 头像形状：circle ｜ square
 * 文字头像：背景色自定义
 */
import props from './props'
defineComponent(
  'mok-person-cell',
  {
    ...props,
  },
  (props, contxt) => {
    const api = apiInitPersoncard()
    const toOpenId: any = ref('')
    const isAwaken = ref(false)
    const deptList: any = ref([])
    const statusType: any = ref('')

    const checkLardShow = async (id: string) => {
      let result: any = null
      if (props.propsGetInfoByEmpId) {
        result = await props.propsGetInfoByEmpId(id)
      } else {
        result = await api.default.GetInfoByEmpId({ emp_id: id })
      }

      if (result.code === '000000') {
        const fromOpenId = result.data.from_open_id
        toOpenId.value = result.data.to_open_id
        isAwaken.value = Boolean(fromOpenId && toOpenId.value)
        deptList.value = result.data.dept_resp_vo_list
        statusType.value = result.data.status_type
      }
      // 打开卡片。在此处打开卡片，避免卡片闪烁的情况
      initCard()
    }

    const showCard = () => {
      // 判断是否已经获取的toOpenId
      if (!toOpenId.value) {
        const personInfo: any = props.personInfo
        const id =
          personInfo.employee_id ||
          personInfo.user_id ||
          personInfo.id ||
          personInfo.employee_number

        id && checkLardShow(id)
      } else {
        initCard()
      }
    }

    const initCard = () => {
      const el = contxt.$refs['person-card-wrap'] as HTMLElement
      if (el && el.style) {
        el.style.display = 'flex'
      }
    }

    const clickClose = (e: any) => {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation()
      var event = e || window.event
      var target = event.target || event.srcElement

      if (target?.tagName === 'MOK-PERSON-CARD') return
      // 关闭卡片
      handleCardClose()
    }

    const handleCardClose = () => {
      const el = contxt.$refs['person-card-wrap'] as HTMLElement
      if (el && el.style) {
        el.style.display = 'none'
      }
    }

    return () => html`
      <style>
        .mok-person-cell,
        .mok-person-cell mok-avatar {
          display: inline-block;
          vertical-align: middle;
          font-size: 0;
          line-height: 1;
        }
      </style>
      <span ref="ok-person-trigger" class="mok-person-cell" @click=${showCard}>
        <slot>
          <mok-avatar
            class="user-avatar"
            .personInfo=${props.personInfo}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
          ></mok-avatar>
        </slot>
      </span>
      <div
        style="display: none; position: fixed; top: 0;left:0; bottom:0; right: 0;z-index:5000; align-items: center; justify-content: center;background: rgba(0, 0, 0, 0.3) "
        class="mok-person-card-wrap"
        ref="person-card-wrap"
        @click=${clickClose}
      >
        <div class="mok-person-card-box">
          <mok-person-card
            ref="person-card"
            .personInfo=${props.personInfo}
            .toOpenId=${toOpenId.value}
            .isAwaken=${isAwaken.value}
            .deptList=${deptList.value}
            .statusType=${statusType.value}
            @close=${handleCardClose}
          ></mok-person-card>
        </div>
      </div>
    `
  }
)
