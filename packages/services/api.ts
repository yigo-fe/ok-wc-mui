/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-03-15 16:58:26
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-26 16:09:09
 * @FilePath: /packages/services/api.ts
 */

import { HttpClient } from './axios'
import ServicePersoncard from './services-personcard'

// 'https://test.yigowork.com/apps/api'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://172.16.1.53:8000/apps/api'
    : window.okuiConfig?.apiPath

// 文件上传
const sourceHost =
  process.env.NODE_ENV === 'development'
    ? 'https://test.baiteda.com/'
    : window.okuiConfig?.sourceHost

export function apiInitPersoncard() {
  // 人员卡片接口地址
  const personcardURL =
    process.env.NODE_ENV === 'development'
      ? 'http://172.16.1.53:8000/apps/api'
      : window.okuiConfig?.cardPath || window.okuiConfig?.apiPath

  const httpClient = new HttpClient(personcardURL)
  const serviceAuto = new ServicePersoncard(httpClient)

  return {
    default: serviceAuto,
  }
}

export { baseURL, sourceHost }
