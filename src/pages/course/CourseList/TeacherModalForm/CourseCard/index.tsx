import {List} from 'antd';
import {useEffect, useState} from 'react';
import {searchCourses} from "@/services/api";
import CourseMiniCard from "@/pages/course/CourseList/TeacherModalForm/CourseMiniCard";


export default ({teacherId}: { teacherId: number }) => {

  // console.log(teacherId);
  // 存放列表项
  const [list, setList] = useState<API.Course[]>([]);
// 数据加载时显不显示  加载图标
  const [loading, setLoading] = useState(false);

  // 初始化参数列表，setParams用来设置参数
  const [params] = useState<API.SearchCourseParam>({
    courseName: "", courseNumber: "", teacher: teacherId
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchCourses({
        ...params,
      } as API.SearchCourseParam);

      // @ts-ignore
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [teacherId]); //第二个参数为空 表示只加载时执行一次
  const cardList = list && (
    <>

      <List<API.Course>
        rowKey="id"
        loading={loading}
        // bordered={true}
        itemLayout="vertical"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <CourseMiniCard
              course ={item}
            />
          </List.Item>
        )}
      />

    </>
  );

  return (
    <div>{cardList}</div>

  );
};
