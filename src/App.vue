<template>
  <div id="app">
    <music ref='music'></music>
    <router-view v-wechat-title="$route.meta.title" img-set="/static/1.png"></router-view>
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
  components: {
    Music
  }
}
</script>

<style>
</style>
