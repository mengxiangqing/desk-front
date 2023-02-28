import {setRoomState} from '@/services/api';
import {StatisticCard} from '@ant-design/pro-components';
import {Form, message, Progress, Select} from 'antd';
import moment from 'moment';
import access from "@/access";
import {getInitialState} from "@/app";

const FormItem = Form.Item;
const {Option} = Select;
const acc = access(await getInitialState());
type StatisticCardProps = {
  id: number;
  roomName: string;
  seatRate: number;
  human: number;
  capacity: number;
  updateTime: Date;
  roomState: number
};

export default ({id, roomName, seatRate, human, capacity, updateTime, roomState}: StatisticCardProps) => {
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
          <br/>


          {acc.canAdmin ?
            <FormItem label="设置开放状态" name="roomStatus">
              <Select
                placeholder={roomState === 0 ? "空闲" : roomState === 1 ? "有课" : "关闭"}
                key="statusOps"
                style={{maxWidth: 128, width: '100%'}}
                onChange={async (value) => {
                  const roomStatus: number = value
                  console.log(value);
                  // 发送请求
                  await setRoomState({id, roomStatus} as unknown as API.RoomState);
                  message.success('修改教室状态成功');
                }}
              >
                <Option value={0}>空闲</Option>
                <Option value={1}>有课</Option>
                <Option value={2}>关闭</Option>
              </Select>
            </FormItem> : ""}
          <div style={{position: 'absolute', bottom: 5, right: 10, fontWeight: 15, fontSize: 13}}>
            {timeDiff}更新
          </div>
        </>
      }
    />
  );
};
