import {ProFormSelect} from "@ant-design/pro-components";
import {searchTeachers} from "@/services/api";

export default () => {
  return <ProFormSelect
    name="teacher"
    label="授课教师"
    width="md"
    showSearch
    debounceTime={300}
    tooltip="可通过学工号和名字搜索老师"
    request={async ({keyWords}) => {
      let account: number = 0;
      let name = "";
      const accountNum = parseInt(keyWords);
      if (!isNaN(accountNum)) {
        account = keyWords
      } else {
        name = keyWords
      }
      const res = await searchTeachers({
        username: name,
        userAccount: account
      });
      // @ts-ignore
      const data = res.map((item) => ({
        value: item.id,
        label: item.userAccount + ' ' + item.username + ' ' + (item.college ? item.college : " ")
      }));
      return (data);
    }}
    placeholder="选择授课教师"
    rules={[{required: true, message: '请选择授课教师'}]}
  />
}
