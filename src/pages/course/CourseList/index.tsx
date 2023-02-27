import { deleteCourse, searchCourses, updateUser } from '@/services/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import access from '@/access';
import { getInitialState } from '@/app';
import ModalForm from '@/components/ModalForm';
import TeacherModalForm from '@/pages/course/CourseList/TeacherModalForm';

const acc = access(await getInitialState());

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const DeleteConfirm = (record: { record: { id: API.DeleteUserParam } }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
      setOpen(true);
    };

    const handleOk = async () => {
      await deleteCourse(record.record.id);

      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };

    const handleCancel = () => {
      setOpen(false);
    };

    return (
      <Popconfirm
        title="确认删除？"
        visible={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <a onClick={showPopconfirm}>删除</a>
      </Popconfirm>
    );
  };

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
      render: (text, record, _, action) => {
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
      render: (text, record, _, action) => {
        if (acc.canAdmin) {
          return [
            <ModalForm key={'courseDetail'} record={record} />,
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              {/*TODO 编辑课程的授课教师时，弹出选框选择教师*/}
              编辑
            </a>,
            <DeleteConfirm key="delete" record={record} />,
          ];
        } else {
          return <ModalForm key={'courseDetail'} record={record} />;
        }
      },
    },
  ];

  return (
    <ProTable<API.Course>
      columns={columns}
      actionRef={actionRef} //Table action 的引用，便于自定义触发
      cardBordered
      // @ts-ignore
      request={async (
        params?: { username: string; pageSize: number; current: number },
        sort,
        filter,
      ) => {
        console.log(params, sort, filter);
        const userList = await searchCourses({
          ...params,
          sort,
          filter,
        } as unknown as API.SearchCourseParam);
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          // console.log(rowKey, data, row);
          // TODO 更新课程
          await updateUser(data);

          // await waitTime(2000);
        },
        onChange: setEditableRowKeys,
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
      // headerTitle="用户列表"
    />
  );
};
