<template>
  <div class="container">

    <transition name='bounceLeft'>
      <div class='logo' v-show='init'>
      </div>
    </transition>

    <transition name='bounceLeft'>
      <div class="left" v-show='init'></div>
    </transition>

    <transition name='bounceRight'>
      <div class="right" v-show='init'></div>
    </transition>

    <transition name='bounceRight'>
      <div class="image" v-show='img' @click='quick'>
        <img :src="img">
      </div>
    </transition>
    
    <div class="content">
      <transition name='rotate'>
        <div class="title" v-show='init'>
          <img src="./title.png">
        </div>
      </transition>

      <transition name='bounceUp'>
        <div class="btn" @click='enter' v-show='init'>
          <img src="./go.png">
        </div>
      </transition>

    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  // import storage from 'good-storage'

  export default {
    data () {
      return {
        img: null,
        init: false
      }
    },
    created () {
      // this.$http.post('http://meet.17link.cc/api/member/info').then(res => {
      //   if (parseInt(res.data.status) === 200) {
      //     let post = res.data.data.post
      //     console.log(post)
      //     storage.set('post', post)
      //     if (post === 'A') {
      //       storage.set('rt', '心内+肾内RT讲解标准版')
      //       storage.set('va', '心内+肾内VA讲解标准版')
      //     } else {
      //       storage.set('rt', '社区RT')
      //       storage.set('va', '心内VA讲解标准版')
      //     }
      //   }
      // })
    },
    mounted () {
      this.init = true
    },
    methods: {
      enter () {
        this.SET_CLICK(true)
        this.img = require('./1.jpg')
        this.id = setTimeout(() => {
          this.img = null
          this.$router.push('/king')
          return
        }, 3000)
      },
      quick () {
        if (this.id) {
          clearTimeout(this.id)
        }
        this.img = null
        this.$router.push('/king')
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    position: relative
    width: 100%
    height: 100vh
    background: url(./bg.png) no-repeat 0 0/100% 100%
    overflow: hidden
    .left
      position: absolute
      top: 0.5333333333333333rem
      left: 0.4533333333333333rem
      width: 2.1333333333333333rem
      height: 0.72rem
      background: url('./left.png') no-repeat 0 0/100% 100%
    .right
      position: absolute
      top: 0.5333333333333333rem
      right: 0.72rem
      height: 0.7466666666666667rem
      width: 2.24rem
      background: url('./right.png') no-repeat 0 0/100% 100%
    .logo
      margin: 1.85rem auto 0
      height: 6.8rem
      width: 6.6rem
      background: url('./logo.png') no-repeat 0 0/100% 100%
      img
        height: 100%
        width: 100%
    .image
      position: absolute
      bottom: 0
      left: 0
      top: 0
      right: 0
      z-index: 10
      img
        width: 100%
        height: 100%
    .content
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 6.3rem
      text-align: center
      .title
        width: 90%
        margin: 0 auto
        img
          width: 100%
      .btn
        height: 50%
        img
          width: 70%
</style>