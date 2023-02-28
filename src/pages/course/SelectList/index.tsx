import {cancelSelectCourse, selectedCourses} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {useRef} from 'react';
import ModalForm from '@/components/ModalForm';
import TeacherModalForm from '@/pages/course/CourseList/TeacherModalForm';
import {message} from "antd";


export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Course>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      editable: false,
      hideInSearch: true,
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '课程名',
      dataIndex: 'courseName',
      copyable: true,
    },
    {
      title: '课程号',
      dataIndex: 'courseNumber',
      editable: false,
      copyable: true,
    },

    {
      title: '电话',
      dataIndex: 'phone',
      hideInSearch: true,
      // copyable: true,
    },

    {
      title: '授课教师',
      dataIndex: 'teacherName',
      hideInSearch: true,
      editable: false,
      render: (text, record) => {
        if (record.teacherName) {
          return [
            <TeacherModalForm
              key={'teacherDetail'}
              courseId={record.id}
              teacher={record.teacher}
              teacherName={record.teacherName}
            />,
          ];
        } else {
          return '——';
        }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      editable: false,
      // tip: '过长会自动收缩',
      // ellipsis: true,
      sorter: true,

      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      editable: false,
      valueType: 'dateTime',
    },

    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      key: 'option',
      render: (text, record) => {
        return [
          <ModalForm key={'courseDetail'} record={record}/>,
          <a key="cancelSelectCourse" onClick={async () => {
            await cancelSelectCourse(record.id);
            message.success('删除记录成功');
          }}>取消</a>
        ];

      },
    },
  ];
  return (
    <ProTable<API.Course>
      revalidateOnFocus
      columns={columns}
      actionRef={actionRef} //Table action 的引用，便于自定义触发
      cardBordered
      // @ts-ignore
      request={async (
        params?: { username: string; pageSize: number; current: number },
        // @ts-ignore
        sort,
        filter,
      ) => {
        console.log(params, sort, filter);
        const userList = await selectedCourses({
          ...params,
          sort,
          filter,
        } as unknown as API.SearchCourseParam);
        return {
          data: userList,
        };
      }}
      columnsState={{
        persistenceKey: 'course-search',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      // dateFormatter="string"
      headerTitle="课程列表"
    />
  );
};
