import {FundFilled, TagFilled} from '@ant-design/icons';
import {ModalForm, StatisticCard} from '@ant-design/pro-components';
import {Progress} from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import {useState} from 'react';
import CourseDetailCard from '../../CourseDetailCard';

const {Statistic, Divider} = StatisticCard;
export default ({course}: { course: API.Course }) => {
  const progressWidth = 80;
  const [visible, setVisible] = useState(false);

  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
  };


  return (
    <div>
      <RcResizeObserver key="resize-observer">
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              title: '课程概览',
              prefix: <TagFilled/>,
              suffix: <FundFilled onClick={handleButtonClick}/>,
              value: `《${course.courseName}》`,
              valueStyle: {fontSize: '20px'},
              description: (
                <>
                  <Statistic
                    title={`   \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0课程号：${course.courseNumber}`}
                    value={' '}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0上课时间：第${course.startWeek} - ${course.endWeek} 周`}
                    value={' '}
                  />
                  <Statistic
                    title={`    \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0所属学院：${course.college}`}
                    value={' '}
                  />
                </>
              ),
            }}
          >

            <ModalForm
              title="课程详情"
              // trigger={<a>点击此处查看课程性情</a>}
              visible={visible}
              onVisibleChange={setVisible}
              onFinish={handleSubmit}
              submitter={{
                render: (props, defaultDoms) => {
                  return [];
                },
              }}
              modalProps={{
                destroyOnClose: true,
                onCancel: handleClose,
                // maskClosable: false
              }}
            >
              {/*向数据卡片传递课程ID*/}
              <CourseDetailCard course={course.id}/>
            </ModalForm>
          </StatisticCard>

          <Divider type={'vertical'}/>
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
                percent={Number(course.averageUpRate.toFixed(2))}
                format={(percent) =>
                  percent !== undefined && percent >= 70
                    ? `高`
                    : percent !== undefined && percent >= 40
                      ? '中'
                      : '低'
                }
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={'#9AA690'}
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
                percent={Number(course.averageAttendRate.toFixed(2))}
                format={(percent) =>
                  percent !== undefined && percent >= 85
                    ? `高`
                    : percent !== undefined && percent >= 50
                      ? '中'
                      : '低'
                }
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={'#91AD9E'}
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
                percent={Number(course.averageFrontRate.toFixed(2))}
                format={(percent) =>
                  percent !== undefined && percent >= 30
                    ? `高`
                    : percent !== undefined && percent >= 15
                      ? '中'
                      : '低'
                }
                strokeLinecap="square"
                strokeWidth={15}
                width={progressWidth}
                strokeColor={'#CEB797'}
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </RcResizeObserver>
    </div>
  );
};
