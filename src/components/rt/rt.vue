<template>
  <div>
    <vaOrRt :types='types' @selectItem='selectItem' ref='vaOrRt' @pause='music'></vaOrRt>
    <router-view :num='num' @toPause='pause' @play='play'></router-view>
  </div>
</template>

<script>
  import VaOrRt from '@/base/vaOrRt/vaOrRt'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        types: 'rt',
        num: 1
      }
    },
    methods: {
      music () {
        this.$emit('music')
      },
      play () {
        this.$emit('fadeIn')
      },
      selectItem (n) {
        this.SET_CLICK(true)
        this.num = n
        this.$router.push({
          path: `/rt/${n}`
        })
      },
      pause () {
        this.$refs.vaOrRt.pause()
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    components: {
      VaOrRt
    }
  }
</script>

<style lang="stylus" scoped>
</style>