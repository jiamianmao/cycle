<template>
  <div id="app">
    <music></music>
    <router-view v-wechat-title="$route.meta.title" img-set="/static/1.png"></router-view>
  </div>
</template>

<script>
import Music from '@/components/music/music'
export default {
  data () {
    return {

    }
  },
  components: {
    Music
  }
}
</script>

<style>
</style>
