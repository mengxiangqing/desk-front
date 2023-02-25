import { ModalForm } from '@ant-design/pro-components';
import CourseCard from './CourseCard';
import React from 'react';

interface Props {
  teacher: number;
  teacherName: string;
  courseId: number;
}

const TeacherModalForm: React.FC<Props> = ({ courseId, teacher, teacherName }) => {
  let text = teacherName;
  if (courseId == -1) {
    text = '详情';
  }
  // @ts-ignore
  return (
    <ModalForm
      title={
        <>
            历史课程数据
          <div style={{textAlign: 'center', fontSize: '18px'}}>教师：{teacherName}</div>
        </>
      }
      width={1200}
      trigger={<a type="primary">{text}</a>}
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
      {/*向数据卡片传递教师ID*/}
      <CourseCard teacherId={teacher} />
    </ModalForm>
  );
};
export default TeacherModalForm;
