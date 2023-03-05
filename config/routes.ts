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
        component: './404',
      },
    ],
  },

  {
    icon: 'icon-yonghu',
    name: '用户中心',
    path: '/account',
    routes: [
      {
        name: '个人设置',
        icon: 'smile',
        path: '/account/settings',
        component: './user/AccountSettings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/teacher',
    name: '我的课程',
    access: 'teacher',
    icon: 'icon-kecheng',
    component: './course/CourseList',
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
    name: '系统管理',
    access: 'canAdmin',
    icon: 'icon-guanliyuan_jiaoseguanli',
    path: '/admin',
    routes: [
      {
        name: '用户管理',
        path: '/admin/user-manage',
        component: './Admin/UserManage',
      },
      {
        name: '课程管理',
        path: '/admin/course-manage',
        component: './course/CourseList',
      },
      {
        name: '教室管理',
        path: '/admin/room-manage',
        component: './Room/RoomList',
      },
    ],
  },
  {
    name: '已选课程',
    access: 'student',
    icon: 'icon-kecheng',
    path: '/course/selected',
    component: './course/SelectList',
  },
  {
    name: '查询教室',
    access: 'student',
    icon: 'icon-kongjiaoshichaxun-01',
    path: '/room/list',
    component: './Room/RoomList',
  },
  {
    name: '查询教师',
    // access: 'student',
    icon: 'team',
    path: '/teacher/list',
    component: './Teacher/TeacherList',
  },
  {
    name: '查询课程',
    icon: 'icon-kecheng',
    // access: 'student',
    path: '/course/list',
    component: './course/CourseList',
  },
  // {
  //   name: '教师督导',
  //   access: 'monitor',
  //   icon: 'team',
  //   path: '/teacher/list',
  //   component: './Teacher/TeacherList',
  // },
  // {
  //   name: '课程督导',
  //   icon: 'icon-kecheng',
  //   access: 'monitor',
  //   path: '/course/list',
  //   component: './course/CourseList',
  // },

  {
    component: './404',
  },
];
