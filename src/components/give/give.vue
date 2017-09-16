<template>
  <div class='container'>
    <div class="top">
      <img src="./diamond.png">
    </div>
    <div class="middle">
      <input v-model='num' type="tel" placeholder='输入要获取的奖励数' name='num'>
    </div>
    <div class="bottom">
      <button @click='sure'>确认</button>
    </div>
    <modal :msg='msg' btn='确认' @close='close' @submit='submit' v-show='mask'></modal>
    <div class="mask" v-show='mask'></div>
  </div>
</template>

<script>
  import Modal from '@/base/modal/modal'
  export default {
    data () {
      return {
        num: '',
        mask: false
      }
    },
    methods: {
      sure () {
        this.num > 0 && (this.mask = true)
      },
      close () {
        this.mask = false
      },
      submit () {
        this.mask = false
        this.num = ''
      }
    },
    components: {
      Modal
    },
    computed: {
      msg () {
        return `确认发放${this.num}个钻石奖励？`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    display: flex
    flex-direction: column
    justify-content: center
    padding-top: 3rem
    box-sizing: border-box
    div
      text-align: center
    .top
      margin-bottom: 2rem
      img
        width: 15%
    .middle
      height: 1rem
      // background: red
      padding: .2rem 0
      input
        border: 1px solid #333
        height: 100%
        line-height: 1rem
        padding: 0 .2rem
        width: 4rem
        text-align: center
        font-size: 32px
    .bottom
      margin-top: 4rem
      height: 1rem
      button
        height: 100%
        border: 0
        padding: 0 1rem
        font-size: 32px
        border-radius: 8px
        background: #179B16
        color: #fff
        letter-spacing: 4px
    .mask
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100vh
      background: rgba(0, 0, 0, .3)
</style>