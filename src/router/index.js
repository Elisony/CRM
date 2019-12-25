import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV);
import Layout from '../views/layout/Layout';


export const constantRouterMap = [{
	path: '/login',
	name: 'Login',
	component: _import('login/index'),
	hidden: true
}, {
	path: '/',
	name: 'Login',
	component: _import('login/index'),
	hidden: true
}, {
	path: '/404',
	component: () =>
		import('@/views/404'),
	hidden: true
}, {
	path: '/dashboard',
	component: Layout,
	children: [{
		path: '',
		component: () =>
			import('@/views/dashboard'),
		name: 'dashboard',
		meta: {
			title: 'dashboard',
			icon: 'home',

			// requireAuth:false
		}
	},

	],

},
{ //HR管理
	path: '/myPersonalIndex',
	component: Layout,
	name: 'myPersonalIndex',
	redirect: '/myPersonalIndex/myPersonal',
	meta: {
		title: 'myPersonal',
		icon: 'hr',
		noCache: true
	},
	children: [{
		// 最新需求
		path: 'myPersonal/nowDemand',
		name: 'nowDemand',
		component: () =>
			import('@/views/myPersonal/demand/nowDemand'),
		meta: {
			title: 'nowDemand',
			icon: 'new'
		}
	},
	{
		// 投递管理
		path: 'myPersonal/touJd',
		name: 'touJd',
		component: () =>
			import('@/views/myPersonal/demand/touJd'),
		meta: {
			title: 'touJd',
			icon: 'toudi'
		}
	},
	{
		// 暂未接通
		path: 'myPersonal/notConner',
		name: 'notConner',
		component: () =>
			import('@/views/myPersonal/demand/notConner'),
		meta: {
			title: 'notConner',
			icon: 'weijie'
		}
	},
	{
		// 审核管理
		path: 'myPersonal/articleEditIndex',
		name: 'articleEditIndex',
		component: () =>
			import('@/views/myPersonal/demand/articleEditIndex'),
		meta: {
			title: 'articleEditIndex',
			icon: 'shenhe'
		}
	},
	{
		// 数据录入
		path: 'myPersonal/dataImport',
		name: 'dataImport',
		component: () =>
			import('@/views/myPersonal/demand/dataImport'),
		meta: {
			title: 'dataImport',
			icon: 'shuju'
		}
	},

	]
},
{ //销售系统
	path: '/marketIndex',
	component: Layout,
	name: 'marketIndex',
	redirect: '/marketIndex/market',
	meta: {
		title: 'market',
		icon: 'xsgl'
	},
	children: [
		{
			path: 'market/telephoneRecord',
			name: 'telephoneRecord',
			component: () =>
				import('@/views/market/telephoneRecord'),
			meta: {
				title: 'telephoneRecord',
				icon: 'xsPhone',
				requireAuth: true,

			}
		},
		{
			path: 'market/myClient',
			name: 'myClient',
			component: () =>
				import('@/views/market/myClient'),
			meta: {
				title: 'myClient',
				icon: 'my',
				requireAuth: true,

			}
		},
		{
			path: 'market/allClient',
			name: 'allClient',
			component: () =>
				import('@/views/market/allClient'),
			meta: {
				title: 'allClient',
				icon: 'khgh',
				requireAuth: true

			}
		},
		{
			path: 'market/FollowUpRecord',
			name: 'FollowUpRecord',
			component: () =>
				import('@/views/market/FollowUpRecord'),
			meta: {
				title: 'FollowUpRecord',
				icon: 'gjjl',
			}
		},
		{
			path: 'market/contractImport',
			name: 'contractImport',
			component: () =>
				import('@/views/market/contractImport'),
			meta: {
				title: 'contractImport',
				icon: 'hetong',
			}
		},
		{
			path: 'market/Performance',
			name: 'Performance',
			component: () =>
				import('@/views/market/Performance'),
			meta: {
				title: 'Performance',
				icon: 'xs',
			}
		}
	]
},
{ //rpo系统
	path: '/resourceIndex',
	component: Layout,
	name: 'resourceIndex',
	redirect: '/resourceIndex/resource',
	meta: {
		title: 'resource',
		icon: 'shop'
	},
	children: [{
		path: 'resource/rpoProject',
		name: 'rpoProject',
		component: () =>
			import('@/views/editWrap/resource/rpoProject'),
		meta: {
			title: 'rpoProject',
			icon: 'rpoProject',
			requireAuth: true,

		}
	},
	{
		path: 'resource/rpoJd',
		name: 'rpoJd',
		component: () =>
			import('@/views/editWrap/resource/rpoJd'),
		meta: {
			title: 'rpoJd',
			icon: 'allJd',
			requireAuth: true

		}
	},
	{
		path: 'resource/upload',
		name: 'upload',
		component: () =>
			import('@/views/editWrap/resource/upload'),
		meta: {
			title: 'upload',
			icon: 'upSc',
		}
	}
	]
},
{ //账户管理
	path: '/administration',
	component: Layout,
	name: 'administrationIndex',
	redirect: '/administrationIndex/administration',
	meta: {
		title: 'administration',
		icon: 'admin'
	},
	children: [{
		path: 'administration/addPlson',
		name: 'addPlson',
		component: () =>
			import('@/views/administration/addPlson'),
		meta: {
			title: 'addPlson',
			icon: 'addPlson',
			requireAuth: true,

		}
	},
	{
		path: 'administration/deletePlson',
		name: 'deletePlson',
		component: () =>
			import('@/views/administration/deletePlson'),
		meta: {
			title: 'deletePlson',
			icon: 'delePlsoin',
			requireAuth: true

		}
	},
	{
		path: 'administration/Jurisdiction',
		name: 'Jurisdiction',
		component: () =>
			import('@/views/administration/Jurisdiction'),
		meta: {
			title: 'Jurisdiction',
			icon: 'Jurisdiction',
			requireAuth: true

		}
	}
	]
},
{
	path: '/problem',
	component: Layout,
	children: [{
		path: '',
		component: () =>
			import('@/views/problem'),
		name: 'problem',
		meta: {
			title: 'problem',
			icon: 'winfo',

			// requireAuth:false
		}
	}],
},
/**
 *  404
 **/
{
	path: '*',
	redirect: '/404',
	hidden: true
}
];

export default new VueRouter({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

export const asyncRouterMap = []