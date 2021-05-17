declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // ok-wc-ui 配置
    okuiConfig: {
      env: 'PRD'
      apiPath: string // 接口地址
      sourceHost?: string
      basePath?: string
      cardPath?: string
      options?: {
        preview?: boolean
      }
      locale?: string
    }
  }
}

export {}
