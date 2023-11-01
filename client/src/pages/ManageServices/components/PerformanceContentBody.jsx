import React from "react";
import styled from "styled-components";
import { device } from "../../../theme/mediaQueries";
import DateRangeFieldValue from "../PerformanceComponents/DateRange";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    // title: {
    //   display: true,
    //   text: 'Performance Chart',
    //   color: '#122051',
    //   fontSize: '2rem'
    // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Impressions',
      data: labels.map(() => faker.datatype.number({ min: -800, max: 1000 })),
      borderColor: 'black',
      backgroundColor: 'black',
    },
    {
      label: 'Visitors',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#0bca7a',
      backgroundColor: '#0bca7a',
    },
    {
      label: 'Phone View',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#ff2e2e',
      backgroundColor: '#ff2e2e',
    },
    {
      label: 'Chat requests',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#3b3bf2',
      backgroundColor: '#3b3bf2',
    },
  ],
};


export default function PerformanceContentBody() {
  return (
    <Container>
      <div className="performance-chart-container">
        <DateRangeFieldValue className="date-range" />
        <div className="chart">
          <Line 
            options={options} 
            data={data} 
            width={100}
            height={100}
          />
        </div>
        <div className="chart-summary">
          <ul>
            <li className="black">
              0 <br /> Impressions
            </li>
            <li className="green">
              0 <br /> Visitors
            </li>
            <li className="red">
              0 <br /> Phone views
            </li>
            <li className="blue">
              0 <br /> Chat Requsets
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .performance-chart-container {
    text-align: center;
    padding: 0;
    .css-10e3ze8-MuiStack-root,
    .date-range {
      display: none;
      @media ${device.tabs} {
        display: inline-block;
      }
    }
    .chart {
      display: block;
      height: 13rem;
      margin-bottom: 2rem;
    }
    .chart-summary {
      display: block;
      ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 0;
        margin: 3rem 0 0;
        @media ${device.laptopS} {
          justify-content: space-between;
        }
        @media ${device.mob} {
          justify-content: center;
          gap: 1rem;
        }
        li {
          list-style: none;
          // textalign: center;
          font-size: 0.875rem;
          padding: 0.3rem 1rem;
          color: white;
          flex: 1;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-family: intermedium;

          @media ${device.tablet} {
            font-size: 0.7rem;
          }
        }
        .black {
          background-color: black;
        }
        .green {
          background-color: #0bca7a;
        }
        .red {
          background-color: #ff2e2e;
        }
        .blue {
          background-color: #3b3bf2;
        }
      }
    }
  }
  // }
`;
