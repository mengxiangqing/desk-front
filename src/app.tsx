import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/api';

export const request: RequestConfig = {
  timeout: 10000, //超时的时间
};

/**
 * 从命令行提取参数
 */
// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * 无需跳转登录页面的页面
 */
const NO_NEED_LOGIN_PAGES = ['/user/register', loginPath];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
  // loading: false
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  if (NO_NEED_LOGIN_PAGES.includes(location.pathname)) {
    // 如果是白名单页面，执行
    return {
      // @ts-ignore
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
  const currentUser = await fetchUserInfo();

  // console.log(currentUser);
  return {
    // @ts-ignore
    fetchUserInfo,
    // @ts-ignore
    currentUser,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout: ({
  initialState,
  setInitialState,
}: {
  initialState: any;
  setInitialState: any;
}) => {
  childrenRender: (
    children: any,
    props: { location: { pathname: string | string[] } },
  ) => JSX.Element;
  waterMarkProps: { content: string | undefined };
  rightContentRender: () => JSX.Element;
  disableContentMargin: boolean;
  footerRender: () => JSX.Element;
  pageTitleRender: boolean;
  onPageChange: () => void;
  menuHeaderRender: boolean;
  iconfontUrl: string;
} = ({ initialState, setInitialState }) => {
  return {
    pageTitleRender: false,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },

    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (NO_NEED_LOGIN_PAGES.includes(location.pathname)) {
        return;
      }
      if (!initialState?.currentUser) {
        // 如果没有登录，重定向到 login
        history.push(loginPath);
      }
    },
    menuHeaderRender: false,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[] } }) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
