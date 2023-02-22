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
export async function searchUsers(body:API.SearchUser,options?: { [key: string]: any }) {
  console.log(options)
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data:body,
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
}/** 删除用户信息接口 POST /api/user/delete */
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
export async function searchCourses(body:API.SearchCourseParam,options?: { [key: string]: any }) {
  console.log(options)
  return request<API.BaseResponse<API.Course[]>>('/api/course/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data:body,
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

