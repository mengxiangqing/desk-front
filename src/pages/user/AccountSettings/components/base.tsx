import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

import styles from './BaseView.less';
import { useModel } from '@@/plugin-model/useModel';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={true}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { initialState, loading } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const getAvatarURL = () => {
    if (currentUser) {
      // if (currentUser.avatar) {
      //   return currentUser.avatar;
      // }
      return '/logo.svg';
    }
    return '/logo.svg';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'inherit',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                name: currentUser?.username,
                phone: currentUser?.phone,
                email: currentUser?.email,
                number: currentUser?.userAccount,
                college: currentUser?.college,
              }}
              hideRequiredMark
            >
              <ProFormText width="md" name="number" label="学工号" />
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                width="md"
                name="profile"
                label="个人简介"
                rules={[
                  {
                    required: false,
                    message: '请输入个人简介!',
                  },
                ]}
                placeholder="个人简介"
              />

              <ProFormText
                width="md"
                name="college"
                label="所属学院"
                rules={[
                  {
                    required: true,
                    message: '请输入您的学院!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                width="md"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                ]}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
