<template>
  <div class="container">
    <router-view></router-view>
    <div id="main" class='chart' style='width: 100%; height: 8.4rem;'></div>

    <transition name='bounce'>
    <div class="find" v-show='init'>
      <img src="./t_1.png" @click='find'>
      <div class='jax'>
        <span class='urlWrapper' v-for='(item, index) of imgList'>
          <span :style="{background: 'url(' + item.url + ')' + '100% 100%/100% 100%'}" @click='findData(index)' :class='{fadeIn: idx.indexOf(index) !== -1}'>
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
  /* eslint-disable */
  import url1 from '@/assets/war1.png'
  import url2 from '@/assets/war2.png'
  import url3 from '@/assets/war3.png'
  import url4 from '@/assets/war4.png'
  import url5 from '@/assets/war5.png'
  import url6 from '@/assets/war6.png'
  import zone1 from '@/assets/zone1.png'
  import zone2 from '@/assets/zone2.png'
  import zone3 from '@/assets/zone3.png'
  import zone4 from '@/assets/zone4.png'
  import zone5 from '@/assets/zone5.png'
  import zone6 from '@/assets/zone6.png'
  import chinaJson from './china.json'
  import { mapMutations } from 'vuex'

  const NUMBER = 6

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
      let list = []
      this.$http.get('http://meet.17link.cc/api/game/zone').then(res => {
        if (parseInt(res.data.status) === 200) {
          let data = res.data.data
          data.forEach(item => {
            item.city.forEach(i => {
              if (i.a === 1) {
                list.push({
                  zone: item.name,
                  name: i.name
                })
              }
            })
          })
          let zone1 = [
            {name: '黑龙江', value: [128, 47, 5]},
            {name: '吉林', value: [126, 44, 5]},
            {name: '辽宁', value: [123.5, 41.5, 5]},
            {name: '河北', value: [115.5, 38.2, 5]},
            {name: '北京', value: [116.3, 40, 5]},
            {name: '天津', value: [117.5, 39.5, 5]},
            {name: '山西', value: [112.4, 38.2, 5]}
          ]
          let zone2 = [
            {name: '上海', value: [121.8, 31.2, 1]}
          ]
          let zone3 = [
            {name: '安徽', value: [117.2, 32, 1]},
            {name: '江西', value: [115.8, 28, 5]},
            {name: '浙江', value: [120.3, 29.3, 1]},
            {name: '福建', value: [118.4, 26.5, 1]}
          ]
          let zone4 = [
            {name: '云南', value: [102, 25, 1]},
            {name: '贵州', value: [107, 27, 1]},
            {name: '广西', value: [109, 24, 1]},
            {name: '广东', value: [114, 23.7, 1]},
            {name: '海南', value: [110, 19.3, 1]}
          ]
          let zone5 = [
            {name: '新疆', value: [85, 41, 1]},
            {name: '四川', value: [103, 31, 1]},
            {name: '重庆', value: [107.4, 29.7, 1]},
            {name: '湖北', value: [112.4, 31.2, 1]},
            {name: '湖南', value: [112, 28, 1]},
            {name: '陕西', value: [108.5, 34, 1]}
          ]
          let zone6 = [
            {name: '河南', value: [114, 34, 1]},
            {name: '山东', value: [118, 36, 1]},
            {name: '江苏', value: [120, 33, 1]}
          ]
          let areaData = [
            {name: '北京', value: 8},
            {name: '天津', value: 8},
            {name: '上海', value: 9},
            {name: '重庆', value: 12},
            {name: '河北', value: 8},
            {name: '河南', value: 13},
            {name: '云南', value: 11},
            {name: '辽宁', value: 8},
            {name: '黑龙江', value: 8},
            {name: '湖南', value: 12},
            {name: '安徽', value: 10},
            {name: '山东', value: 13},
            {name: '新疆', value: 12},
            {name: '江苏', value: 13},
            {name: '浙江', value: 10},
            {name: '江西', value: 10},
            {name: '湖北', value: 12},
            {name: '广西', value: 11},
            {name: '甘肃', value: 0},
            {name: '山西', value: 8},
            {name: '内蒙古', value: 0},
            {name: '陕西', value: 12},
            {name: '吉林', value: 8},
            {name: '福建', value: 10},
            {name: '贵州', value: 11},
            {name: '广东', value: 11},
            {name: '青海', value: 0},
            {name: '西藏', value: 0},
            {name: '四川', value: 12},
            {name: '宁夏', value: 0},
            {name: '海南', value: 11},
            {name: '台湾', value: 0},
            {name: '香港', value: 0},
            {name: '澳门', value: 0}
          ]
          let z1 = []
          let z2 = []
          let z3 = []
          let z4 = []
          let z5 = []
          let z6 = []
          for (let i = 0; i < list.length; i++) {
            if (list[i].zone === 'zone1') {
              let x = zone1.find(item => {
                return item.name === list[i].name
              })
              z1.push(x)
            } else if (list[i].zone === 'zone2') {
              let x = zone2.find(item => {
                return item.name === list[i].name
              })
              z2.push(x)
            } else if (list[i].zone === 'zone3') {
              let x = zone3.find(item => {
                return item.name === list[i].name
              })
              z3.push(x)
            } else if (list[i].zone === 'zone4') {
              let x = zone4.find(item => {
                return item.name === list[i].name
              })
              z4.push(x)
            } else if (list[i].zone === 'zone5') {
              let x = zone5.find(item => {
                return item.name === list[i].name
              })
              z5.push(x)
            } else {
              let x = zone6.find(item => {
                return item.name === list[i].name
              })
              z6.push(x)
            }
            areaData.forEach(item => {
              if (item.name === list[i].name) {
                item.value -= NUMBER
              }
            })
          }
          // console.log(z1)
          // console.log(z2)
          // console.log(z3)
          // console.log(z4)
          // console.log(z5)
          // console.log(z6)
          console.log(areaData)
          this._initMap(z1, z2, z3, z4, z5, z6, areaData)
        }
      })
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
      _initMap (z1, z2, z3, z4, z5, z6, area) {
        this.$echarts.registerMap('china', chinaJson)
        let myChart = this.$echarts.init(document.getElementById('main'))
        let option = {
          tooltip: {},
          visualMap: {
            type: 'piecewise',
            min: 0,
            max: 13,
            splitNumber: 13,
            calculable: true,
            inRange: {
              color: ['#fff', '#FFFA85', '#933EC0', '#009FD7', '#66D1C9', '#FDA01F', '#E56BA4', '#CDCDCD', '#8B8989', '#6C6C6C', '#A4A4A4', '#939393', '#B4B4B4']
            },
            show: false
          },
          geo: {
            map: 'china',
            silent: true
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone1}`,
              silent: true,
              symbolSize: 30,
              itemStyle: {
                normal: {
                  color: 'red'
                }
              },
              data: z1
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone2}`,
              silent: true,
              symbolSize: 30,
              data: z2
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone3}`,
              silent: true,
              symbolSize: 30,
              data: z3
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone4}`,
              silent: true,
              symbolSize: 30,
              data: z4
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone5}`,
              silent: true,
              symbolSize: 30,
              data: z5
            },
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: `image://${zone6}`,
              silent: true,
              symbolSize: 30,
              data: z6
            },
            {
              name: 'categoryA',
              type: 'map',
              geoIndex: 0,
              data: area
            }
          ]
        }
        myChart.setOption(option)
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