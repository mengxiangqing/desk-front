import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '山东大学（威海）超算中心出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'class-room',
          title: '教室智能助理',
          href: 'http://msg.wh.sdu.edu.cn:9005/zhjs-zdb-menuv2.html',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/mengxiangqing/desk-front',
          blankTarget: true,
        },
        {
          key: 'blog',
          title: '个人博客',
          href: 'https://502339606.xyz',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
