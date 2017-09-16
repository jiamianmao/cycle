<template>
  <div>
    <button class='btn'>{{time | change}}</button>
  </div>
</template>

<script>
  let flag = false
  export default {
    data () {
      return {
        time: '获取'
      }
    },
    props: {
      start: {
        type: Boolean
      }
    },
    watch: {
      start (value, oldvalue) {
        if (value === true) {
          this.countDown()
        }
      }
    },
    methods: {
      countDown () {
        this.time = 60
        let time = setInterval(() => {
          this.time--
          if (this.time === 0) {
            this.$emit('countDown')
            this.time = '获取'
            flag = true
            clearInterval(time)
          }
        }, 1000)
      }
    },
    filters: {
      change (value) {
        if (!value) return ''
        if (!isNaN(value)) {
          if (flag === true) {
            return `重新发送${value}S`
          }
          return value + 'S'
        } else {
          return value
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .btn
    background: #1AAD19
    height: .8rem
    border: 0
    font-size: 0.4266666666666667rem
    padding: 0 0.1rem
    color: #fff
    border-radius: 10px
</style>