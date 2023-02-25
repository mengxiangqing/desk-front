import { DatabaseOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { Progress } from 'antd';
import RcResizeObserver from 'rc-resize-observer';

const { Statistic, Divider } = StatisticCard;

export default ({ course }: { course: API.Course }) => {
  // console.log(courseName);
  // console.log(courseName, upRate, attendRate, frontRate)

  const progressWidth = 80;
  /*display: flex 将 <StatisticCard> 转为弹性容器，
    justify-content: center 将其内部元素水平居中，
    align-items: center 将其内部元素垂直居中。*/
  return (
    <div>
      <RcResizeObserver key="resize-observer">
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              // title: "课程",
              prefix: <DatabaseOutlined />,
              value: `《${course.courseName}》`,
              valueStyle: { fontSize: '20px' },
              description: (
                <>
                  <Statistic
                    title={`   \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0课程号：${course.courseNumber}`}
                    value={' '}
                  />

                  {/*<Statistic*/}
                  {/*  title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0授课时间：${course.teachingTime}`}*/}
                  {/*  value={" "}*/}
                  {/*/>*/}
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0上课时间：${course.startWeek} - ${course.endWeek} 周`}
                    value={' '}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0所属学院：${course.college}`}
                    value={' '}
                  />
                </>
              ),
            }}
          />
          <Divider type={'vertical'} />
          <StatisticCard
            statistic={{
              title: '平均抬头率',
              value: course.averageUpRate.toFixed(2),
              suffix: '%',
              // description: <Statistic title="占比" value="61.5%"/>,
            }}
            chart={
              <Progress
                type="dashboard"
                percent={course.averageUpRate.toFixed(2)}
                format={(percent) => (percent >= 70 ? `高` : percent >= 40 ? '中' : '低')}
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={'#27f15f'}
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '平均到课率',
              value: course.averageAttendRate.toFixed(2),
              suffix: '%',
              // description: <Statistic title="占比" value="38.5%"/>,
            }}
            chart={
              <Progress
                type="dashboard"
                percent={course.averageAttendRate.toFixed(2)}
                format={(percent) => (percent >= 85 ? `高` : percent >= 50 ? '中' : '低')}
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={'#1890ff'}
              />
            }
            chartPlacement="left"
          />{' '}
          <StatisticCard
            statistic={{
              title: '平均前排率',
              value: course.averageFrontRate.toFixed(2),
              suffix: '%',
              // description: <Statistic title="占比" value="38.5%"/>,
            }}
            chart={
              <Progress
                type="dashboard"
                percent={(course.averageFrontRate * 2).toFixed(2)}
                format={(percent) => (percent >= 30 ? `高` : percent >= 15 ? '中' : '低')}
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={{
                  '0%': 'green',
                  '50%': 'yellow',
                  '100%': 'red',
                }}
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </RcResizeObserver>
    </div>
  );
};
