/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-06-08 17:08:04
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-08 18:23:19
 * @FilePath: /packages/ok-person-card/utils.ts
 */
const getDeptItemHeight = (offsetWidth: number, text: string) => {
  const cssText = `
          visibility: hidden;
          word-break: break-word;
          width:${offsetWidth + 1}px;
          font-size: 14px;
          font-weight: normal;
          line-height: 21px;
      `
  let el = document.createElement('div')
  el.style.cssText = cssText
  document.body.appendChild(el)
  el.innerHTML = text
  const offsetHeight = el.offsetHeight
  document.body.removeChild(el)
  return offsetHeight
}

const getDeptBoxHeight = (
  offsetWidth: number,
  deptList: string[],
  email: string
) => {
  const cssText = `
          visibility: hidden;
          word-break: break-word;
          width:${offsetWidth + 1}px;
          font-size: 14px;
          font-weight: normal;
          line-height: 21px;
      `
  let el = document.createElement('div')
  el.style.cssText = cssText
  document.body.appendChild(el)
  el.innerHTML = deptList
    .map(
      (v: string) =>
        `<div style="word-break: break-word; margin-top: 6px;">${v}</div>`
    )
    .join(' ')

  el.innerHTML += `<div style="word-break: break-word; margin-top: 12px;">${email}</div>`
  // const offsetHeight = el.offsetHeight
  // document.body.removeChild(el)
  // const boxHeight = el.offsetHeight + 12
  return el.offsetHeight < 356 ? el.offsetHeight : 356
}
export { getDeptBoxHeight, getDeptItemHeight }
