<template>
  <div id="app">
    <music ref='music'></music>
    <transition name='router-fade'>
      <router-view @music='fadeOut' @fadeIn='fadeIn' @pause='pause' @play='play' v-wechat-title="$route.meta.title" img-set="/static/1.png"></router-view>
    </transition>
  </div>
</template>

<script>
import Music from '@/components/music/music'
export default {
  data () {
    return {}
  },
  mounted () {
    document.addEventListener('WeixinJSBridgeReady', () => {
      this.$refs.music.play()
    }, false)
  },
  methods: {
    pause () {
      this.$refs.music.pause()
    },
    play () {
      this.$refs.music.play()
    },
    fadeOut () {
      this.pause()
      this.$refs.music.$el.style.opacity = 0
    },
    fadeIn () {
      this.play()
      this.$refs.music.$el.style.opacity = 1
    }
  },
  components: {
    Music
  }
}
</script>

<style>
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
	}
</style>
