/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 4,
    student: currentUser && currentUser.userRole === 1,
    teacher: currentUser && currentUser.userRole === 2,
    monitor: currentUser && currentUser.userRole === 3,
  };
}
