import { BaseApp } from '@zeppos/zml/base-app'

App(
  BaseApp({
    globalData: {},
    onCreate(options) {
      console.log('App inizializzata con ZML')
    },
    onDestroy(options) {}
  })
)