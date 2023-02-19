export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },

  {
    name:'分析',
    icon: 'smile',
    path: '/dashboardanalysis',
    component: './DashboardAnalysis',
  },

  {
    name:'监控',
    icon: 'smile',
    path: '/dashboardmonitor',
    component: './DashboardMonitor',
  },
  {
    name: '工作台',
    icon: 'smile',
    path: '/dashboardworkplace',
    component: './DashboardWorkplace',
  },
  {
    component: './404',
  },
];
