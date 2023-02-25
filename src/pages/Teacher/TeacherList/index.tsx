import { searchTeachers, updateUser } from '@/services/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import TeacherModalForm from '@/pages/course/CourseList/TeacherModalForm';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    hideInSearch: true,
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '学工号',
    dataIndex: 'userAccount',
    editable: false,
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '女',
      },
      1: {
        text: '男',
      },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    hideInSearch: true,
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    hideInSearch: true,
    copyable: true,
    // ellipsis: true,
    // tip: '过长会自动收缩',
  },
  {
    title: '所属学院',
    dataIndex: 'college',
    hideInSearch: true,

    // copyable: true,
    // ellipsis: true,
    // tip: '过长会自动收缩',
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
    title: '状态',
    dataIndex: 'userStatus',
    hideInSearch: true,
    filters: true,
    editable: false,
    valueEnum: {
      0: {
        text: '正常',
      },
      4: {
        text: '离职',
      },
      5: {
        text: '退休',
      },
    },
  },
  {
    title: '更多',
    valueType: 'option',
    hideInSearch: true,
    key: 'option',
    render: (text, record, _, action) => (
      <TeacherModalForm
        key={'teacherDetail'}
        teacher={record.id}
        courseId={-1}
        teacherName={record.username}
      />
    ),
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef} //Table action 的引用，便于自定义触发
      cardBordered
      // @ts-ignore
      request={async (
        params: { username: string; pageSize: number; current: number },
        sort?,
        filter?,
      ) => {
        // console.log(params, sort, filter);
        const userList = await searchTeachers({
          ...params,
          sort,
          filter,
        } as unknown as API.SearchUser);
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          // console.log(rowKey, data, row);
          await updateUser(data);

          // await waitTime(2000);
        },
        onChange: setEditableRowKeys,
      }}
      columnsState={{
        persistenceKey: 'user-manage',
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
