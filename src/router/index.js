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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
