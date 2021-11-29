import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ItemManger from '../views/ItemManger.vue'
import AdminLogin from '../views/AdminLogin.vue'
import ShopManger from '../views/ShopManger.vue'
import ShopDetails from '../views/ShopDetails.vue'
import ShopLogin from '../views/ShopLogin.vue'
import StationManger from '../views/StationManger.vue'
import CabinetManger from '../views/CabinetManger.vue'
import ListManger from '../views/ListManger.vue'
import Item from '../views/Item.vue'
import Buy from '../views/Buy.vue'
import AddItem from '../views/AddItem'
import OkBuy from '../views/OkBuy'
import Lucky from '../views/Lucky'
import EasyBuy from '../views/EasyBuy.vue'
import Save from '../views/Save.vue'
import EasyOkBuy from '../views/EasyOkBuy.vue'
import WithdrawManger from '../views/WithdrawManger'
import Withdraw from '../views/Withdraw'
import Setting from '../views/Setting'
import IncomeManger from '../views/IncomeManger'
import ShopperIncomeManger from '../views/ShopperIncomeManger'
import Rank from '../views/Rank'
Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AdminLogin',
    name: '管理员登录',
    component: AdminLogin
  },{
    path: '/ShopManger',
    name: '商户管理',
    component: ShopManger
  },{
    path: '/ShopDetails',
    name: '商户详情',
    component: ShopDetails
  },{
    path: '/ShopLogin',
    name: '商户登录',
    component: ShopLogin
  },{
    path: '/StationManger',
    name: '站点管理',
    component: StationManger
  },{
    path: '/CabinetManger/:cabinetId',
    name: '柜子管理',
    component: CabinetManger
  },{
    path: '/ItemManger',
    name: '商品管理',
    component: ItemManger
  },{
    path: '/ListManger',
    name: '订单管理',
    component: ListManger
  },{
    path: '/Item',
    name: '商品',
    component: Item
  },{
    path: '/Buy',
    name: '购买',
    component: Buy
  },{
    path: '/AddItem',
    name: '添加商品',
    component: AddItem
  },
  {
    path: '/OkBuy',
    name: '盲盒购买',
    component: OkBuy
  },
  {
    path: '/Lucky',
    name: '盲盒',
    component: Lucky
  },
  {
    path: '/EasyBuy',
    name: '无人售货柜',
    component: EasyBuy
  },
  {
    path: '/Save',
    name: '储物柜',
    component: Save
  },
  {
    path: '/EasyOkBuy',
    name: '无人售货购买',
    component: EasyOkBuy
  },
  {
    path: '/WithdrawManger',
    name: '提现管理',
    component: WithdrawManger
  },
  {
    path: '/Withdraw',
    name: '提现',
    component: Withdraw
  }, {
        path: '/IncomeManger',
        name: '收入管理',
        component: IncomeManger
    }, 
    {
        path: '/ShopperIncomeManger',
        name: '收入分析',
        component: ShopperIncomeManger
    },
    {
      path: '/Setting',
      name: '设置',
      component: Setting
    },
    {
      path: '/Rank',
      name: '排行榜',
      component: Rank
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router