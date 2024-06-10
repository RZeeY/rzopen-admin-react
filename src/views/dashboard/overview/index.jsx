// React
import { useEffect, useState } from 'react';
// antd
import { Row, Col, Divider, Radio, Space, DatePicker, Spin } from 'antd';
import { Chart } from '@antv/g2';
// components
import SCardOverview from './components/s-card-overview/index';
// stylesheet
import './index.less';
// api
import { getContentAnalysis } from '../../../request/api/overview';
// other
import { DATE_TYPES } from '../../../constant/index';

let chart = null;
let chartData = [];

export function Component() {
  let [loading, setLoading] = useState(false);
  let [approvalCount, setApprovalCount] = useState();
  let [likeCount, setLikeCount] = useState();
  let [playCount, setPlayCount] = useState();
  let [readingCount, setReadingCount] = useState();

  useEffect(() => {
    chart = new Chart({
      container: 'detail-data-chart',
      autoFit: true,
    });
    chart.encode('x', 'date').encode('y', 'value').encode('color', 'type');
    chart
      .axis('x', {
        size: 24,
        title: false,
        labelAutoEllipsis: true,
      })
      .axis('y', {
        title: false,
      });
    chart.line().encode('shape', 'smooth');
    chart.point().encode('shape', 'point').tooltip(false);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getContentAnalysis();
      setLoading(false);
      setApprovalCount(res.approvalCount);
      setLikeCount(res.likeCount);
      setPlayCount(res.playCount);
      setReadingCount(res.readingCount);
      computeChartData(14, res.approvalCount, res.likeCount, res.playCount, res.readingCount);
      chart.data(chartData);
      chart.render();
    })();
  }, []);

  function computeChartData(sliceCount = 14, approvalCount, likeCount, playCount, readingCount) {
    chartData = [];
    chartData = chartData.concat(
      readingCount.detail.slice(0, sliceCount).map(item => {
        return {
          ...item,
          type: '阅读量',
        };
      })
    );
    chartData = chartData.concat(
      playCount.detail.slice(0, sliceCount).map(item => {
        return {
          ...item,
          type: '播放量',
        };
      })
    );
    chartData = chartData.concat(
      approvalCount.detail.slice(0, sliceCount).map(item => {
        return {
          ...item,
          type: '赞同量',
        };
      })
    );
    chartData = chartData.concat(
      likeCount.detail.slice(0, sliceCount).map(item => {
        return {
          ...item,
          type: '喜欢量',
        };
      })
    );
  }

  function handleChartDateChange(ev) {
    switch (ev.target.value) {
      case DATE_TYPES.NEAR: {
        computeChartData(7, approvalCount, likeCount, playCount, readingCount);
        break;
      }
      case DATE_TYPES.MIDDLE: {
        computeChartData(14, approvalCount, likeCount, playCount, readingCount);
        break;
      }
      case DATE_TYPES.ALL: {
        computeChartData(30, approvalCount, likeCount, playCount, readingCount);
        break;
      }
      default:
        break;
    }
    chart.data(chartData);
    chart.render();
  }

  return (
    <>
      <div className='do-container'>
        <Spin spinning={loading}>
          <Row gutter={12}>
            <Col span={6}>
              <SCardOverview data={readingCount} cardTitle='阅读总量' />
            </Col>
            <Col span={6}>
              <SCardOverview data={playCount} cardTitle='播放总量' />
            </Col>
            <Col span={6}>
              <SCardOverview data={approvalCount} cardTitle='赞同总量' />
            </Col>
            <Col span={6}>
              <SCardOverview data={likeCount} cardTitle='喜欢总量' />
            </Col>
          </Row>
          <Divider />
          <div>
            <Space direction='vertical' className='width-fill'>
              <h2>详细数据</h2>
              <Space>
                <Radio.Group defaultValue={DATE_TYPES.MIDDLE} onChange={val => handleChartDateChange(val)}>
                  <Radio.Button value={DATE_TYPES.NEAR}>{DATE_TYPES.NEAR}</Radio.Button>
                  <Radio.Button value={DATE_TYPES.MIDDLE}>{DATE_TYPES.MIDDLE}</Radio.Button>
                  <Radio.Button value={DATE_TYPES.ALL}>{DATE_TYPES.ALL}</Radio.Button>
                </Radio.Group>
                <DatePicker.RangePicker />
              </Space>
              <div id='detail-data-chart' className='global-card-border detail-data-chart'></div>
            </Space>
          </div>
        </Spin>
      </div>
    </>
  );
}
