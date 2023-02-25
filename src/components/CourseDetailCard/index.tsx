import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';
import { Radar } from '@ant-design/charts';
import { Line } from '@ant-design/plots';

import { Modal } from 'antd';
import { getCourseDetail, getSingleClassDetail } from '@/services/api';

let classId: number = 0;
const CourseDetailCard: ({ course }: { course: any }) => JSX.Element = ({
  course,
}: {
  course: any;
}) => {
  const [responsive, setResponsive] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);
  useEffect(() => {
    async function fetchData() {
      // @ts-ignore
      const result = await getCourseDetail(course);

      // @ts-ignore
      setCourseDetail(result);
    }

    fetchData();
  }, [course]);

  if (!courseDetail) {
    return <div>暂无课程详细数据，等待课程更新中……</div>;
  }

  // @ts-ignore
  const courseId = courseDetail.courseId;
  // @ts-ignore
  const latestUpRate = courseDetail.latestUpRate;
  // @ts-ignore
  const latestAttendRate = courseDetail.latestAttendRate;
  // @ts-ignore
  const latestFrontRate = courseDetail.latestFrontRate;
  // @ts-ignore
  const averageUpRateThisMonth = courseDetail.averageUpRateThisMonth;
  // @ts-ignore
  const averageAttendRateThisMonth = courseDetail.averageAttendRateThisMonth;
  // @ts-ignore
  const averageFrontRateThisMonth = courseDetail.averageFrontRateThisMonth;
  // @ts-ignore
  const averageUpRateLastMonth = courseDetail.averageUpRateLastMonth;
  // @ts-ignore
  const averageAttendRateLastMonth = courseDetail.averageAttendRateLastMonth;
  // @ts-ignore
  const averageFrontRateLastMonth = courseDetail.averageFrontRateLastMonth;
  // @ts-ignore
  const averageUpRate = courseDetail.averageUpRate;
  // @ts-ignore
  const averageAttendRate = courseDetail.averageAttendRate;
  // @ts-ignore
  const averageFrontRate = courseDetail.averageFrontRate;
  // @ts-ignore
  const courseData = courseDetail.courseData;
  // @ts-ignore
  const averageData = courseDetail.averageData;

  const DemoDualAxes = ({ classData }: { classData: any }) => {
    if (!classData) {
      return <div>暂无课程详细数据，等待课程更新中……</div>;
    }

    const config = {
      data: JSON.parse(classData),
      xField: 'time',
      yField: 'rate',
      seriesField: 'name',
      yAxis: {
        min: 0,
        max: 100,
        label: {
          formatter: (v: any) => `${v}%`,
        },
      },
      color: ['#1979C9', '#D62A0D', '#FAA219'],
    };

    return <Line {...config} />;
  };
  const { Statistic } = StatisticCard;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const CourseRadar = ({ averageData }: { averageData: any }) => {
    const config = {
      data: JSON.parse(averageData),
      xField: 'name',
      yField: 'rate',
      width: 200,
      height: 200,
      appendPadding: [0, 10, 0, 10],
      meta: {
        rate: {
          alias: '百分比',
          // suffix: '%',
          min: 0,
          nice: true,
          // formatter: (v: any) => Number(v).toFixed(2),
        },
      },
      xAxis: {
        tickLine: null,
      },
      yAxis: {
        label: null,
        grid: {
          alternateColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
      // 开启辅助点
      point: {
        size: 4,
      },
      area: {},
    };
    // @ts-ignore
    return <Radar {...config} />;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const RateDualAxes = ({ courseData }: { courseData: any }) => {
    // ECharts实例的ref
    const onReadyLine = (plot: {
      on: (arg0: string, arg1: { (...args: any[]): void; (...args: any[]): void }) => void;
    }) => {
      let hoverData: any[] = []; // 声明 hoverData 的类型为一个数组类型
      // plot 添加点击事件,整个图表区域
      plot.on('plot:click', (...args) => {
        // console.log(hoverData);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (hoverData && hoverData.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleTooltip(hoverData);
        }
      });
      // 副标变化时 触发事件
      plot.on('tooltip:change', (...args) => {
        // hoverData = args[0].data.title;
        hoverData = args;
      });
    };
    const handleTooltip = async (datum: { data: { title: any } }[]) => {
      classId = datum[0].data.title;
      const classResult = await getSingleClassDetail({
        classId,
        course,
      } as unknown as API.getSingleClassDetailParam);
      // console.log(classResult);
      let classData;
      if (classResult) {
        // @ts-ignore
        classData = classResult.classData;
      }

      // 在这里打开弹窗，并将饼图数据传递给弹窗组件
      Modal.info({
        title: '课程第' + classId + '讲详细数据',
        content: <DemoDualAxes classData={classData} />,
        closable: true, //右上角关闭按钮
        //点击蒙层是否允许关闭
        maskClosable: true,
        centered: true,
        okButtonProps: { style: { display: 'none' } },
        width: 800,
        style: { marginRight: '15px' },
      });
    };
    // @ts-ignore
    const config = {
      data: JSON.parse(courseData),
      xField: 'time',
      yField: 'rate',
      seriesField: 'name',
      autoFit: true,
      limitInPlot: true,
      smooth: true,
      yAxis: {
        min: 0,
        max: 100,
        label: {
          formatter: (v: any) => `${v}%`,
        },
        line: {
          style: {
            stroke: '#000000',
            lineWidth: 3,
          },
        },
      },
      nice: true,
      color: ({ name }: { name: string }) => {
        return name === '抬头率' ? '#F4664A' : name === '出勤率' ? '#30BF78' : '#FAAD14';
      },
      lineStyle: ({ name }: { name: string }) => {
        if (name === '前排率') {
          return {
            lineDash: [4, 4],
            opacity: 75,
          };
        } else if (name === '出勤率') {
          return {
            lineDash: [10, 10],
            opacity: 10,
          };
        }
        return {
          opacity: 50,
        };
      },
      xAxis: {
        line: {
          style: {
            stroke: '#000000',
            lineWidth: 3,
          },
        },
        label: {
          formatter: (value: number) => value,
        },
        min: 0,
        // max: 50,
        title: {
          text: '课程第N讲',
        },
      },
    };
    // @ts-ignore
    return <Line {...config} onReady={onReadyLine} />;
  };
  return (
    <RcResizeObserver.Collection
      key="resize-observer"
      // @ts-ignore
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="数据概览"
        extra={`${new Date().getFullYear()}年${
          new Date().getMonth() + 1
        }月${new Date().getDate()}日 星期${'日一二三四五六'[new Date().getDay()]} `}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="vertical">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '最近课堂抬头率',
                  value: latestUpRate.toFixed(2) + '%',
                  description: (
                    <Statistic
                      title="较本月平均"
                      value={Math.abs(latestUpRate - averageUpRateThisMonth).toFixed(2)}
                      suffix={'%'}
                      trend={latestUpRate > averageUpRateThisMonth ? 'up' : 'down'}
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月平均抬头率',
                  value: averageUpRateThisMonth.toFixed(2) + '%',
                  description: (
                    <Statistic
                      title="较上月"
                      value={Math.abs(averageUpRateLastMonth - averageUpRateThisMonth).toFixed(2)}
                      suffix={'%'}
                      trend={averageUpRateLastMonth < averageUpRateThisMonth ? 'up' : 'down'}
                    />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '最近课堂出勤率',
                  value: latestAttendRate.toFixed(2) + '%',
                  description: (
                    <Statistic
                      title="较本月平均"
                      value={Math.abs(latestAttendRate - averageAttendRateThisMonth).toFixed(2)}
                      suffix={'%'}
                      trend={latestAttendRate > averageAttendRateThisMonth ? 'up' : 'down'}
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月平均出勤率',
                  value: averageAttendRateThisMonth.toFixed(2) + '%',
                  description: (
                    <Statistic
                      title="较上月"
                      value={Math.abs(
                        averageAttendRateLastMonth - averageAttendRateThisMonth,
                      ).toFixed(2)}
                      suffix={'%'}
                      trend={
                        averageAttendRateLastMonth < averageAttendRateThisMonth ? 'up' : 'down'
                      }
                    />
                  ),
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard title="课程平均指标" chart={<CourseRadar averageData={averageData} />} />
        </ProCard>
      </ProCard>
      <StatisticCard
        title="课程每讲平均指标"
        chart={<RateDualAxes courseData={courseData} />}
        tooltip="点击折线图可查看某一讲的详细数据"
      />
    </RcResizeObserver.Collection>
  );
};
export default CourseDetailCard;
