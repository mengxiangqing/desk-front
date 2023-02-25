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

  type PageData<T> = {
    total: number;
    current: number;
    pages: number;
    size: number;
    records: T[];
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
    gender?: number;
  };
  type DeleteUserParam = number;

  type SearchUser = {
    username: string;
    userAccount: number;
  };

  type SearchCourseParam = {
    courseName: string;
    courseNumber: string;
    teacher: number;
  };
  type Course = {
    id: number;
    courseNumber: string;
    courseName: string;
    teachingTime: string;
    college: string;
    phone: string;
    teacher: number;
    teacherNum: string;
    teacherName: string;
    classroomId: number;
    chooseNum: number;
    startWeek: number;
    endWeek: number;
    averageUpRate: number;
    averageAttendRate: number;
    averageFrontRate: number;
    createTime: Date;
    updateTime: date;
    createUser: number;
    updateUser: number;
    remark: string;
  };

  type ClassRoom = {
    id: number;
    roomName: string;
    capacity: number;
    humans: number;
    address: string;
    roomStatus: number;
    seatRate: number;
    updateTime: Date;
  };

  type SearchClassRoomParam = {
    roomName: string;
    seatRate: number;
    address: string[];
    roomStatus: number;
    sort: string;
    filter: string[];
  };

  type getSingleClassDetailParam = {
    singleClassId: number;
    courseId: number;
  };

  type CourseDetailResult = {
    // id: number;
    courseId: number;
    // 最近一讲课堂指标
    latestUpRate: number;
    latestAttendRate: number;
    latestFrontRate: number;
    // 本月平均指标
    averageUpRateThisMonth: number;
    averageAttendRateThisMonth: number;
    averageFrontRateThisMonth: number;
    // 上月平均指标
    averageUpRateLastMonth: number;
    averageAttendRateLastMonth: number;
    averageFrontRateLastMonth: number;
    // 课程平均指标
    averageUpRate: number;
    averageAttendRate: number;
    averageFrontRate: number;

    courseData: string;
    averageData: string;
  };

  type SingleClassDetailResult = {
    id: number;
    courseId: number;
    classData: string;
  };

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
