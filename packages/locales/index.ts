import { OkI18n } from 'ok-i18n'

// enum LocaleEnum {
//   zh = 'zh-CN',
//   en = 'en-US',
//   ja = 'ja-JP',
// }
import en from './en-US.json'
import ja from './ja-JP.json'

const locale =
  window.localStorage.getItem('locale') || window.okuiConfig?.locale || 'zh-CN'

const i18n = new OkI18n({
  locale,
  messages: {
    enUS: en,
    jaJP: ja,
  },
})

export { i18n, locale }
