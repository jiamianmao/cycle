<template>
  <div class="container">
    这是一个PDF文件
  </div>
</template>
<script>
  export default {
    props: {
      types: {
        type: String,
        default: 'va'
      }
    },
    data () {
      return {
      }
    },
    created () {
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    z-index: 10
</style>