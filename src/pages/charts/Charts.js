import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRamenData } from '../../actions/ramen'; 
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Widget from '../../components/Widget';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PercentAreaChart from './charts/PercentAreaChart';
import PieChart from './charts/PieChart';

const Chart = () => {
  const dispatch = useDispatch();
  const ramenData = useSelector(state => state.ramen.data || []);

  useEffect(() => {
    dispatch(fetchRamenData());
  }, [dispatch]);

  const chartData = ramenData.map((entry, index) => ({
    name: entry.anon_name || `Anon ${index + 1}`,
    pv: entry.score,
    uv: entry.rating,
  }));

  console.log('ramenData', ramenData);
  
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Charts</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="page-title mb-lg">Pretty <span className="fw-semi-bold">Charts</span></h1>
      <Row>
        <Col xs={12} md={6}>
          <Widget title={<h5>Simple <span className="fw-semi-bold">Line Chart</span></h5>}>
            <LineChart data={chartData} />
          </Widget>
        </Col>
        <Col xs={12} md={6}>
          <Widget title={<h5>Simple <span className="fw-semi-bold">Bar Chart</span></h5>}>
            <BarChart data={chartData} />
          </Widget>
        </Col>
        <Col xs={12}>
          <Widget title={<h5>Percent <span className="fw-semi-bold">Area Chart</span></h5>}>
            <PercentAreaChart data={chartData} />
          </Widget>
        </Col>
        <Col xs={12} md={6}>
          <Widget title={<h5>Pie <span className="fw-semi-bold">Chart</span></h5>}>
            <PieChart />
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Chart;
