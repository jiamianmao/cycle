<template>
  <div class="loading">
    <img src="./loading.gif" width='30' height='30'>
    <p class='desc'>{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="stylus" scoped rel='stylesheet/stylus'>

  .loading
    width: 100%
    text-align: center
    .desc
      margin-top: 20px
      line-height: 0.5333333333333333rem
      color: #fff
      font-size: 20px
</style>