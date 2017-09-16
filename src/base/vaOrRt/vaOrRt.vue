<template>
  <div class="container">
    <div class="video">
      <video src="./lol.mp4" controls autoplay ref='video'></video>
    </div>
    <div class="area">
      <p v-for='n of 6' :class='{
        btn1: n === 1,
        btn2: n === 2,
        btn3: n === 3,
        btn4: n === 4,
        btn5: n === 5,
        btn6: n === 6,
      }' @click='zone(n)'>Zone{{n}}</p>
    </div>
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
    },
    methods: {
      zone (n) {
        this.$emit('selectItem', n)
      },
      pause () {
        this.$refs.video.pause()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    position: relative
    width: 100%
    height: 100vh
    background: url(./bg.jpg) no-repeat 0 0/100% 100%
    .video
      width: 100%
      height: 0
      padding-top: 56.25%
      position: relative
      background: red
      video
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
    .area
      width: 100%
      margin-top: .5rem
      p
        width: 90%
        height: 1.2rem
        margin: 0 auto
        border: 1px solid #666
        border-radius: 10px
        text-align: center
        line-height: 1.2rem
        font-size: 0.32rem
      p~p
        margin-top: .4rem
      .btn1
        background: #FFF985
      .btn2
        background: #933EC1
      .btn3
        background: #00A0DA
      .btn4
        background: #66D1C8
      .btn5
        background: #FEA11F
      .btn6
        background: #E56CA4
</style>