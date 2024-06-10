// React
import { useEffect, useState } from 'react';
// antd
import { Table, Space, Input, Select, Divider, DatePicker, Button, Spin, Modal } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
// stylesheet
import './index.less';
// components
import RzTableOperation from '../../../../components/rz-table-operation/index';
// api
import { getUsers } from '../../../../request/api/user';
// other
import { useComputeSelectOption, useMsg } from '../../../../global';
import { GENDERS } from '../../../../constant/index';

export function Component() {
  const { infoMsg } = useMsg();
  const { confirm } = Modal;
  const genders = useComputeSelectOption(GENDERS);
  let [loading, setLoading] = useState(false);
  let [tableData, setTableData] = useState([]);
  let [searchData, setSearchData] = useState({
    title: '',
    type: null,
    date: [],
  });

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
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
      const res = await getUsers();
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
    infoMsg('跳转至添加页');
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
              <Input placeholder='用户名' defaultValue={searchData.title} value={searchData.title} onChange={handleMainSearchTitleInputChange} />
              <Select
                style={{
                  width: 120,
                }}
                options={genders}
                placeholder='性别'
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
                <h3>用户列表</h3>
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
