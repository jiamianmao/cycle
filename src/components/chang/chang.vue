<template>
  <div class="container">
    <router-view></router-view>

    <transition name='zoom'>
      <div class="map" v-show='init'></div>
    </transition>

    <transition name='bounce'>
      <div class="find" v-show='init'>
        <img src="./t_1.png" @click='find' class='shuoming'>
        <div class='jax'>
          <span class='urlWrapper' v-for='(item, index) of imgList'>
            <span class='pad' :style="{background: 'url(' + item.url + ')' + '100% 100%/100% 100%'}" @click='findData(index)' :class='{fadeIn: idx.indexOf(index) !== -1}'>
              {{item.percent}}
            </span>
          </span>
        </div>
      </div>
    </transition>

    <div class="btn">
      <transition name='bounceLeft'>
        <img src="./VA.png" @click='va_fight' v-show='init'>
      </transition>
      <transition name='bounceRight'>
        <img src="./RT.png" @click='rt_fight' v-show='init'>
      </transition>
    </div>
  </div>
</template>
<script>
  import url1 from '@/assets/war1.png'
  import url2 from '@/assets/war2.png'
  import url3 from '@/assets/war3.png'
  import url4 from '@/assets/war4.png'
  import url5 from '@/assets/war5.png'
  import url6 from '@/assets/war6.png'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        imgList: [
          {
            url: url1,
            percent: ''
          },
          {
            url: url2,
            percent: ''
          },
          {
            url: url3,
            percent: ''
          },
          {
            url: url4,
            percent: ''
          },
          {
            url: url5,
            percent: ''
          },
          {
            url: url6,
            percent: ''
          }
        ],
        idx: [],
        init: false
      }
    },
    created () {
      this._getZone()
    },
    mounted () {
      this.init = true
    },
    methods: {
      find () {
        this.$router.push({
          path: '/chang/rule'
        })
      },
      va_fight () {
        this.SET_CLICK(true)
        this.$router.push('/va')
      },
      rt_fight () {
        this.SET_CLICK(true)
        this.$router.push('/rt')
      },
      findData (index) {
        this.idx.push(index)
      },
      _getZone () {
        this.$http.get('http://meet.17link.cc/api/game/zone').then(res => {
          let result = res.data.data
          for (let i = 0; i < result.length; i++) {
            let num = result[i].a * 100 | 0
            this.imgList[i].percent = num + '%'
          }
        })
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
    background: url(./bg.jpg) no-repeat 0 0/100% 100%
    padding-top: 1.8rem
    box-sizing: border-box
    .map
      width: 100%
      height: 8.4rem
      background: url(./map.png) no-repeat 0 0/100% 100%
    .find
      margin-top: 0.2rem
      width: 100%
      text-align: center
      position: relative
      .shuoming
        height: .5rem
      .jax
        margin-top: .4rem
        .urlWrapper~.urlWrapper
          margin-left: .4rem
        .urlWrapper
          display: inline-block
          width: .7rem
          height: .9rem
          .pad
            line-height: 1.4rem
          span
            display: inline-block
            width: 100%
            height: 100%
            box-sizing: border-box
            text-align: center
            color: #fff
            font-size: 0
            vertical-align: top
          .fadeIn
            padding-top: 70%
            font-size: 0.32rem
            font-weight: bold
    .btn
      position: absolute
      bottom: 1.4rem
      left: 0
      width: 100%
      text-align: center
      img
        width: 48%
</style>