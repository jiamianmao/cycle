<template>
  <transition name='slide'>
    <div class='rule'>
      <img class='close' @click='close' src="./close.png">
      <div class='bg'>
        <img src="./rule.png">
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      close () {
        this.$router.push({
          path: '/chang'
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .rule
    position: absolute
    top: 0
    left: 0
    z-index: 10
    width: 100vw
    height: 100vh
    background: url('./bg.jpg') no-repeat 0 0 / 100% 100%
    // display: flex
    // justify-content: center
    padding-top: 3.2rem
    box-sizing: border-box
    .bg
      width: 96%
      margin: .5rem auto
      img
        width: 100%
    .close
      position: absolute
      top: 1.6rem
      left: .6rem
      width: 1rem
</style>