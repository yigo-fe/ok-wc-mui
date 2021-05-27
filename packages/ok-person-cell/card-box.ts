/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-26 20:51:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-27 10:33:08
 * @FilePath: /packages/ok-person-cell/card-box.ts
 */
import { defineComponent, html, onMounted } from 'ok-lit'
import { computed, createApp } from 'vue'

defineComponent(
  'mok-card-box',
  {
    personInfo: {
      type: [Object, String],
      default() {
        return {}
      },
    },
    toOpenId: {
      type: String,
    },
    isAwaken: {
      type: Boolean,
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
          const personInfo = computed(() => props.personInfo)
          const toOpenId = computed(() => props.toOpenId)
          const isAwaken = computed(() => props.isAwaken)
          const statusType = computed(() => props.statusType)
          const deptList = computed(() => props.deptList)
          const visible = computed(() => props.visible)

          // 点击关闭按钮，关闭弹窗
          const handleCardClose = () => {
            context.emit('close')
          }

          // 点击弹层，判断target是否为卡片，非卡片的地方，关闭
          const clickClose = (e: any) => {
            window.event
              ? (window.event.cancelBubble = true)
              : e.stopPropagation()
            var event = e || window.event
            var target = event.target || event.srcElement
            if (target?.tagName === 'MOK-PERSON-CARD') return
            context.emit('close')
          }

          return {
            personInfo,
            toOpenId,
            isAwaken,
            deptList,
            statusType,
            visible,
            handleCardClose,
            clickClose,
          }
        },
        template: `
       
        <teleport to="body">
          <div
            style="display: none; position: fixed; top: 0;left:0; bottom:0; right: 0; z-index:5000; background: rgba(0, 0, 0, 0.3) "
            :style="{display: visible? '': 'none'}"
            ref="person-card-wrap"
            @click="clickClose"
          >
            <div class="mok-person-card-box" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <mok-person-card
                ref="person-card"
                :personInfo="personInfo"
                :toOpenId="toOpenId"
                :isAwaken="isAwaken"
                :deptList="deptList"
                :statusType="statusType"
                @close="handleCardClose"
              ></mok-person-card>
            </div>
          </div>
        </teleport>
        `,
      }
      const app = createApp(options)
      app.mount(context.$refs.showCardBox as HTMLElement)
    })

    return () => html` <div ref="showCardBox"></div> `
  }
)
