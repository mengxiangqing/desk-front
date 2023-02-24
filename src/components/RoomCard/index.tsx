import {StatisticCard} from '@ant-design/pro-components';
import {Progress} from 'antd';

type StatisticCardProps = {
  roomName: string;
  seatRate: number;
  human: number;
  capacity: number;
};

export default ({roomName, seatRate, human, capacity}: StatisticCardProps) => {
  /*display: flex 将 <StatisticCard> 转为弹性容器，
    justify-content: center 将其内部元素水平居中，
    align-items: center 将其内部元素垂直居中。*/
  return (
    <StatisticCard
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      statistic={{
        title: '教室入座情况',
        value: human + '/' + capacity,
      }}
      chart={
        <Progress
          type="circle"
          percent={seatRate}
          format={(percent) => `${percent}%`}
          width={80}
          strokeColor={{
            '0%': 'green',
            '50%': 'yellow',
            '100%': 'red',
          }}
        />
      }
      chartPlacement="right"
      footer={
        <div
          style={{
            color: '#001529',
            fontWeight: 'bold',
            fontSize: '24px',
            textAlign: 'center',
          }}
        >
          {roomName}
        </div>
      }
    />
  );
};
