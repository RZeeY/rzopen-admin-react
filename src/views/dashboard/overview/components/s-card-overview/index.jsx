// React
import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// antd
import { Card, Space, Statistic, Segmented } from 'antd';
// components
import RzStatisticFormatter from '../../../../../components/rz-statistic-formatter/index';

Component.propTypes = {
  data: PropTypes.object,
  cardTitle: PropTypes.string.isRequired,
};

export default function Component({
  data = {
    overview: ['-', '-', '-'],
  },
  cardTitle,
}) {
  const dateTypes = Object.freeze({
    NEAR: '7天',
    MIDDLE: '14天',
    ALL: '全部',
  });
  const dateOptions = useMemo(() => {
    return Object.values(dateTypes);
  }, [dateTypes]);
  let [mainValue, setMainValue] = useState('-');

  const handleDateChange = useCallback(
    val => {
      switch (val) {
        case dateTypes.NEAR: {
          setMainValue(data.overview[0]);
          break;
        }
        case dateTypes.MIDDLE: {
          setMainValue(data.overview[1]);
          break;
        }
        case dateTypes.ALL: {
          setMainValue(data.overview[2]);
          break;
        }
        default:
          break;
      }
    },
    [data.overview, dateTypes]
  );

  useEffect(() => {
    handleDateChange(dateTypes.NEAR);
  }, [data, dateTypes.NEAR, handleDateChange]);

  return (
    <>
      <Card
        title={cardTitle}
        bordered={false}
        extra={<Segmented size='small' options={dateOptions} onChange={val => handleDateChange(val)} defaultValue={dateTypes.NEAR} />}
      >
        <Statistic value={mainValue} formatter={RzStatisticFormatter} />
        <div>
          <Space>
            <div>今日</div>
            <Statistic value={data.today} formatter={RzStatisticFormatter} valueStyle={{ fontSize: 14 }} />
          </Space>
        </div>
      </Card>
    </>
  );
}
