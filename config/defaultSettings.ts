import {Settings as LayoutSettings} from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '智能助理',
  pwa: false,
  logo: '/logo-left.png',
  iconfontUrl: '//at.alicdn.com/t/c/font_3917171_gcvvz16f1vt.js',
};


// {
//   "navTheme": "light",
//   "primaryColor": "#1890ff",
//   "layout": "mix",
//   "contentWidth": "Fluid",
//   "fixedHeader": true,
//   "fixSiderbar": true,
//   "pwa": false,
//   "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
//   "headerHeight": 48,
//   "splitMenus": true
// }

export default Settings;
