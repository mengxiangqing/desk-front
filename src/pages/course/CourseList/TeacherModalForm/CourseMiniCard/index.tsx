import {DatabaseOutlined} from '@ant-design/icons';
import {StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const {Statistic, Divider} = StatisticCard;

export default ({course}: { course: API.Course }) => {
  // console.log(courseName);
  // console.log(courseName, upRate, attendRate, frontRate)

  /*display: flex 将 <StatisticCard> 转为弹性容器，
    justify-content: center 将其内部元素水平居中，
    align-items: center 将其内部元素垂直居中。*/
  return (
    <div>

      <RcResizeObserver
        key="resize-observer"
      >
        <StatisticCard.Group direction={"row"}>
          <StatisticCard
            statistic={{
              // title: "课程",
              prefix: <DatabaseOutlined/>,
              value: `《${course.courseName}》`,
              valueStyle: {fontSize: '16px'},
              description: (
                <>
                  <Statistic
                    title={`   \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0课程号：${course.courseNumber}`}
                    value={" "}
                  />

                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0选课人数：${course.chooseNum}`}
                    value={" "}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0授课时间：${course.teachingTime}`}
                    value={" "}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0上课时间：${course.startWeek} - ${course.endWeek} 周`}
                    value={" "}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0所属学院：${course.college}`}
                    value={" "}
                  />

                </>),
            }}
          />
          <Divider type={'vertical'}/>
          <StatisticCard
            statistic={{
              title: '抬头率',
              value: 3701928,
              description: <Statistic title="占比" value="61.5%"/>,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '到课率',
              value: 1806062,
              description: <Statistic title="占比" value="38.5%"/>,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          /> <StatisticCard
          statistic={{
            title: '前排率',
            value: 1806062,
            description: <Statistic title="占比" value="38.5%"/>,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        </StatisticCard.Group>

      </RcResizeObserver>

    </div>

  );
};
