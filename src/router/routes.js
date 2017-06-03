
export default [
  {
    path: '/',
    meta: {auth: false},
    component: resolve => require(['../components/Login'], resolve)
  },
  {
    path: '/login',
    meta: {auth: false},
    component: resolve => require(['../components/Login'], resolve)
  },
  {
    path: '/home',
    meta: {auth: true},
    component: resolve => require(['../components/Home'], resolve),
    children: [
      {
        path: 'machines',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Machines'], resolve)
      },
	    {
        path: 'project',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Project'], resolve)
      },
	    {
        path: 'image',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Image'], resolve)
      },
	    {
        path: 'manage',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Manages'], resolve)
      },
	    {
        path: 'switch',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Switch'], resolve)
      },
	    {
        path: 'approve',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Approve'], resolve)
      },
      {
        path: 'machinedetail',
        meta: {auth: true},
        component: resolve => require(['../components/contents/Machine_detail'], resolve)
      }
    ]
  },
  {
    path: '*',
    meta: {auth: false},
    component: resolve => require(['../components/Login'], resolve)
  },
]

