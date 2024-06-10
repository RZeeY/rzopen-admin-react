// React
import { useEffect, useMemo, useState } from 'react';
// antd
import { Row, Col, Divider, Space, Card, Statistic, Spin } from 'antd';
import { Chart } from '@antv/g2';
// stylesheet
import './index.less';
// api
import { getFlowerAnalysis } from '../../../request/api/overview';
// other
import RzStatisticFormatterfrom from '../../../components/rz-statistic-formatter/index';

let chart = null;

export function Component() {
  let [loading, setLoading] = useState(false);
  let [totalFlower, setTotalFlower] = useState('-');
  let [yesterdayFlower, setYesterdayFlower] = useState('-');
  let [flowerRise, setFlowerRise] = useState('-');
  let [flowerDecline, setFlowerDecline] = useState('-');
  let [activeUser, setActiveUser] = useState('-');
  let [activeUserPer, setActiveUserPer] = useState('-');
  let [words, setWords] = useState([]);

  let computedActiveUserPer = useMemo(() => {
    return `${activeUserPer * 100}%`;
  }, [activeUserPer]);

  useEffect(() => {
    chart = new Chart({
      container: 'detail-data-chart',
      autoFit: true,
    });
    chart
      .wordCloud()
      .layout({
        spiral: 'rectangular',
        fontSize: [18, 42],
      })
      .encode('color', 'text')
      .legend(false);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getFlowerAnalysis();
      setLoading(false);
      setTotalFlower(res.total);
      setYesterdayFlower(res.yesterday);
      setFlowerRise(res.rise);
      setFlowerDecline(res.decline);
      setActiveUser(res.setActiveUser);
      setActiveUserPer(res.activeUserPer);
      setWords(res.words);
    })();
  }, []);

  useEffect(() => {
    chart.data(words);
    chart.render();
  }, [words]);

  return (
    <>
      <div className='df-container'>
        <Spin spinning={loading}>
          <Row gutter={12}>
            <Col span={6}>
              <Card title='关注者总数' bordered={false}>
                <Statistic value={totalFlower} formatter={RzStatisticFormatterfrom} />
                <div>🦄🦄🦄🦄🦄🦄</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='昨日关注者变化' bordered={false}>
                <Statistic value={yesterdayFlower} formatter={RzStatisticFormatterfrom} />
                <div>
                  增加 {flowerRise} · 减少 {flowerDecline}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='活跃关注者' bordered={false}>
                <Statistic value={activeUser} formatter={RzStatisticFormatterfrom} />
                <div>近 30 天</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title='活跃关注者占比' bordered={false}>
                <Statistic value={computedActiveUserPer} />
                <div>近 30 天</div>
              </Card>
            </Col>
          </Row>
          <Divider />
          <div>
            <Space direction='vertical' className='width-fill'>
              <h2>用户特征</h2>
              <div id='detail-data-chart' className='global-card-border detail-data-chart'></div>
            </Space>
          </div>
        </Spin>
      </div>
    </>
  );
}
