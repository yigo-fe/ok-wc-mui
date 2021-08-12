import { styleMap } from 'lit-html/directives/style-map'
import { computed, defineComponent, html, PropType } from 'ok-lit'

/**
 * @props persons: {Array<Person>} 用户信息组
 */
import okPersonGroupCss from './style/ok-person-group.less'

// eslint-disable-next-line no-unused-vars

type SIZE_TYPE = 'large' | 'middle' | 'small' | 'mini'
defineComponent(
  'mok-person-group',
  {
    personList: {
      type: Array as unknown as PropType<any[]>,
      default: () => {
        return []
      },
    },
    size: {
      type: String as unknown as PropType<SIZE_TYPE>,
      default: 'small',
    },
    width: {
      type: String as unknown as PropType<string>,
    },
    height: {
      type: String as unknown as PropType<string>,
    },
    showAllCount: {
      // ...数字 是否展示全部数量
      type: Boolean as unknown as PropType<boolean>,
      default: false,
    },
    maxDisplayNum: {
      // 展示的图像个数
      type: Number as unknown as PropType<number>,
      default: 3,
    },
    // 审批组件传入，卡片请求数据方法
    propsGetInfoByEmpId: {
      type: Function,
    },
    showMore: {
      // eslint-disable-next-line no-unused-vars
      type: Function as unknown as PropType<(list: any) => void>,
    },
  },
  props => {
    const showList = computed(() => {
      return props.personList?.slice(0, props.maxDisplayNum)
    })

    // const popperList = computed(() => {
    //   return props.showAllCount
    //     ? props.personList
    //     : props.personList.slice(props.maxDisplayNum)
    // })

    const moreCount = computed(() => {
      const cha = props.personList?.length - props.maxDisplayNum
      let count = ''
      if (cha > 9) {
        count = '9+'
      } else if (cha > 0) {
        count = cha.toString()
      }
      return count
    })

    const handleMoreClick = () => {
      props.showMore && props.showMore(props.personList)
    }

    const avatarStyle = computed(() => {
      return showList.value.length > 1
        ? { 'box-sizing': 'border-box', border: '1px solid #fff' }
        : {}
    })

    const moreIconRender = () => {
      return html`
        <div
          class="more-icon"
          style=${styleMap({ width: props.width, height: props.height })}
        >
          ${moreCount.value}
        </div>
      `
    }

    const avatarRender = () => {
      return html`
        ${showList.value.map(
          item => html`<mok-avatar
            class="avatar-list"
            style="width: auto; height: auto;"
            .personInfo=${item}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
            .avatarStyle=${avatarStyle.value}
          ></mok-avatar>`
        )}
        ${showList.value?.length === 1 && props.maxDisplayNum !== 1
          ? html`<span class="single-user-name"
              >${showList.value?.[0]?.employee_name}</span
            >`
          : html``}
        ${props.personList.length > props.maxDisplayNum ? moreIconRender() : ''}
      `
    }

    return () => html`
      <style>
        ${okPersonGroupCss}
      </style>
      <div class="mok-person-group mok-person-group-root">
        <div class="ok-person-group-wrap" @click=${() => handleMoreClick()}>
          ${avatarRender()}
        </div>
      </div>
    `
  }
)
