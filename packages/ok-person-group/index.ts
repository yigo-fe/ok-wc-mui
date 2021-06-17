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

    const popperList = computed(() => {
      return props.showAllCount
        ? props.personList
        : props.personList.slice(props.maxDisplayNum)
    })

    const handleMoreClick = () => {
      props.showMore && props.showMore(popperList.value)
    }

    const avatarRender = () => {
      return html`
        ${showList.value.map(
          item => html`<mok-person-cell
            class="avatar-list"
            style="width: auto; height: auto;"
            .personInfo=${item}
            .size=${props.size}
            .width=${props.width}
            .height=${props.height}
            .propsGetInfoByEmpId=${props.propsGetInfoByEmpId}
          ></mok-person-cell>`
        )}
        ${showList.value?.length === 1
          ? html`<span class="single-user-name"
              >${showList.value?.[0]?.employee_name}</span
            >`
          : html`
              ${popperList.value.length
                ? html`<span @click=${handleMoreClick} class="more"
                    >...${popperList.value.length}</span
                  >`
                : ''}
            `}
      `
    }

    return () => html`
      <style>
        ${okPersonGroupCss}
      </style>
      <div class="mok-person-group mok-person-group-root">
        <div class="ok-person-group-wrap">${avatarRender()}</div>
      </div>
    `
  }
)
