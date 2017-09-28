<template>
  <div class="container">

    <div class="top">
      <div class='file'>
        <transition name='bounceLeft'>
          <img src="./upload_3.png" v-show='init'>
        </transition>
        
        <transition name='bounceRight'>
          <span v-show='init'>已上传</span>
        </transition>
      </div>
      <div class='file' v-show='group === "A"'>
        <transition name='bounceLeft'>
          <img src="./upload_1.png" v-show='init'>
        </transition>
        <transition name='bounceRight'>
          <span v-show='init'>已上传</span>
        </transition>
      </div>
    </div>

    <div class="middle" v-show='!boss'>
      <h3>选择要@的人<span>{{num}} / 3</span></h3>
      <div class='list'>
        <form action="#" method='POST' id='myForm'>
          <label v-for='(item, index) of list' class='user_list' :class='{"first": index < 4}' @change='selectItem'>
            <input type="checkbox" :name='item.name' :data-id='item.id' :id='index'><label :for="index">{{item.name}}</label>
          </label>
        </form>
      </div>
    </div>

    <div class="middle" v-show='boss'>
      <h3>选择要@的人</h3>
      <div class='list'>
        <form action="#" method='POST' id='myForm'>
          <div class='zu'>
            <p class='big'>A组<p>
            <div v-for='zones of A_list'>
              <p class='small'>{{zones.name}}</p>
              <span v-for='(item, index) of zones.member' class='user_list' @change='selectItem'>
                <input type="checkbox" :name='item.name' :data-id='item.id' :id='index'><label :for="index">{{item.name}}</label>
              </span>
            </div>
          </div>
          <div class='zu'>
            <p class='big'>MIX组<p>
            <div v-for='zones of M_list'>
              <p class='small'>{{zones.name}}</p>
              <span v-for='(item, index) of zones.member' class='user_list' @change='selectItem'>
                <input type="checkbox" :name='item.name' :data-id='item.id' :id='index'><label :for="index">{{item.name}}</label>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>

    <transition name='zoom'>
      <div class="btn" v-show='init'>
        <img src="./submit.png" @click='toSubmit'>
      </div>
    </transition>

  </div>
</template>

<script>
  import storage from 'good-storage'
  import 'common/js/alert'
  import { mapMutations } from 'vuex'
  import { domain } from '@/common/config/config'

  export default {
    data () {
      return {
        group: 'A',
        num: 0,
        list: [],
        selectList: [],
        init: false,
        checkboxValue: '',
        boss: false,
        A_list: [],
        M_list: []
      }
    },
    created () {
      this._getUserGorup()
      this._getShareList()
    },
    mounted () {
      this.init = true
    },
    methods: {
      selectItem (e) {
        if (this.boss === false) {
          if (e.target.checked) {
            if (this.num === 3) {
              e.target.checked = false
              return
            }
            this.num++
            this.selectList.push(e.target.dataset.id)
          } else {
            this.num--
            let x = this.selectList.findIndex(item => {
              return item === e.target.dataset.id
            })
            this.selectList.splice(x, 1)
          }
        } else {
          if (e.target.checked) {
            this.selectList.push(e.target.dataset.id)
          } else {
            let x = this.selectList.findIndex(item => {
              return item === e.target.dataset.id
            })
            this.selectList.splice(x, 1)
          }
        }
      },
      toSubmit () {
        this.SET_CLICK(true)
        // 表单提交
        if (this.boss === false) {
          if (this.num > 0 && this.num <= 3) {
            this.$http.post(`${domain}/game/at`, {
              member_id: this.selectList
            }).then(res => {
              if (res.data) {
                this.$router.push('/result')
              }
            })
          } else {
            alert('请选择0~3个@的人')
          }
        } else {
          if (this.selectList.length > 0) {
            this.$http.post(`${domain}/game/at`, {
              member_id: this.selectList
            }).then(res => {
              if (res.data) {
                this.$router.push('/result')
              }
            })
          } else {
            alert('请@其他人')
          }
        }
      },
      _getUserGorup () {
        let post = storage.get('post')
        if (post === 'A') {
          this.group = 'A'
        } else {
          this.group = 'B'
        }
      },
      _getShareList () {
        // this.$http.get('https://www.easy-mock.com/mock/59b0e6efe0dc663341a0a78d/nian/at_list').then(res => {
        //   this.list = res.data.data
        // })
        this.$http.get(`${domain}/member/info`).then(res => {
          if (res.data.data.job === 'RD') {
            this.boss = true
            this.$http.get(`${domain}/game/at_rd_list`).then(res => {
              this.A_list = res.data.data.A
              this.M_list = res.data.data.MIX
            })
          } else {
            this.$http.get(`${domain}/game/at_list`).then(res => {
              this.list = res.data.data
            })
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
    padding-top: 20%
    box-sizing: border-box
    overflow: hidden
    .top
      width: 70%
      height: 4.8rem
      margin: 0 auto
      .file
        color: #fff
        font-size: 0.32rem
        letter-spacing: 4px
        height: 2.4rem
        display: flex
        align-items: center
        img
          margin-right: .6rem
          height: 70%
    .middle
      width: 90%
      margin: .5rem auto 0
      height: 5rem
      color: #fff
      font-size: 0.32rem
      h3
        margin-bottom: .2rem
        font-size: 0.37333333333333335rem
        span
          float: right
      .list
        overflow-y: scroll
        width: 100%
        height: 4.4rem
        .zu
          margin-top: .5rem
        .big
          font-size: 32px
          color: rgb(255, 255, 255)
        .small
          margin-top: 15px
          margin-right: 20px
          font-size: 28px
          color: rgb(150, 150, 150)
        .user_list
          display: inline-block
          width: 25%
          font-size: 0.4266666666666667rem
          margin-top: .6rem
          height: .5rem
          line-height: .5rem
          input
            margin-right: 4px
            width: 0.4266666666666667rem
            height: 0.4266666666666667rem
            vertical-align: -4px
        .first
          margin-top: .1rem
    .btn
      width: 100%
      max-height: 3rem
      margin-top: 1rem
      display: flex
      justify-content: center
      overflow: hidden
      img
        width: 60%
</style>