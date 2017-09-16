<template>
  <div v-show='fade' class='modal'>
    <h1>温馨提示<span><img src="./close.png" @click='close'></span></h1>
    <div class="content">
      {{msg}}
    </div>
    <div class="btn">
      <button @click='submit'>{{btn}}</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String,
        default: ''
      },
      btn: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        fade: true
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      submit () {
        this.$emit('submit')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .modal
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 2
    background: #fff
    width: 80%
    height: 5rem
    padding: 0 .4rem
    box-sizing: border-box
    h1
      height: 1rem
      text-align: center
      line-height: 1rem
      font-size: 32px
      span
        float: right
        img
          max-height: .6rem
          vertical-align: middle
    .content
      padding: .8rem
      font-size: 28px
    .btn
      margin-top: .2rem
      height: .8rem
      text-align: center
      button
        height: .8rem
        padding: .2rem
        box-sizing: border-box
        line-height: .4rem
        border: 0
        background: #179B16
        color: #fff
        letter-spacing: 3px
        border-radius: 6px
        font-size: 28px
</style>