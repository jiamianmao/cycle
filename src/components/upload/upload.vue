<template>
  <div class="container">

    <div class="upload">
      <form action="#" enctype='multipart/form-data' method='POST'>
        <div class='file_wrapper'>
          <transition name='bounceLeft'>
            <img class='icon' src="./upload_1.png" v-show='init'>
          </transition>
          <transition name='bounceRight'>
            <img @click='slideInfo' class='file' src="./upload_2.png" v-show='init'>
          </transition>
          <input @change='isUpload' @click='voice' v-show='isAndroid' class='ipt' type="file" name="shen">
        </div>

        <div class='file_wrapper' v-show='group === "A"'>
          <transition name='bounceLeft'>
            <img class='icon' src="./upload_3.png" v-show='init'>
          </transition>
          <transition name='bounceRight'>
            <img @click='slideInfo' class='file' src="./upload_4.png" v-show='init'>
          </transition>
          <input @change='isUpload' @click='voice' v-show='isAndroid' class='ipt' type="file" name="xin">
        </div>

      </form>
    </div>

    <transition name='rotate'>
      <div class="ios" v-show='isiOS && isSlide'>
        <p>请您把录制好的音频文件发送至下面邮箱</p>
        <span>R8zwz2017@163.com</span>
        <p>发送邮件时请注明个人手机号和要完成的挑战</p>
      </div>
    </transition>

    <div class='confirm' v-show='uploading'>
      <loading title='文件上传中请耐心等待不要退出页面'></loading>
    </div>

    <div class="mask" v-show='isSlide' @click='isSlide = false'></div>
  </div>
</template>

<script>
  import Loading from '@/base/loading/loading'
  import storage from 'good-storage'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        isAndroid: true,
        isiOS: false,
        isSlide: false,
        flag: 0,
        group: 'A',
        uploading: false,
        init: false
      }
    },
    created () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      this.isAndroid = isAndroid
      this.isiOS = isiOS
      this._getUserGorup()
      // 每次进来的时候要先判断是否上传过了
      this._push()
    },
    mounted () {
      this.init = true
    },
    methods: {
      slideInfo () {
        this.voice()
        this.isSlide = true
      },
      isUpload (e) {
        let type
        if (e.target.name === 'shen') {
          type = 'audio_1'
        } else {
          type = 'audio_2'
        }
        var formData = new FormData()
        var fileInput = e.target
        var file = fileInput.files[0]
        formData.append(type, file)
        let config = {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        this.uploading = true
        // console.log(formData.get('myFile'))
        this.$http.post('http://meet.17link.cc/api/game/va', formData, config).then(res => {
          this.uploading = false
          if (res.data.status === 301) {
            alert('未收到邀请,或超过24小时')
          } else {
            this.flag++
            if (this.flag === 2) {
              this.$router.push('/share')
            }
          }
        })
      },
      _getUserGorup () {
        let post = storage.get('post')
        if (post === 'A') {
          this.flag = 0
          this.group = 'A'
        } else {
          this.flag = 1
          this.group = 'B'
        }
      },
      _push () {
        this.$http.get('http://meet.17link.cc/api/game/info?type=Va').then(res => {
          let data = res.data
          if (parseInt(data.status) === 404) {
            return
          } else {
            if (this.group === 'A') {
              if (data.data.game_annexe.length === 0) {
                this.flag = 0
                return
              } else if (data.data.game_annexe.length === 1) {
                this.flag = 1
                return
              } else {
                this.flag = 2
                this.$router.push('/share')
              }
            } else {
              if (data.data.game_annexe.length === 0) {
                this.flag = 1
                return
              } else {
                this.flag = 2
                this.$router.push('/share')
              }
            }
          }
        })
      },
      voice () {
        this.SET_CLICK(true)
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    position: relative
    width: 100%
    height: 100vh
    background: url(./bg.jpg) no-repeat 0 0/100% 100%
    .upload
      width: 100%
      height: 100vh
      padding-top: 3.05rem
      box-sizing: border-box
      .file_wrapper
        text-align: center
        position: relative
        display: flex
        justify-content: center
        align-items: center
        .icon
          width: 25%
        .file
          width: 50%
          margin-left: 0.26666666666666666rem
        .ipt
          position: absolute
          right: 2%
          width: 48%
          height: 100%
          opacity: 0
    .mask
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
      height: 100vh
      background: rgba(0, 0, 0, .3)
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
        margin: 0.8rem 0
        color: #E51C23
    .confirm
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100%
</style>