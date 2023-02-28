import {PageContainer} from '@ant-design/pro-components';
import {Alert, Card} from 'antd';
import React from 'react';
import {getInitialState} from "@/app";

const {currentUser} = await getInitialState();

const Welcome: React.FC = () => {
  console.log(currentUser);
  // @ts-ignore
  const username = currentUser.username;
  console.log(username);
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎用户: '+username}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />

      </Card>
    </PageContainer>
  );
};
export default Welcome;
