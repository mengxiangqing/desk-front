import {PageContainer} from '@ant-design/pro-components';
import {Alert, Card} from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎使用本平台'}
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
