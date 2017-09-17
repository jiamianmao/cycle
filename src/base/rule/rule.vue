<template>
  <div class='rule'>
    <img src="./rule.png">
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .rule
    position: absolute
    top: 0
    left: 0
    z-index: 10
    width: 100vw
    height: 100vh
    background: url('./bg.jpg') no-repeat 0 0 / 100% 100%
    display: flex
    justify-content: center
    padding-top: 3.6rem
    box-sizing: border-box
    img
      width: 90%
      height: 80%
</style>