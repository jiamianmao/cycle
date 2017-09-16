<template>
  <div class='va_fight'>
    <fight :num='num' types='va'></fight>
  </div>
</template>

<script>
  import Fight from '@/components/fight/fight'
  export default {
    props: {
      num: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
      }
    },
    created () {
      this.$emit('toPause')
    },
    components: {
      Fight
    }
  }
</script>

<style lang="stylus" scoped>
  .va_fight
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
</style>