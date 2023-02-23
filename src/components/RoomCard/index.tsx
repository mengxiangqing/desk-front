import { StatisticCard } from "@ant-design/pro-components";
import { Progress } from "antd";

type StatisticCardProps = {
  roomName: string;
  seatRate: number;
  human: number;
  capacity: number;
};

export default ({ roomName, seatRate, human,capacity }: StatisticCardProps) => {
  return (
    <StatisticCard
      statistic={{
        title: "教室入座情况",
        value: human+"/"+capacity,
      }}
      chart={
        <Progress
          type="circle"
          percent={seatRate}
          format={percent => `${percent}%`}
          width={80}
          strokeColor={{
            "0%": "green",
            "50%": "yellow",
            "100%": "red",
          }}

        />
      }
      chartPlacement="right"
      footer={
        <div
          style={{
            color: "#001529",
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          {roomName}
        </div>
      }
    />
  );
};
