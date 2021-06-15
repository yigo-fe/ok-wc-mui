// import './card-box'

import { computed, defineComponent, html, onUnmounted, ref } from 'ok-lit'

import { apiInitPersoncard } from '../services/api'
import props from './props'

defineComponent(
  'mok-person-cell',
  {
    ...props,
  },
  props => {
    const api = apiInitPersoncard()
    const toOpenId: any = ref('')
    const isAwaken = ref(false)
    const deptList: any = ref([])
    const statusType: any = ref('')
    const personInfo = computed(() => props.personInfo)
    const visible = ref(false)
    const isSelf = ref(false)
    const isFirstRender = ref(false)

    // 获取lark 及部门信息
    const getLarkInfo = async (id: string) => {
      let result: any = null
      if (props.propsGetInfoByEmpId) {
        result = await props.propsGetInfoByEmpId(id)
      } else {
        result = await api.default.GetInfoByEmpId({ emp_id: id })
      }

      if (result.code === '000000') {
        // 记录打开的是否为自己的卡片。判断依据：没有to_open_id字段则为自己
        isSelf.value = Object.keys(result.data).indexOf('to_open_id') === -1

        const fromOpenId = result.data.from_open_id
        toOpenId.value = result.data.to_open_id
        isAwaken.value = Boolean(fromOpenId && toOpenId.value)
        deptList.value = result.data.dept_resp_vo_list
        statusType.value = result.data.status_type
      }
      // 打开卡片。在此处打开卡片，避免卡片闪烁的情况
      showCard()
    }

    const initCard = (e: any) => {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation()
      // 判断是否已经获取的toOpenId, 并且不是自己
      if (!toOpenId.value && !isSelf.value) {
        const data: any = personInfo.value
        const id =
          data.employee_id || data.user_id || data.id || data.employee_number

        id && getLarkInfo(id)
      } else {
        showCard()
      }
    }

    // 展示card
    const showCard = () => {
      visible.value = true
      isFirstRender.value = true
      document.body.style.overflow = 'hidden'
    }
    // 关闭card
    const handleCardClose = () => {
      visible.value = false
      document.body.style.overflow = ''
    }

    onUnmounted(() => {
      handleCardClose()
    })

    return () => html`
      <style>
        .mok-person-cell,
        .mok-person-cell mok-avatar {
          display: inline-block;
          vertical-align: middle;
          font-size: 0;
          line-height: 1;
          -webkit-tap-highlight-color: transparent;
        }
      </style>
      <span ref="ok-person-trigger" class="mok-person-cell" @click=${initCard}>
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
      ${isFirstRender.value
        ? html`
            <mok-person-card
              .visible=${visible.value}
              .personInfo=${personInfo.value}
              .toOpenId=${toOpenId.value}
              .isAwaken=${isAwaken.value}
              .deptList=${deptList.value}
              .statusType=${statusType.value}
              @close=${handleCardClose}
            ></mok-person-card>
          `
        : ''}
    `
  }
)
