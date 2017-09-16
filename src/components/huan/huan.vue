<template>
  <div class='container'>
    <div class="top">
      <img src="./diamond.png"> {{wealth}}
    </div>
    <div class="wrapper">
      <div class='item' v-for='(item, index) of list'>
        <div class='image'>
          <img v-lazy="item.url">
        </div>
        <div class='name'>
          {{item.name}}
        </div>
        <div class='detail'>
          <div class="left">
            {{item.price}} <img src="./diamond.png">
          </div>
          <div class="right" @click='exchange(index, item.price)'>
            <button :class='{disab: wealth < item.price}'>兑换</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show='mask'>
      <div class="yinying"></div>
      <modal @close='close' :btn='btn' :msg='msg'></modal>
    </div>
  </div>
</template>

<script>
  import Modal from '@/base/modal/modal'
  import storage from 'good-storage'

  export default {
    data () {
      return {
        wealth: 0,
        list: [
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1162117815,1645297334&fm=27&gp=0.jpg',
            name: 'iphone X',
            price: 10
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1162117815,1645297334&fm=27&gp=0.jpg',
            name: 'iphone X',
            price: 20
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1162117815,1645297334&fm=27&gp=0.jpg',
            name: 'iphone X',
            price: 30
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1162117815,1645297334&fm=27&gp=0.jpg',
            name: 'iphone X',
            price: 40
          }
        ],
        mask: false,
        btn: '',
        msg: ''
      }
    },
    created () {
      this.wealth = storage.get('score')
    },
    methods: {
      exchange (index, price) {
        if (this.wealth >= price) {
          this.mask = true
          this.msg = '请至现场工作人员处，领取奖品后，点击底部确认按钮'
          this.btn = '礼物已兑换'
          this.wealth -= price
        }
      },
      close () {
        this.mask = false
      }
    },
    components: {
      Modal
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    width: 100%
    padding: 0 3%
    box-sizing: border-box
    .top
      height: 1rem
      width: 100%
      display: flex
      align-items: center
      font-size: 28px
      img
        max-height: 60%
        margin-right: .3rem
    .wrapper
      width: 100%
      display: flex
      flex-wrap: wrap
      .item
        width: 48%
        display: flex
        flex-direction: column
        &>div
          width: 100%
        .image
          height: 4.511867rem
          img
            width: 100%
            height: 100%
        .name
          height: .6rem
          text-align: center
          line-height: .6rem
        .detail
          display: flex
          justify-content: space-between
          margin-bottom: .2rem
          .left
            height: .8rem
            line-height: .8rem
            img
              max-height: 60%
              vertical-align: middle
          .right
            height: .8rem
            line-height: .8rem
            button
              width: 1.6rem
              height: 80%
              border: 0
              font-size: 24px
              background: #179B16
              color: #fff
              border-radius: 6px
              letter-spacing: 4px
            .disab
              background: #aaa
              color: #000
      .item:nth-of-type(even)
        margin-left: 4%
    .mask
      .yinying
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: 1
        background: rgba(0, 0, 0, .3)
</style>