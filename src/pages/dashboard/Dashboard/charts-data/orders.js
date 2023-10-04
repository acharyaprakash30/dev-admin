import { SecurityScanFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { Label } from 'reactstrap';
import { GoPrimitiveDot } from 'react-icons/go'

const OrderChart = ({ counterArr, total }) => {
  const [seriesData, setSeries] = useState([]);
  const [label, setLabel] = useState([]);
  useEffect(() => {
    if (counterArr?.length > 0) {
      let datas = counterArr.map(counter => counter.value);
      let labels = counterArr.map(counter => counter?.name?.toUpperCase());
      setSeries(datas);
      setLabel(labels)
    }
  }, [counterArr]);

  var options = {
    colors: ['#FF4122','#f44336', '#ABC9FF','#ee6b6e','#ABC9FF','#ABC9FF',],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              fontFamily: 'Poppins',
              label: "TOTAL ORDER",
              fontSize:'0.8rem',
            }
          }
        }
      }
    },

    labels: label,
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
      breakpoint: 480,
      options: {
        chart: {
          height: 270
        },
        legend: {
          show: false
        }
      },
    },
    {
      breakpoint:850,
      options: {
        chart: {
          height: 290
        },
        legend: {
          show: false
        }
      },
    },
    {
      breakpoint: 1160,
      options: {
        chart: {
          height: 210
        },
        legend: {
          show: false
        }
      },
    },
      {
        breakpoint: 1307,
        options: {
          chart: {
            height: 250
          },
          legend: {
            show: false
          }
        }
    },
    {
      breakpoint: 16000,
      options: {
        chart: {
          height: 280
        },
        legend: {
          show: false
        }
      }
  },
   
  ],
  }

  return (
    <Fragment>
      <div className='orderChart'>
        <div className='header pl-3 pr-3 pt-3 pb-3 d-flex justify-content-between'>
          <Label>Order Overview</Label>
          <i class="fa-solid fa-ellipsis-vertical"/>
        </div>
        <div className="body pt-3 d-flex justify-content-center">
          <div className="chart pt-1">
            {
              seriesData?.length > 0 &&
              <Chart
                options={options}
                series={seriesData}
                type="donut"
              />
            }
          </div>
          <div className="chartInfo ">
            <div className='totalInfo d-flex pl-3 align-items-center '>
              <div className='cartIcon'>
                <i class="fa fa-shopping-cart"></i>
              </div>
              <div className='orderTotal d-flex flex-column '>
                <Label>&nbsp;Total Orders</Label>
                <span>{total}</span>
              </div>
            </div>
            <Divider className="pl-2"></Divider>
            <div className="remainingInfo d-flex flex-wrap">
              {seriesData?.map((series, i) => (
                <div className="info pb-2 pt-3">
                  <div className='info1 d-flex justify-content-start'>
                    {/* <GoPrimitiveDot  color={options?.colors[i]} /> */}
                    <Label className="pl-1">{label[i]}</Label>
                  </div>
                  <span className='pl-2'>{series}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default OrderChart

// let pallate = [#3F51B5,#03A9F4,#4CAF50,#F9CE1D,#FF9800]