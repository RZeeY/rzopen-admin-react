// React
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
// antd
import { Row, Col, Divider, Radio, Space, DatePicker, Card, Statistic, Spin } from 'antd';
import { blue } from '@ant-design/colors';
import { Chart } from '@antv/g2';
// stylesheet
import './index.less';
// components
import RzStatisticFormatterfrom from '../../../components/rz-statistic-formatter/index';
// api
import { getIncomeAnalysis } from '../../../request/api/overview';
// other
import { DATE_TYPES } from '../../../constant/index';

let chart = null;
let chartData = [];

export function Component() {
  let [loading, setLoading] = useState(false);
  let [yesterdayIncome, setYesterdayIncome] = useState('-');
  let [todayIncome, setTodayIncome] = useState('-');
  let [lastWeekIncome, setLastWeekIncome] = useState('-');
  let [weekIncome, setWeekIncome] = useState('-');
  let [totalIncome, setTotalIncome] = useState('-');
  let [balance, setBalance] = useState('-');
  let [incomeDetail, setIncomeDetail] = useState([]);

  useEffect(() => {
    chart = new Chart({
      container: 'detail-data-chart',
      autoFit: true,
    });
    chart
      .axis('x', {
        size: 24,
        title: false,
        labelAutoEllipsis: true,
      })
      .axis('y', {
        title: false,
      });
    chart.interval().encode('x', 'date').encode('y', 'value');
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getIncomeAnalysis();
      setLoading(false);
      setYesterdayIncome(res.yesterday);
      setTodayIncome(res.today);
      setLastWeekIncome(res.lastWeek);
      setWeekIncome(res.week);
      setTotalIncome(res.total);
      setBalance(res.balance);
      setIncomeDetail(res.detail);
    })();
  }, []);

  const computeChartData = useCallback(
    (sliceCount = 14) => {
      chartData = incomeDetail.slice(0, sliceCount);
    },
    [incomeDetail]
  );

  useEffect(() => {
    computeChartData();
    chart.data(chartData);
    chart.render();
  }, [incomeDetail, computeChartData]);

  function handleChartDateChange(ev) {
    switch (ev.target.value) {
      case DATE_TYPES.NEAR: {
        computeChartData(7);
        break;
      }
      case DATE_TYPES.MIDDLE: {
        computeChartData(14);
        break;
      }
      case DATE_TYPES.ALL: {
        computeChartData(30);
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
      <div className='di-container'>
        <Spin spinning={loading}>
          <Row gutter={12}>
            <Col span={6}>
              <Card title='今日收益' bordered={false}>
                <Statistic value={todayIncome} prefix='¥' formatter={RzStatisticFormatterfrom} />
                <div>
                  <Space>
                    <div>昨日</div>
                    <Statistic value={yesterdayIncome} prefix='¥' formatter={RzStatisticFormatterfrom} valueStyle={{ fontSize: 14, color: blue.primary }} />
                  </Space>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='本周收益' bordered={false}>
                <Statistic value={weekIncome} prefix='¥' formatter={RzStatisticFormatterfrom} />
                <div>
                  <Space>
                    <div>上周</div>
                    <Statistic value={lastWeekIncome} prefix='¥' formatter={RzStatisticFormatterfrom} valueStyle={{ fontSize: 14, color: blue.primary }} />
                  </Space>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='累计收益' bordered={false}>
                <Statistic value={totalIncome} prefix='¥' formatter={RzStatisticFormatterfrom} />
                <div>
                  <Link to='/'>💸💸💸💸💸</Link>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='创作余额' bordered={false}>
                <Statistic value={balance} prefix='¥' formatter={RzStatisticFormatterfrom} />
                <div>
                  <Link to='/'>💸 去提现 💸</Link>
                </div>
              </Card>
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
