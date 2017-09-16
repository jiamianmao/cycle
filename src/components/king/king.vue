<template>
  <div class="container">
    <div class="mask" v-show='popUp'></div>
    <div class="login" v-show='popUp'>
      <p class='title'>
        完善信息
        <img @click='close' src="./close.png">
      </p>
      <div class='content'>
        <form action="#" method='POST'>
          <p>
            <label for="name">姓名</label>
            <input class='information' v-model='name' type="text" id='name' name='name' placeholder='请输入个人姓名'>
          </p>
          <p>
            <label for="mobile">手机号码</label>
            <input class='information' v-model='tel' type="tel" id='mobile' placeholder='请输入个人手机号' name='mobile'>
          </p>
          <p @click.prevent>
            <label for="code">验证码</label>
            <input type="tel" placeholder='验证码' v-model='code' name='code' class='code' @keyup='check'>
            <!--<button class='btn'>获取</button>-->
            <count class='countDown' :start='start' @countDown ='start = false' @click.native = 'sendCode'></count>
          </p>
          <p class='btn_sub'>
            <button type='button' class='btn btn-large' @click='submit'>提交</button>
          </p>
        </form>
      </div>
    </div>
    <div class="wrapper">
      <div class="top">
        <transition name='bounceDown'>
          <div v-show='init'>
            <img src="./war.png">
          </div>
        </transition>
        <transition name='bounceLeft'>
          <div @click='chang' v-show='init'>
            <img class='btn' src="./chang.png">
          </div>
        </transition>
      </div>
      <div class="bottom">
        <transition name='bounceRight'>
          <div v-show='init'>
            <img src="./money.png">
          </div>
        </transition>
        <transition name='bounceUp'>
          <div @click='huan' v-show='init'>
            <img class='btn' src="./huan.png">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Count from '@/base/countDown/countDown'
  import 'common/js/alert'
  import storage from 'good-storage'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        isLogined: false,
        popUp: false,
        start: false,
        code: '',
        name: '',
        tel: '',
        init: false
      }
    },
    created () {
      this._login()
    },
    mounted () {
      this.init = true
    },
    methods: {
      chang () {
        this.SET_CLICK(true)
        if (!this.isLogined) {
          this.popUp = true
          return
        }
        this.$router.push('/chang')
      },
      huan () {
        this.SET_CLICK(true)
        if (!this.isLogined) {
          this.popUp = true
          return
        }
        this.$router.push('/huan')
      },
      close () {
        this.popUp = false
      },
      sendCode (value) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))) {
          alert('您的手机号码错误，请重新输入')
          return
        }
        this.$http.post('/api/game/code', {
          phone: this.tel
        }).then(res => {
          if (res.data.status === 200) {
            this.start = true
          } else {
            this.tel = ''
            alert('您的手机号码不存在，请重新输入')
          }
        })
      },
      check () {
        this.code = this.code.slice(0, 6)
      },
      submit () {
        if (!this.name) {
          alert('请输入姓名')
        } else if (!this.tel) {
          alert('请输入手机号')
        } else if (!this.code) {
          alert('请输入验证码')
        } else {
          this.$http.post('/api/game/register', {
            phone: this.tel,
            code: this.code
          }).then(res => {
            if (res.data.status === 200) {
              this.isLogined = true
              this.popUp = false
              storage.set('id', this.tel)
              storage.set('post', res.data.data.post)
              storage.set('zone_id', res.data.data.zone_id)
              storage.set('score', res.dta.data.score)
            } else {
              alert('您的信息输入不正确')
            }
          })
        }
      },
      _login () {
        let id = storage.get('id')
        if (id) {
          this.isLogined = true
          this.popUp = false
        } else {
          this.isLogined = false
          this.popUp = true
        }
      },
      ...mapMutations([
        'SET_CLICK'
      ])
    },
    components: {
      Count
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    position: relative
    width: 100%
    height: 100vh
    background: url(./bg.jpg) no-repeat 0 0/100% 100%
    display: flex
    justify-content: center
    align-items: center
    .mask
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .4)
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .login
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 90%
      height: 9rem
      background: #fff
      box-shadow: 3px 3px 10px #333333
      padding: .38rem
      box-sizing: border-box
      z-index: 9
      .title
        font-size: 0.48rem
        text-align: center
        position: relative
        img
          position: absolute
          width: .7rem
          top: -9px
          right: 0
      .content
        margin: .8rem auto
        font-size: 0.4266666666666667rem
        p
          height: .8rem
        p~p
          margin-top: .8rem
        .btn_sub
          text-align: center
        .countDown
          display: inline-block
        .btn
          background: #1AAD19
          height: .8rem
          border: 0
          font-size: 0.4266666666666667rem
          width: 2rem
          color: #fff
          letter-spacing: 5px
          border-radius: 10px
        .btn-large
          width: 3rem
          height: 1.3rem
          border-radius: 16px
        label
          box-sizing: border-box
          padding-left: 10%
          width: 35%
          display: inline-block
        .information
          width: 50%
        .code
          width: 20%
    .wrapper
      width: 5.2rem
      img
        width: 3.2rem
      .btn
        width: 3.8rem
      .top
        width: 100%
        height: 50%
        div
          text-align: center
      .bottom
        position: relative
        margin-top: 1.26rem
        width: 100%
        height: 50%
        opacity: .3
        &:before
          content: ''
          display: block
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: rgba(0, 0, 0, .01)
          z-index: 1
        div
          text-align: center
          img
            max-width: 100%
</style>