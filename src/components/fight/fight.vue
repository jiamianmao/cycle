<template>
  <div class="container">

    <div class="rule">
      <transition name='bounceDown'>
        <img :src="url" v-show='init'>
      </transition>
    </div>

    <div class="content">
      <h3>Zone{{num}} 挑战纪录</h3>
      <ul class="listWrapper" v-if='types === "va"' ref='wrapper'>
        <li class="list" v-for='item of list'>
          <img v-lazy="item.avatar">
          <p class='name' v-html='item.name'></p>
          <p v-html='item.province.name'></p>
        </li>
      </ul>
      <ul class="listWrapper" v-else>
        <li class="list" v-for='item of list'>
          <img v-lazy="item.avatar">
          <p class='area' v-html='item.area'></p>
        </li>
      </ul>
    </div>

    <div class="btn">
      <transition name='bounceLeft'>
        <img src="./fight_file.png" @click='see' v-show='init'>
      </transition>
      <transition name='bounceRight'>
        <img src="./fight_start.png" v-show='invite && init' @click='start'>
      </transition>
      <input @change='toUpload' v-show='this.types === "rt" && isAndroid' class='ipt' type="file" name="xin">
    </div>

    <transition name='rotate'>
      <div class="ios" v-show='isiOS && isSlide'>
        <p>请您把录制好的音频文件发送至下面邮箱</p>
        <span>R8zwz2017@163.com</span>
        <p>发送邮件时请注明姓名，电话及录制内容名称</p>
        <p class='bottom'>发送成功(工作日9:00-18:00，2小时内审核上传，其他时间次日10:00点前审核上传)</p>
        <p>可完成后续挑战</p>

      </div>
    </transition>

    <div class='confirm' v-show='uploading'>
      <loading title='文件上传中请耐心等待不要退出页面'></loading>
    </div>

    <confirm :text='text' ref='confirm' @confirm='sure'></confirm>

    <div class="mask" v-show='isSlide' @click='fadeOut'></div>

    <router-view :types='types'></router-view>
  </div>
</template>

<script>
  import Confirm from '@/base/confirm/confirm'
  import va from '@/assets/va_fight.png'
  import rt from '@/assets/rt_fight.png'
  import Loading from '@/base/loading/loading'
  import { mapMutations } from 'vuex'
  import { domain } from '@/common/config/config'
  import $ from 'jquery'
  import _ from 'lodash'
  import storage from 'good-storage'

  export default {
    props: {
      types: {
        type: String,
        default: 'va'
      },
      num: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        isAndroid: true,
        isiOS: false,
        isSlide: false,
        list: [],
        // 是否被@，只有被@的用户才显示开始挑战按钮
        invite: true,
        isUpload: false,
        text: '您已经上传过了',
        uploading: false,
        page: 1,
        flag: false,
        init: false
      }
    },
    created () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      this.isAndroid = isAndroid
      this.isiOS = isiOS
      // 获取挑战列表数据
      this.flag = true
      this._getInvite()
      this._getListData()

      // 判断是否已经上传过了
      this.$http.get(`${domain}/game/${this.types}_check?zone_id=${this.num}`)
      .then(res => {
        if (!res.data.data.status) {
          this.isUpload = true
        }
      })
    },
    mounted () {
      this.init = true
      let that = this
      $('.listWrapper').on('scroll', _.throttle(scrollHandler, 200))
      function scrollHandler () {
        let len = Math.ceil(that.list.length / 3)
        let scrollTop = $(this).scrollTop()
        let height = $(this).height()
        let countHeight = $(this).find('li').height() * len
        if (scrollTop + height >= countHeight - 50) {
          if (!this.flag) {
            this.flag = true
            that._getListData()
          }
        }
      }
    },
    methods: {
      see () {
        this.SET_CLICK(true)
        let post = storage.get('post')
        if (this.types === 'va') {
          alert('若您暂未收到他人@，只可学习资料，无法开始VA试炼')
          if (post === 'A') {
            window.location.href = 'http://meet.17link.cc/storage/pages/September2017/J7GOvYYFY0MAEp7Y4mRm.pdf'
          } else {
            window.location.href = 'http://meet.17link.cc/storage/pages/September2017/xR9wI7oh16iXF5rasGmo.pdf'
          }
        } else {
          if (post === 'A') {
            window.location.href = 'http://meet.17link.cc/storage/pages/September2017/tlOE6CzeDWJJakl3Eaf3.pdf'
          } else {
            window.location.href = 'http://meet.17link.cc/storage/pages/September2017/yMFypmSCymLQ6j2XfVdL.pdf'
          }
        }
      },
      start () {
        this.SET_CLICK(true)
        if (this.isUpload) {
          if (this.types === 'va') {
            this.text = '您已经上传过了'
          } else {
            this.text = '当前城市已上传'
          }
          this.$refs.confirm.show()
        } else {
          if (this.types === 'va') {
            this.$router.push('/upload')
          } else {
            this.isSlide = true
          }
        }
      },
      toUpload (e) {
        var formData = new FormData()
        var fileInput = e.target
        var file = fileInput.files[0]
        formData.append('file', file)
        let config = {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        this.uploading = true
        this.isSlide = true
        // console.log(formData.get('myFile'))
        this.$http.post(`${domain}/game/${this.types}`, formData, config).then(res => {
          this.uploading = false
          this.isSlide = false
          if (parseInt(res.data.status) === 301) {
            alert('未收到邀请,或超过24小时')
          } else {
            this.$router.push('/result')
          }
        })
      },
      fadeOut () {
        if (!this.uploading) {
          this.isSlide = false
        }
      },
      sure () {
        this.$router.push('/result')
      },
      _getInvite () {
        this.$http.get(`${domain}/game/${this.types}_check?zone_id=${this.num}`).then(res => {
          res.data.data.status === false ? (this.invite = false) : (this.invite = true)
        })
      },
      _getListData () {
        this.$http.get(`${domain}/game/${this.types}_list?zone_id=${this.num}&page=${this.page}`)
        .then(res => {
          if (this.flag) {
            let data = res.data.data.data
            if (data.length) {
              data.forEach(item => {
                this.list.push(item.member)
                this.page++
                this.flag = false
              })
            }
          }
        })
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    computed: {
      url () {
        if (this.types === 'va') {
          return va
        } else {
          return rt
        }
      }
    },
    components: {
      Confirm,
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background: url(./bg.jpg) no-repeat 0 0/100% 100%
    z-index: 10
    .rule
      margin: 30px auto 0
      text-align: center
      height: 5rem
      img
        height: 100%
        width: 90%
    .content
      text-align: center
      color: #fff
      h3
        font-size: 0.4266666666666667rem
      .listWrapper
        margin-top: .2rem
        width: 100%
        height: 6.666rem
        overflow-y: scroll
        .list
          float: left
          width: 33.33%
          height: 50%
          .area
            margin-top: .3rem
          .name
            margin: 0.2rem 0
          img
            margin-top: 20px
            width: 1.6rem
            height: 1.6rem
            border-radius: 50%
    .btn
      position: absolute
      bottom: .2rem
      width: 100%
      text-align: center
      .ipt
        position: absolute
        right: 2%
        width: 48%
        height: 100%
        opacity: 0
      img
        width: 48%
    .ios
      position: absolute
      bottom: 0
      left: 0
      height: 4.8rem
      width: 100%
      background: #fff
      padding: 0.43rem
      box-sizing: border-box
      text-align: center
      font-size: 0.4266666666666667rem
      box-shadow: 0px -2px 4px #333333
      z-index: 1
      span
        display: block
        margin: .4rem 0
        color: #E51C23
      .bottom
        margin: .4rem
    .mask
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .3)
    .confirm
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100%
      z-index: 1
</style>