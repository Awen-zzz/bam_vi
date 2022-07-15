import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('SvgIcon', SvgIcon)
// 批量导入所有svg，固定写法
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
