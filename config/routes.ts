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
    path: '/',
    redirect: '/welcome',
  },
  {
    name: '查询课程',
    icon: 'icon-kecheng',
    path: '/course/list',
    component: './course/CourseList',
  },
  {
    name: "系统管理",
    access: 'canAdmin',
    icon: 'icon-guanliyuan_jiaoseguanli',
    routes:
      [

        {
          name: '用户管理',
          icon: 'icon-guanliyuan_jiaoseguanli',
          access: 'canAdmin',
          path: '/admin/user-manage',
          component: './Admin/UserManage',
        },
        {
          name: '课程管理',
          icon: 'icon-kecheng',
          path: '/course/list',
          component: './course/CourseList',
        },
      ]


  }
  ,
  {
    name: '查询教室',
    icon: 'icon-kongjiaoshichaxun-01',
    path: '/room/list',
    component: './Room/RoomList',
  },
  {
    name: '查询教师',
    icon: 'team',
    path: '/teacher/list',
    component: './Teacher/TeacherList',
  },
  {
    component: './404',
  },
];
