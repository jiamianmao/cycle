<template>
  <div class='container' @click='toggle' :class='cdCls'>
    <img src="./music.png">
    <audio src='http://outpmmta5.bkt.clouddn.com/bg.mp3' autoplay loop ref='bg'></audio>
    <audio src="http://outpmmta5.bkt.clouddn.com/btn.mp3" ref='btn'></audio>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        playing: true
      }
    },
    methods: {
      toggle () {
        this.playing = !this.playing
        if (!this.playing) {
          this.$refs.bg.pause()
        } else {
          this.$refs.bg.play()
        }
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    computed: {
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      ...mapGetters([
        'click'
      ])
    },
    watch: {
      click (newVal) {
        this.$refs.btn.play()
        this.SET_CLICK(false)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    position: absolute
    top: 1.5rem
    right: .6rem
    height: 1rem
    width: 1rem
    border-radius: 50%
    z-index: 999
    border: 1px solid #000
    display: flex
    justify-content: center
    align-items: center
    &.play
      animation: rotate 5s linear infinite
    &.pause
      animation-play-state: paused
    img
      width: 60%
    

    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>