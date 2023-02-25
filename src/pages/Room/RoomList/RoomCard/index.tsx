import { StatisticCard } from '@ant-design/pro-components';
import { Progress } from 'antd';
import moment from 'moment';

type StatisticCardProps = {
  roomName: string;
  seatRate: number;
  human: number;
  capacity: number;
  updateTime: Date;
};

export default ({ roomName, seatRate, human, capacity, updateTime }: StatisticCardProps) => {
  /*display: flex 将 <StatisticCard> 转为弹性容器，
    justify-content: center 将其内部元素水平居中，
    align-items: center 将其内部元素垂直居中。*/

  const updateTimeMoment = moment(updateTime);
  const duration = moment.duration(moment().diff(updateTimeMoment));

  let timeDiff = '';
  if (duration.asDays() >= 1) {
    timeDiff = `${Math.floor(duration.asDays())} 天前`;
  } else if (duration.asHours() >= 1) {
    timeDiff = `${Math.floor(duration.asHours())} 小时前`;
  } else if (duration.asMinutes() >= 1) {
    timeDiff = `${Math.floor(duration.asMinutes())} 分钟前`;
  } else {
    timeDiff = `${Math.floor(duration.asSeconds())} 秒前`;
  }

  return (
    <StatisticCard
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
        <>
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
          <br />
          <div style={{ position: 'absolute', bottom: 5, right: 10, fontWeight: 15, fontSize: 13 }}>
            {timeDiff}更新
          </div>
        </>
      }
    />
  );
};
