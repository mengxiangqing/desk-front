// @ts-ignore
/* eslint-disable */
// @ts-ignore
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 搜索用户接口 POST /api/user/search */
export async function searchUsers(body: API.SearchUser, options?: { [key: string]: any }) {
  console.log(options);
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });

}

/** 搜索用户接口 POST /api/user/teacher */
export async function searchTeachers(body: API.SearchUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/teacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息接口 POST /api/user/update */
export async function updateUser(body: API.UpdateUserParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.UpdateUserResult>>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户信息接口 POST /api/user/delete */
export async function deleteUser(body: number) {
  return request<API.BaseResponse<number>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索课程接口 POST /api/course/search */
export async function searchCourses(body: API.SearchCourseParam, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageData<API.Course[]>>>('/api/course/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户已选课程列表 POST /api/course/selected */
export async function selectedCourses(body: API.SearchCourseParam, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageData<API.Course[]>>>('/api/course/selected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课程详细信息接口 POST /api/course/detail */
export async function getCourseDetail(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CourseDetailResult>>('/api/course/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取某一讲课详细信息接口 POST /api/class/getRate */
export async function getSingleClassDetail(
  body: API.getSingleClassDetailParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse<API.SingleClassDetailResult>>('/api/class/getRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索教室接口 POST /api/room/search */
export async function searchClassRooms(
  body: API.SearchClassRoomParam,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse<API.ClassRoom[]>>('/api/room/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置教室状态接口 POST /api/room/set */
export async function setRoomState(
  body: API.RoomState,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse<number>>('/api/room/set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 删除课程接口 POST /api/course/delete */
export async function deleteCourse(body: number) {
  return request<API.BaseResponse<number>>('/api/course/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 选择课程接口 POST /api/course/select */
export async function selectCourse(body: number) {
  return request<API.BaseResponse<number>>('/api/course/select', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 取消选择课程接口 POST /api/course/cancel */
export async function cancelSelectCourse(body: number) {
  return request<API.BaseResponse<number>>('/api/course/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 添加课程接口 POST /api/course/add */
export async function addCourse(body: API.CourseAddParam) {
  return request<API.BaseResponse<number>>('/api/course/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}


