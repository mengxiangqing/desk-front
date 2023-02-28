import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProForm, ProFormDigitRange, ProFormText,} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';
import {ProFormTextArea} from "@ant-design/pro-form";
import TeacherSelect from '@/components/TeacherSelect';
import {addCourse} from "@/services/api";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default () => {

  const [form] = Form.useForm<{}>();


  return (
    <ModalForm<{
      chooseNum: number,
      college: string,
      courseName: string,
      courseNumber: string,
      workWeek: number[]
      remark: string,
      teacher: number,
      teachingTime: string,
      phone: string
    }>
      title="新建课程"
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          添加课程
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(200);
        // console.log(values);

        const params: API.CourseAddParam = {
          chooseNum: values.chooseNum,
          college: values.college,
          courseName: values.courseName,
          courseNumber: values.courseNumber,
          startWeek: values.workWeek[0],
          endWeek: values.workWeek[1],
          remark: values.remark,
          teacher: values.teacher,
          teachingTime: values.teachingTime,
          phone: values.phone,
        };
        // console.log(params);
        await addCourse(params)

        message.success('提交成功');
        form.resetFields()
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="courseName"
          label="课程名称"
          placeholder="请输入课程名"
          rules={[{required: true, message: '请输入课程名'}]}
        />
        <ProFormText
          width="md"
          name="courseNumber"
          label="课程号"
          placeholder="请输入课程号"
          rules={[{required: true, message: '请输入课程号'}]}
        />

      </ProForm.Group>

      <ProForm.Group>

        <ProFormText
          width="md"
          label="所属学院"
          name="college"
          placeholder="请输入所属单位"
          rules={[{required: true, message: '请输入所属单位'}]}

        />
        <ProFormText
          width="md"
          label="授课学期"
          name="teachingTime"
          placeholder="请输入授课学期"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          label="联系电话"
          name="phone"
          placeholder="请输入联系方式"
        />
        <ProFormText
          width="md"
          label="选课人数"
          name="chooseNum"
          placeholder="请输入选课人数"
        />
      </ProForm.Group>
      <ProForm.Group>
        <TeacherSelect/>
        <ProFormDigitRange
          label="上课起止周"
          name="workWeek"
          separator="——"
          placeholder={["请输入开始周", "请输入结束周"]}
          // separatorWidth={30}
          // style={{width:100}}
        />
      </ProForm.Group>

      <ProFormTextArea

        label="备注"
        name={"remark"}
      />


    </ModalForm>
  );
};
