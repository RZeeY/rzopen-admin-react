// React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// antd
import { Table, Space, Input, Select, Divider, DatePicker, Button, Spin, Modal } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
// stylesheet
import './index.less';
// components
import RzTableOperation from '../../../../components/rz-table-operation/index';
// api
import { getArticles } from '../../../../request/api/content';
// other
import { ARTICLE_TYPES } from '../../../../constant/index';
import { useComputeSelectOption, useMsg } from '../../../../global';

export function Component() {
  const navigate = useNavigate();
  const { infoMsg } = useMsg();
  const { confirm } = Modal;
  const articleType = useComputeSelectOption(ARTICLE_TYPES);
  let [loading, setLoading] = useState(false);
  let [tableData, setTableData] = useState([]);
  let [searchData, setSearchData] = useState({
    title: '',
    type: undefined,
    date: [],
  });

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: '创建日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <RzTableOperation
          data={record}
          onDetailClick={handleMainTableOperDetailClick}
          onEditClick={handleMainTableOperEditClick}
          onDeletClick={handleMainTableOperDeletClick}
        />
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getArticles();
      setLoading(false);
      setTableData(res);
    })();
  }, []);

  function handleMainSearchTitleInputChange(ev) {
    setSearchData({ ...searchData, title: ev.target.value });
  }

  function handleMainSearchTypeSelectChange(val) {
    setSearchData({ ...searchData, type: val });
  }

  function handleMainSearchDatePickerChange(val) {
    setSearchData({ ...searchData, date: val });
  }

  function handleMainTableOperDetailClick(ev, data) {
    infoMsg(`跳转至详情页，id为 ${data.id}`);
  }

  function handleMainTableOperEditClick(ev, data) {
    infoMsg(`跳转至编辑页，id为 ${data.id}`);
  }

  function handleMainTableOperDeletClick(ev, data) {
    setTableData(tableData.filter(item => item.id !== data.id));
  }

  function handleMainTableAddClick() {
    navigate('.././add');
  }

  function handleMainSearchClick() {
    confirm({
      title: '自行实现处理搜索事件',
      content: `请求参数: ${JSON.stringify(searchData)}`,
    });
  }

  return (
    <>
      <div className='cml-container'>
        <Spin spinning={loading}>
          <div>
            <Space direction='horizontal' size='middle'>
              <Input placeholder='标题' defaultValue={searchData.title} value={searchData.title} onChange={handleMainSearchTitleInputChange} />
              <Select
                style={{
                  width: 120,
                }}
                options={articleType}
                placeholder='分类'
                defaultValue={searchData.type}
                value={searchData.type}
                allowClear={true}
                onChange={handleMainSearchTypeSelectChange}
              />
              <DatePicker.RangePicker defaultValue={searchData.date} value={searchData.date} onChange={handleMainSearchDatePickerChange} />
              <Button icon={<SearchOutlined />} onClick={handleMainSearchClick}>
                搜索
              </Button>
            </Space>
          </div>
          <Divider />
          <div>
            <Space direction='vertical' size='middle' className='width-fill'>
              <div className='global-table-title-container'>
                <h3>文章列表</h3>
                <Button type='primary' icon={<PlusCircleOutlined />} onClick={handleMainTableAddClick}>
                  新增
                </Button>
              </div>
              <Table columns={columns} dataSource={tableData} rowKey='id' scroll={true} />
            </Space>
          </div>
        </Spin>
      </div>
    </>
  );
}
