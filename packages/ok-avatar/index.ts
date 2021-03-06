/*
 * @Descripttion:
 * @Author: ไป้
 * @Date: 2021-02-18 16:01:20
 * @LastEditors: ไป้
 * @LastEditTime: 2021-06-03 23:04:55
 * @FilePath: /packages/ok-avatar/index.ts
 */

import { defineComponent, html, onMounted } from 'ok-lit'
import { createApp } from 'vue'

import useAvatarHandler from './hook'
import props from './props'
defineComponent(
  'mok-avatar',
  {
    ...props,
  },
  (props, context) => {
    onMounted(() => {
      const options = {
        setup() {
          const params = useAvatarHandler(props)

          return {
            ...params,
          }
        },
        template: `
        <div class="avatar-wapper" :style="avatarWapperAll">
          <div :class="[avatarClass, round && 'round']" class="tagAavtar" :style="avatarStyleAll" >
            <div v-if="!hasAvatar" class="name-text" :style="avatarTextStyle">{{showName}}</div>
          </div>
        </div>
      `,
      }
      // console.log('context.$refs.showUser', Vue)
      const app = createApp(options)

      app.mount(context.$refs.showUser as HTMLElement)
    })

    return () => html`
      <style>
        .mok-avatar {
          font-size: 0;
          height: 100%;
        }
      </style>
      <div ref="showUser" class="mok-avatar"></div>
    `
  }
)
