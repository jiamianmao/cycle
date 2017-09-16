<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show='showFlag' @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="operate-btn left" @click='cancel'>{{cancelBtnText}}</div>
            <div class="operate-btn" @click='confirm'>{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      cancel () {
        this.hide()
        this.$emit('cancel')
      },
      confirm () {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .confirm
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100vh
    z-index: 998
    background-color: rgba(0, 0, 0, 0.3)
    
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      
      .confirm-content
        width: 7.2rem
        border-radius: 26px
        background: #333
        
        .text
          padding: 38px 30px
          line-height: 44px
          text-align: center
          color: rgba(255, 255, 255, 0.5)
          font-size: 32px
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: 32px
          .operate-btn
            flex: 1
            line-height: 44px
            padding: 20px 0
            border-top: 1px solid rgba(0, 0, 0, 0.3)
            color: rgba(255, 255, 255, 0.3)
            &.left
              border-right: 1px solid rgba(0, 0, 0, 0.3)

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>