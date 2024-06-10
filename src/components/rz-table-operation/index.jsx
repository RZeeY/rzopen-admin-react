// react
import PropTypes from 'prop-types';
// antd
import { Space, Button, Popconfirm } from 'antd';

Component.propTypes = {
  data: PropTypes.object.isRequired,
  onDetailClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeletClick: PropTypes.func.isRequired,
};

export default function Component({ data, onDetailClick, onEditClick, onDeletClick }) {
  return (
    <Space size='small'>
      <Button size='small' onClick={ev => onDetailClick(ev, data)}>
        查看
      </Button>
      <Button size='small' type='primary' onClick={ev => onEditClick(ev, data)}>
        编辑
      </Button>
      <Popconfirm title='删除' description='确定删除此项？' onConfirm={ev => onDeletClick(ev, data)} okText='确定' cancelText='取消'>
        <Button size='small' type='primary' danger>
          删除
        </Button>
      </Popconfirm>
    </Space>
  );
}
