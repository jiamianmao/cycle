<template>
  <div class='container' @click='toggle' :class='cdCls'>
    <img src="./music.png">
    <audio src='http://outpmmta5.bkt.clouddn.com/cycle.mp3' loop ref='bg'></audio>
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
    mounted () {
      this.$refs.bg.play()
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
      play () {
        this.$refs.bg.play()
      },
      pause () {
        this.$refs.bg.pause()
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    computed: {
      cdCls () {
        return this.playing ? 'play' : ''
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
    display: flex
    justify-content: center
    align-items: center
    &.play
      animation: rotate 5s linear infinite
      -webkit-animation: rotate 5s linear infinite
    &.pause
      animation-play-state: paused
      -webkit-animation-play-state: paused
    img
      width: 100%
      border-radius: 50%
      border: 2px solid rgba(0, 0, 0, .1)
    

    @keyframes rotate
      0%
        transform: rotate(0)
        -webkit-transform: rotate(0)
      100%
        -webkit-transform: rotate(360deg)
</style>