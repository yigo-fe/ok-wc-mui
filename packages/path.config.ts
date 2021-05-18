/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-02-20 19:58:14
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-18 16:49:16
 * @FilePath: /packages/path.config.ts
 */
const CDN_PATH =
  process.env.NODE_ENV === 'development'
    ? './'
    : 'https://ego-fe.oss-cn-beijing.aliyuncs.com/lib/ok-wc-ui/'

const COMMON_CSS_PATH = `${CDN_PATH}common.mobile.css`

export { CDN_PATH, COMMON_CSS_PATH }
