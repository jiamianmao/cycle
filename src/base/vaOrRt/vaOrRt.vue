<template>
  <div class="container">
    <div class="video">
      <video :src="url" controls autoplay ref='video' @ended='end' @playing='playing' @canplay='playing'></video>
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
    <p class='desc' v-show='types === "va"'>若您暂未收到他人@，则无法开始VA挑战</p>
  </div>
</template>

<script>
  /* eslint-disable */
  import storage from 'good-storage'
  import { title } from '@/common/config/config'
  // const VA1 = 'http://outpmmta5.bkt.clouddn.com/A%E7%BB%84VA1'
  // const VA2 = 'http://outpmmta5.bkt.clouddn.com/A%E7%BB%84VA2'
  // const VA3 = 'http://outpmmta5.bkt.clouddn.com/A%E7%BB%84VA3'
  // const RT1 = 'http://outpmmta5.bkt.clouddn.com/A%E7%BB%84RT1'
  // const RT2 = 'http://outpmmta5.bkt.clouddn.com/A%E7%BB%84RT2'
  // const RT3 = 'http://outpmmta5.bkt.clouddn.com/MIXRT'
  
  const A_VA = 'http://outpmmta5.bkt.clouddn.com/endva'
  const M_VA = 'http://outpmmta5.bkt.clouddn.com/vahebing'
  const A_RT = 'http://outpmmta5.bkt.clouddn.com/endrt'
  const M_RT = 'http://outpmmta5.bkt.clouddn.com/MIXRT'
  export default {
    props: {
      types: {
        type: String,
        default: 'va'
      }
    },
    data () {
      return {
        url: '',
        post: ''
      }
    },
    created () {
      this.post = storage.get('post')
      // console.log(this.post)
      // if (this.types === 'va') {
      //   if (storage.get('va') === title.aVa || storage.get('va') === title.mVa) {
      //     this.url = VA1
      //   } else {
      //     this.url = storage.get('url')
      //   }
      // } else {
      //   if (storage.get('rt') === '心内+肾内RT讲解标准版') {
      //     this.url = RT1
      //   } else if (storage.get('rt') === '心内+肾内RT讲解标准版 ') {
      //     this.url = RT2
      //   } else {
      //     this.url = RT3
      //   }
      // }
      if (this.types === 'va') {
        this.url = this.post === 'A' ? A_VA : M_VA
      } else {
        this.url = this.post === 'A' ? A_RT : M_RT
      }
    },
    // destroyed () {
    //   if (this.post === 'A') {
    //     storage.set('va', '心内+肾内VA讲解标准版')
    //     storage.set('rt', '心内+肾内RT讲解标准版')
    //   } else {
    //     storage.set('va', '心内VA讲解标准版')
    //     storage.set('rt', '社区RT')
    //   }
    //   storage.remove('url')
    // },
    methods: {
      zone (n) {
        this.$emit('selectItem', n)
      },
      pause () {
        this.$refs.video.pause()
      },
      end () {
        // if (this.url === VA1) {
        //   storage.set('va', '心内+肾内VA讲解标准版 ')
        //   storage.set('url', VA2)
        //   location.reload()
        // } else if (this.url === VA2 && this.post === 'A') {
        //   storage.set('va', ' 心内+肾内VA讲解标准版')
        //   storage.set('url', VA3)
        //   location.reload()
        // } else if (this.url === VA3) {
        //   storage.set('va', '心内+肾内VA讲解标准版')
        // } else if (this.url === RT1) {
        //   storage.set('rt', '心内+肾内RT讲解标准版 ')
        //   location.reload()
        // }
      },
      playing () {
        this.$emit('pause')
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
      background: #000
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
        height: 1rem
        margin: 0 auto
        border: 1px solid #666
        border-radius: 10px
        text-align: center
        line-height: 1rem
        font-size: 0.32rem
      p~p
        margin-top: .2rem
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
    .desc
      margin-top: .4rem
      color: #fff
      text-align: center
      font-size: .4rem
</style>