export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        component: './user/Login',
      },
      {
        path: '/user/register',
        component: './user/Register',
      },
      {
        name: '个人设置',
        icon: 'smile',
        path: '/user/settings',
        component: './user/AccountSettings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理页',
        icon: 'smile',
        component: './Admin/UserManage',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: '查询课程',
    icon: 'smile',
    path: '/course/list',
    component: './course/CourseList',
  },
  {
    name: '分析页',
    icon: 'smile',
    path: '/dashboardanalysis',
    component: './DashboardAnalysis',
  },
  {
    component: './404',
  },
];
