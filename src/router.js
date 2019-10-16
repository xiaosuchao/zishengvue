import Vue from 'vue'
import Router from 'vue-router'
import { getToken, setOpenid, setToken, setWechatinfo, getOpenid } from '@/utils/auth'
import store from './store'
import request from '@/utils/request'
// import { Toast } from 'vant'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    name: 'index',
    component: () => import('./view/index'),
    meta: {
      title: '首页-发发财富商城'
    }
  },

  {
    name: 'wxback',
    meta: {
      title: '微信授权'
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'reg',
    component: () => import('./view/user/reg'),
    meta: {
      title: '注册'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'glist',
    component: () => import('./view/goods/list'),
    meta: {
      title: '搜索'
    }
  },
  {
    name: 'headline',
    component: () => import('./view/headline'),
    meta: {
      title: '头条'
    }
  },
  {
    name: 'newsshow',
    component: () => import('./view/headline/show'),
    meta: {
      title: '头条详情'
    }
  },
  {
    name: 'category',
    component: () => import('./view/category'),
    meta: {
      title: '分类页面'
    }
  },
  {
    name: 'user_jinbi',
    component: () => import('./view/user/user_jinbi'),
    meta: {
      title: '金币'
    }
  },
  {
    name: 'user_orders',
    component: () => import('./view/user/user_orders'),
    meta: {
      title: '全部订单'
    }
  },
  {
    name: 'orderdetail',
    component: () => import('./view/user/user_orderdetail'),
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'ordercomment',
    component: () => import('./view/user/user_ordercomment'),
    meta: {
      title: '发表评价'
    }
  },
  {
    name: 'user_juan',
    component: () => import('./view/user/user_juan'),
    meta: {
      title: '优惠卷'
    }
  },
  {
    name: 'user_mycoupon',
    component: () => import('./view/user/user_mycoupon'),
    meta: {
      title: '我的优惠卷'
    }
  },
  {
    name: 'user_remainingsum',
    component: () => import('./view/user/user_remainingsum'),
    meta: {
      title: '余额明细'
    }
  },
  {
    name: 'user_addredit',
    component: () => import('./view/user/user_addredit'),
    meta: {
      title: '收货地址'
    }
  },
  {
    name: 'vipaccounts',
    component: () => import('./view/user/vipaccounts'),
    meta: {
      title: 'VIP账户'
    }
  },
  {
    name: 'paypwd',
    component: () => import('./view/user/user_paypwd'),
    meta: {
      title: '支付密码'
    }
  },
  {
    name: 'user_membership',
    component: () => import('./view/user/user_membership'),
    meta: {
      title: '会员资料'
    }
  },
  {
    name: 'order_confirm',
    component: () => import('./view/user/order_confirm'),
    meta: {
      title: '结算'
    }
  },
  {
    name: 'headline_text',
    component: () => import('./view/headline/headline_text'),
    meta: {
      title: '头条文章'
    }
  },
  {
    name: 'user_addrlist',
    component: () => import('./view/user/user_addrlist'),
    meta: {
      title: '添加新地址'
    }
  },
  {
    name: 'user_attention',
    component: () => import('./view/user/user_attention'),
    meta: {
      title: '我的收藏'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

// const router = new Router({ mode: 'history', routes })
const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  // console.log('from ', from)
  // console.log('to ', to)
  console.log('getToken', getToken())
  // setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwianRpIjoid3V6aG91In0.eyJpc3MiOiJ3dXpob3UiLCJhdWQiOiJzdXBwbGllciIsImp0aSI6Ind1emhvdSIsImlhdCI6MTU1NTI0MTEzMSwibmJmIjoxNTU1MjQxMTMxLCJleHAiOjE4NzA2MDExMzEsInVpZCI6IjE2In0.')
  // if (!getToken()) {
  //   window.location = '/#/reg'
  //   return
  // }

  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }

  console.log('before router')

  // 如果是从微信授权页面跳转回来的
  if (location.href.indexOf('code=') > -1) {
    if (to.name !== 'index') {
      console.log('不是去首页，加上强制后退去首页')
      window.addEventListener('popstate', window.backhome, false)
    }

    const code = location.href.match(/code=(\w)+/)[0].replace('code=', '')
    console.log('will login')
    request({
      url: '/auth/login',
      method: 'POST',
      data: {
        wechat_code: code,
        platform: 'wechat'
      }
    }).then(res => {
      if (res.msg && res.msg === 'no_reg') {
        setOpenid(res.data.openid)
        setWechatinfo(JSON.stringify(res.data))
        history.replaceState(null, null, '/#' + to.path)

        next({ name: 'reg', query: {}})
        return
      }
      if (res.status === 1) {
        setOpenid(res.data.openid)
        setWechatinfo(JSON.stringify(res.data))
        setToken(res.data.token)
        store.dispatch('setstoretoken', res.data.token)
        store.dispatch('setuserinfo', res.data)
        store.dispatch('loadaccinfo')

        console.log('to')
        console.log(to)
        let fullpath = to.fullPath
        fullpath = fullpath.replace(/[\&|\?]wxback=1/gi, '')
        // fullpath = fullpath.replace(/\&state=\w+/gi, '')
        // fullpath = fullpath.replace(/\&code=\w+/gi, '')
        history.replaceState(null, null, window.origin + '/#' + fullpath)

        history.pushState(null, null, window.origin)
        console.log('fullpath')
        console.log(fullpath)

        const objquery = to.query
        delete objquery.wxback
        next({ name: to.name, query: objquery })

        // const objquery = to.query
        // delete objquery.wxback
        // delete objquery.code
        // delete objquery.state
        // console.log('to', to, objquery)
        // next({ name: to.name, query: objquery })
      }
    })
  // } else if (process.env.NODE_ENV === 'production' && ((!store.state.userinfo && to.name !== 'reg') || (to.name === 'reg' && !getOpenid()))) {
  } else if (process.env.NODE_ENV === 'production' && ((!store.state.userinfo && to.name !== 'reg') || (to.name === 'reg' && !getOpenid()))) {
    // Toast(to.fullPath)
    // } else if (!1 && (!store.state.userinfo && to.name !== 'reg') || (to.name === 'reg' && !getOpenid())) {
    window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6de745c16e9de928&redirect_uri=' + encodeURIComponent(window.origin + '/#' + to.fullPath) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    return
  } else {
    if (to.name === 'index') {
      console.log('toname is  index,add fnback')
      window.removeEventListener('popstate', window.backhome)
      window.addEventListener('popstate', window.fnback, false)
    } else {
      console.log('remove fnback')
      window.removeEventListener('popstate', window.fnback)
    }
    next()
  }
})

export {
  router
}
