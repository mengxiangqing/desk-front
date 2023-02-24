import {ProCard, StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useState} from 'react';
import {DualAxes, Radar} from '@ant-design/charts';
import {Modal} from 'antd';

const DemoDualAxes = () => {
  const data = [
    {
      year: '1991',
      value: 3,
      count: 10,
    },
    {
      year: '1992',
      value: 4,
      count: 4,
    },
    {
      year: '1993',
      value: 3.5,
      count: 5,
    },
    {
      year: '1994',
      value: 5,
      count: 5,
    },
    {
      year: '1995',
      value: 4.9,
      count: 4.9,
    },
    {
      year: '1996',
      value: 6,
      count: 35,
    },
    {
      year: '1997',
      value: 7,
      count: 7,
    },
    {
      year: '1998',
      value: 9,
      count: 1,
    },
    {
      year: '1999',
      value: 13,
      count: 20,
    },
  ];
  const config = {
    data: [data, data],
    xField: 'year',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };
  return <DualAxes {...config} />;
};
const {Statistic} = StatisticCard;

const CourseRadar = () => {

  const averageData = [
    {
      name: '听讲状态',
      rate: 86.5,
    },
    {
      name: '出勤比例',
      rate: 90.1,
    },
    {
      name: '前排情况',
      rate: 40.2,
    },
  ];
  const config = {

    data: averageData,
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


const RateDualAxes = () => {
// ECharts实例的ref
  const onReadyLine = (plot: { on: (arg0: string, arg1: { (...args: any[]): void; (...args: any[]): void; }) => void; }) => {
    let hoverData: any;
    // plot 添加点击事件,整个图表区域
    plot.on('plot:click', (...args) => {
      console.log(hoverData);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTooltip(hoverData)
    });

    plot.on('tooltip:change', (...args) => {
      // hoverData = args[0].data.title;
      hoverData = args

    });

  }
  const handleTooltip = (datum: { data: { title: any; }; }[]) => {
    const NumOfCourse = datum[0].data.title
    // 在这里打开弹窗，并将饼图数据传递给弹窗组件
    Modal.info({
      title: '课程第' + NumOfCourse + '讲详细数据',
      content: <DemoDualAxes/>,
      closable: true,//右上角关闭按钮
      //点击蒙层是否允许关闭
      maskClosable: true,
      centered: true,
      okButtonProps: {style: {display: 'none'}},
      width: 752,
    });


  };
  const courseData = [
    {
      time: 0,
      attendRate: 10,
      upRate: 4,
      attendName: '到课率',
      upName: '抬头率'
    },
    {
      time: 25,
      attendRate: 52,
      upRate: 49,
      attendName: '到课率',
      upName: '抬头率'
    },
    {
      time: 30,
      attendRate: 65,
      upRate: 34,
      attendName: '到课率',
      upName: '抬头率'
    },
    {
      time: 35,
      attendRate: 85,
      upRate: 43,
      attendName: '到课率',
      upName: '抬头率'
    },
    {
      time: 40,
      attendRate: 99,
      upRate: 98,
      attendName: '到课率',
      upName: '抬头率'
    },
    {
      time: 45,
      attendRate: 20,
      upRate: 45,
      attendName: '到课率',
      upName: '抬头率'
    },
  ];


  const config = {
    data: [courseData, courseData],
    xField: 'time',
    yField: ['attendRate', 'upRate'],
    autoFit: true,
    // height: 200,
    limitInPlot: true,
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => handleTooltip(datum),
    },

    geometryOptions: [

      {
        geometry: 'line',
        seriesField: 'attendName',
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        tooltip: {
          formatter: (datum: any) => {
            return {
              name: datum.attendName,
              value: `${datum.attendRate}%`,
              data: courseData
            };
          },
        },
        smooth: true,
        // point: {},
      },
      {
        geometry: 'line',
        seriesField: 'upName',
        // point: {},
        smooth: true,
        tooltip: {
          formatter: (datum: any) => {
            return {
              name: datum.upName,
              value: `${datum.upRate}%`,
              data: courseData
            };
          },
        },
      },
    ],
    yAxis: [
      {
        label: {
          formatter: (value: any) => {
            return `${value}%`;
          },
        },
        // title: {
        //   text: '比率',
        // },
        min: 0,
        max: 100,
        line: {
          style: {
            stroke: '#fcdada',
            lineWidth: 2,
          },
        },
      },
      {
        visible: false,
        min: 0,
        max: 100
      }
    ],
    xAxis: {
      label: {
        formatter: (value: number) => `${value}`,
      },
      // min: 0,
      // max: 50,
      title: {
        text: '课程第N讲',
      },
    },

  };
  // @ts-ignore
  return <DualAxes {...config} onReady={onReadyLine}/>;
};
export default (course: { course: any; }) => {
  console.log("课程号");
  console.log(course.course);
  const [responsive, setResponsive] = useState(false);
  const upRate = 86.52;
  const averageUpRateThisMonth = 88.02;
  const averageUpRateLastMonth = 85.02;
  const attendRate = 98;
  const averageAttendRateThisMonth = 78.02;
  const averageAttendRateLastMonth = 85.02;
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
        extra={`${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日 星期${'日一二三四五六'[new Date().getDay()]} `}
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
                  value: upRate + '%',
                  description: <Statistic title="较本月平均" value={Math.abs(upRate - averageUpRateThisMonth).toFixed(2)}
                                          suffix={'%'}
                                          trend={upRate > averageUpRateThisMonth ? "up" : "down"}/>,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月平均抬头率',
                  value: averageUpRateThisMonth + '%',
                  description: <Statistic title="较上月"
                                          value={Math.abs(averageUpRateLastMonth - averageUpRateThisMonth).toFixed(2)}
                                          suffix={'%'}
                                          trend={averageUpRateLastMonth < averageUpRateThisMonth ? "up" : "down"}/>,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '最近课堂出勤率',
                  value: attendRate + '%',
                  description: <Statistic title="较本月平均"
                                          value={Math.abs(attendRate - averageAttendRateThisMonth).toFixed(2)}
                                          suffix={'%'}
                                          trend={attendRate > averageAttendRateThisMonth ? "up" : "down"}/>,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月平均出勤率',
                  value: averageAttendRateThisMonth + '%',
                  description: <Statistic title="较上月"
                                          value={Math.abs(averageAttendRateLastMonth - averageAttendRateThisMonth).toFixed(2)}
                                          suffix={'%'}
                                          trend={averageAttendRateLastMonth < averageAttendRateThisMonth ? "up" : "down"}/>,
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard
            title="课程平均指标"
            chart={
              <CourseRadar/>
            }
          />
        </ProCard>
      </ProCard>
      <StatisticCard
        title="课程每讲数据"
        chart={
          <RateDualAxes/>
        }
        tooltip="点击折线图可查看某一讲的详细数据"

      />
    </RcResizeObserver.Collection>
  );
};
