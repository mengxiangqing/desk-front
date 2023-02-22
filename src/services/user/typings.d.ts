// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id: number;
    username: string;
    userAccount: string;
    title: string;
    grade: number;
    gender: number;
    userStatus: number;
    userRole: number;
    birth: string;
    college: string;
    stuClass: string;
    createTime: Date;
    updateTime: Date;
    email?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type RegisterResult = number;
  type UpdateUserResult = number;

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: String;
    type?: string;
  };

  type UpdateUserParams = {
    remark?: string;
    email?: string;
    phone?: string;
    gender?: number
  };
  type DeleteUserParam  = number;


  type SearchUser = {
    username: string;
    userAccount: number;
  }

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };


}
