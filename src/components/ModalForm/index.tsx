import { ModalForm } from '@ant-design/pro-components';
import CourseDetailCard from '../../pages/course/CourseList/CourseDetailCard';

interface Props {
  record: {
    id: API.DeleteUserParam;
  };
}

export default ({ record }: Props) => {



  // console.log(record);
  // @ts-ignore
  return (
    <ModalForm
      initialValues={{ courseId: record.id }}
      title="课程详情"
      trigger={<a type="primary">详情</a>}
      submitter={{
        /*去掉 确认和取消 按钮*/
        render: () => {
          return [
            // ...defaultDoms,
          ];
        },
      }}
      modalProps={{
        destroyOnClose: true,
        // maskClosable: false
      }}
    >
      {/*向数据卡片传递课程ID*/}
      <CourseDetailCard course={record.id} />
    </ModalForm>
  );
};
