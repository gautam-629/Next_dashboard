/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactApexChart from 'react-apexcharts';
import { Component, useEffect, useState } from 'react';
import { formatAmount } from '../../../../utils/helpers/cellFormatter';

const OrderTrend = (props) => {
  const [series, setSeries] = useState([
    {
      name: 'Sales',
      data: [1223, 4555, 6555, 4443, 2233, 7788, 7766],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#29A229', '#FF7F0E', '#1875B5', '#689FB0', '#A66999'],
    stroke: {
      width: [2, 2, 2, 2],
      dashArray: [0, 0, 0, 0],
      curve: 'straight',
    },
    title: {},
    legend: {
      position: 'top',
      show: true,
      horizontalAlign: 'right',
      // tooltipHoverFormatter: function (val, opts) {
      //     return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      // }
      tooltipHoverFormatter: function (val, opts) {
        return val;
      },
    },
    markers: {
      size: 1,
      strokeWidth: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '7px',
        },
        formatter: (v) => formatAmount(v),
      },
    },
    tooltip: {},
    grid: {
      borderColor: '#f1f1f1',
    },
  });
  // const series = ;
  useEffect(() => {
    return;
  }, [props.data]);

  const setChartData = () => {
    setOptions({
      ...options,
      xaxis: {
        labels: {
          show: true,
        },
      },
    });
    setSeries(series);
  };

  return (
    <div>
      <div className="chart-area">
        <div className="flex justify-between">
          <div>
            <div className="text-md font-bold">Total Orders</div>
            <div className="text-2xl font-bold">$122,334</div>
          </div>
        </div>
        <div className={'h-full flex-grow'}>
          <ApexChart options={options} series={series} />
        </div>
      </div>
    </div>
  );
};

class ApexChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ReactApexChart
          options={this.props.options}
          series={this.props.series}
          type="line"
          height={200}
        />
      </>
    );
  }
}

export default OrderTrend;
