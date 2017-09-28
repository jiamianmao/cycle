import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import King from '@/components/king/king'
import Chang from '@/components/chang/chang'
import Rule from '@/base/rule/rule'
import Va from '@/components/va/va'
import Rt from '@/components/rt/rt'
import VaFight from '@/components/va_fight/va_fight'
import RtFight from '@/components/rt_fight/rt_fight'
import File from '@/base/file/file'
import Upload from '@/components/upload/upload'
import Result from '@/components/result/result'
import Share from '@/components/share/share'
import Huan from '@/components/huan/huan'
import Give from '@/components/give/give'
import Treasure from '@/components/treasure/treasure'
import Video from '@/components/video/video'

Vue.use(Router)
Vue.use(require('vue-wechat-title'))
import storage from 'good-storage'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/king',
      component: King
    },
    {
      path: '/chang',
      component: Chang,
      meta: {
        title: '试炼场'
      },
      children: [
        {
          path: 'rule',
          component: Rule,
          meta: {
            title: '规则'
          }
        }
      ]
    },
    {
      path: '/huan',
      component: Huan,
      meta: {
        title: '礼物兑换'
      }
    },
    {
      path: '/va',
      component: Va,
      meta: {
        title: storage.get('va')
      }
    },
    {
      path: '/va/:id',
      component: VaFight,
      meta: {
        title: '规则介绍'
      }
    },
    {
      path: '/rt',
      component: Rt,
      meta: {
        title: storage.get('rt')
      }
    },
    {
      path: ':id',
      component: RtFight,
      meta: {
        title: '规则介绍'
      }
    },
    {
      path: '/file',
      component: File
    },
    {
      path: '/upload',
      component: Upload,
      meta: {
        title: '挑战'
      }
    },
    {
      path: '/result',
      component: Result
    },
    {
      path: '/share',
      component: Share,
      meta: {
        title: '分享'
      }
    },
    {
      path: '/give',
      component: Give,
      meta: {
        title: '奖励发放'
      }
    },
    {
      path: '/treasure',
      component: Treasure,
      meta: {
        title: '藏书阁'
      },
      children: [
        {
          path: 'video',
          component: Video,
          meta: {
            title: '视频资源'
          }
        }
      ]
    }
  ]
})
