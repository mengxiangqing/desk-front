import { Card, Col, Form, List, Pagination, Radio, Row, Select } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';

import styles from './style.less';
import RoomCard from '@/pages/Room/RoomList/RoomCard';
import { searchClassRooms } from '@/services/api';

const { Option } = Select;
const FormItem = Form.Item;

const ListSearchProjects: FC = () => {
  // 存放列表项
  const [list, setList] = useState<API.ClassRoom[]>([]);
  // 初始化参数列表，setParams用来设置参数
  const [params, setParams] = useState<API.SearchClassRoomParam>({
    filter: [],
    roomStatus: 0,
    address: ['电子楼', '图东楼', '图西楼', '文学楼', '东北亚', '闻天楼'],
    roomName: '',
    seatRate: 666,
    sort: 'ascend',
  });
  // 分页器相关参数
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });
  // 数据加载时显不显示  加载图标
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchClassRooms({
        ...params,
        current: pagination.current,
        pageSize: pagination.pageSize,
      } as API.SearchClassRoomParam);
      // @ts-ignore
      setList(data.records);
      // @ts-ignore
      if (pagination.total != data.total) {
        // 判断一下，避免useEffect无限嵌套
        setPagination({
          ...pagination,
          // @ts-ignore
          total: data.total || 0,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 分页器改变时触发的回调函数
  const handlePageChange = async (current: number, pageSize?: number) => {
    console.log('触发, current：' + current + ' size: ' + pageSize);
    await setPagination({
      ...pagination,
      current: current,
      pageSize: pageSize || pagination.pageSize,
    });
    console.log(pagination);
  };

  useEffect(() => {
    handleSearch();
  }, [pagination]); //

  const cardList = list && (
    <>
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
          xxl: 4,
        }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <RoomCard
              roomName={item.roomName}
              seatRate={item.seatRate}
              human={item.humans}
              capacity={item.capacity}
            />
          </List.Item>
        )}
      />
      <div className={styles.pagination}>
        <Pagination
          {...pagination}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
        />
      </div>
    </>
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  function onSortChange() {
    let newSort: string = 'ascend';
    if (params.sort == 'ascend') {
      newSort = 'descend';
    }
    setParams({
      ...params,
      sort: newSort,
    });
    handleSearch();
  }

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
            params.seatRate = values.seatRate;
            params.filter = values.roomStatus;
            params.roomStatus = values.roomStatus;

            // params.sort = "ascend"
            console.log('params');
            console.log(params);
            // 表单项变化时请求数据
            setParams({ ...params } as API.SearchClassRoomParam);
            const promise = handleSearch();
            console.log('promise');
            console.log(promise);
          }}
        >
          <StandardFormRow title="建筑选项" block style={{ paddingBottom: 11 }}>
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
                  <Select
                    placeholder="不限"
                    key="statusOps"
                    style={{ maxWidth: 128, width: '100%' }}
                  >
                    <Option value={undefined}>不限</Option>
                    <Option value={0}>空闲</Option>
                    <Option value={1}>有课</Option>
                    <Option value={2}>关闭</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="落座状态" name="seatRate">
                  <Select placeholder={'不限'} style={{ maxWidth: 128, width: '100%' }}>
                    <Option value={666}>不限</Option>
                    <Option value={0}>空旷</Option>
                    <Option value={25}>稀疏</Option>
                    <Option value={50}>对半</Option>
                    <Option value={75}>拥挤</Option>
                    <Option value={99}>满员</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Radio.Group onChange={onSortChange}>
                  <Radio value={'ascend'}>由低到高</Radio>
                  <Radio value={'descend'}>由高到低</Radio>
                </Radio.Group>
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
