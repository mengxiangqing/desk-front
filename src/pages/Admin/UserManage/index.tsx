import {deleteUser, searchUsers, updateUser} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';


const DeleteConfirm = (record: { record: { id: API.DeleteUserParam; }; }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);

  };

  const handleOk = async () => {

    await deleteUser(record.record.id);

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
      title="确认删除用户"
      visible={open}
      onConfirm={handleOk}
      okButtonProps={{loading: confirmLoading}}
      onCancel={handleCancel}
    >
      <a onClick={showPopconfirm}>
        删除
      </a>
    </Popconfirm>
  );
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable:false,
    hideInSearch: true,
    // valueType: 'indexBorder',
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
    editable:false,
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '女'
      }, 1: {
        text: '男'
      }

    }
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
    title: '角色',
    dataIndex: 'userRole',
    hideInSearch: true,
    editable:false,
    valueType: 'select',
    filters: true,
    valueEnum: {
      1: {
        text: '学生',
        status: 'Processing',
      },
      2: {
        text: '教师',
        status: 'Error',
      },
      3: {
        text: '督导员',
        status: 'Success',
      },
      4: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    editable:false,
    // tip: '过长会自动收缩',
    // ellipsis: true,
    sorter: true,

    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    hideInSearch: true,
    editable:false,
    valueType: 'dateTime',
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    hideInSearch: true,
    filters: true,
    editable:false,
    valueEnum: {
      0: {
        text: "正常",
      },
      1: {
        text: "毕业",
      }, 2: {
        text: "结业",
      }, 3: {
        text: "肄业",
      }, 4: {
        text: "离职",
      }, 5: {
        text: "退休",
      },
    }
  },

  {
    title: '操作',
    valueType: 'option',
    hideInSearch: true,
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <DeleteConfirm key='delete' record={record}/>
    ],
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
      request={async (params?: { username: string, pageSize: number, current: number }, sort, filter) => {
        console.log(params, sort, filter);
        const userList = await searchUsers({...params, sort, filter} as unknown as API.SearchUser);
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
