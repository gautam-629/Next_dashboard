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
import { ApexOptions } from 'apexcharts';

const StudentsByCourse = (props: any) => {
  const [series, setSeries] = useState([{ name: 'Sales', data: [50, 25, 10, 28, 16, 21] }]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: 'bar',
      // events: {
      //   click: function (chart: any, w: any, e: any) {},
      // },
    },
    colors: props.colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['Data Structure'],
        ['UI/UX'],
        ['Design'],
        'Amber',
        '   Web Development',
        'Graphic Designing',
      ],
      labels: {
        style: {
          colors: props.colors,
          fontSize: '12px',
        },
      },
    },
  });

  // const series = ;
  useEffect(() => {
    return;
  }, [props.data]);

  return (
    <div>
      <div className="chart-area">
        <div className="flex justify-between">
          <div>
            <div className="text-lg font-normal ">Students By Course</div>
          </div>
        </div>
        <div className={'h-full flex-grow w-[800px]'}>
          <ReactApexChart options={options} series={series} type="bar" />
        </div>
      </div>
    </div>
  );
};

export default StudentsByCourse;
