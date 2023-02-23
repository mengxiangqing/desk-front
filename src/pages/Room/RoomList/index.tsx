import {Card, Col, Form, List, Row, Select} from 'antd';
import {FC, useEffect, useState} from 'react';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';

import styles from './style.less';
import RoomCard from "@/components/RoomCard";
import {searchClassRooms} from "@/services/api";

const {Option} = Select;
const FormItem = Form.Item;

const ListSearchProjects: FC = () => {
  const [list, setList] = useState<API.ClassRoom[]>([]);
  const [params, setParams] = useState<API.SearchClassRoomParam>({
    filter: [],
    roomStatus: 0,
    address: ['电子楼', '图东楼', '图西楼', '文学楼', '东北亚', '闻天楼'],
    roomName: "",
    seatRate: 0,
    sort: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchClassRooms({...params} as API.SearchClassRoomParam);
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
  }, []); // 第二个参数为[]，表示只在组件初始化时调用一次

  const cardList = list && (
    <List<API.ClassRoom>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 8,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <RoomCard roomName={item.roomName} seatRate={item.seatRate} human={item.humans}
                    capacity={item.capacity}/>
        </List.Item>
      )}
    />
  );


  const formItemLayout = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"

          onValuesChange={(_, values) => {
            // console.log(values);
            if (values.address) {
              params.address = values.address;
            }
            params.seatRate = values.seatRate
            params.filter = values.roomStatus
            params.roomStatus = values.roomStatus
            params.sort = "desc"
            console.log("params");
            console.log(params);
            // 表单项变化时请求数据
            setParams({...params} as API.SearchClassRoomParam)
            const promise = handleSearch();
            console.log("promise");
            console.log(promise);
          }}
        >
          <StandardFormRow title="建筑选项" block style={{paddingBottom: 11}}>
            <FormItem name="address">
              <TagSelect>
                <TagSelect.Option value="电子楼">电子楼</TagSelect.Option>
                <TagSelect.Option value="图东楼">图东楼</TagSelect.Option>
                <TagSelect.Option value="图西楼">图西楼</TagSelect.Option>
                <TagSelect.Option value="文学楼">文学楼</TagSelect.Option>
                <TagSelect.Option value="东北亚">东北亚</TagSelect.Option>
                <TagSelect.Option value="闻天楼">闻天楼</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="教室选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="开放状态" name="roomStatus">
                  <Select placeholder="不限" key="statusOps" style={{maxWidth: 200, width: '100%'}}>
                    <Option value={undefined}>不限</Option>
                    <Option value={0}>空闲</Option>
                    <Option value={1}>有课</Option>
                    <Option value={2}>关闭</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="落座状态" name="seatRate">
                  <Select placeholder={"不限"} style={{maxWidth: 200, width: '100%'}}>
                    <Option value={0}>空旷</Option>
                    <Option value={20}>稀疏</Option>
                    <Option value={70}>拥挤</Option>
                    <Option value={90}>满员</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default ListSearchProjects;
