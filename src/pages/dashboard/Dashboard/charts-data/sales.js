import React, { Fragment, useEffect ,useState} from 'react';
import Chart from 'react-apexcharts';
import { Label } from 'reactstrap';
import {YearsToCount} from '../../../../constant/index';
import {getMonthWiseOrderCount}from '../../../../api/Dashboard/index';
import Utility from '../../../../utils/Utility'; 

let allmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const SalesChart = () => {
   let currentYear = new Date().getFullYear();
   const [years,setYears] = useState([]);
   const [dateFormat,setDateFormat]= useState([]);
   useEffect(()=> {
       if(currentYear){
        for(let i=0;i< YearsToCount;i++){
            years.push(currentYear-i);
        }
        setYears(years);
       }
   },[])

   useEffect(()=> {
    if(years?.length && dateFormat?.length ===0){
        let dates = Utility.getDateFormat(years)
        setDateFormat(dates);
    }
    if(dateFormat?.length >0){
        getMonthWiseOrderCount(dateFormat)
    }
   },[years,dateFormat])
    var options = {
        // colors: ['#2F3B70','#ffa590'],
        chart: {
            background: '#fff'
        },  
        fill:{
            type:'gradient',
            gradientToColors: ['#2F3B70','#ffa590']
          },   
        grid: {
            show:false,
          },   
        stroke: {
            curve: 'smooth',
        },
        chart: {
            type: "line",
            zoom: {
                enabled: false
              }
        },
        series: [
            {
                name: years[0],
                data: [40, 42, 32, 41, 29, 31,65,59,45,35,65,75]
            },
            // {
            //     name: years[1],
            //     data: [42, 32, 98, 45, 19, 33,45,52,55,25,25,25]
            // }
        ],
        xaxis: {
            categories: allmonths
        },
        yaxis:{
            show: true,
        }
    };
    return (
        <Fragment>
            <div>
                <div className='header pl-3 pr-3 pt-3 pb-3 d-flex justify-content-between'>
                    <Label>Sales Overview</Label>
                    <i class="fa-solid fa-ellipsis-vertical" />
                </div>
                <Chart
                    options={options}
                    series={options.series}
                    type="line"
                    className="d-flex justify-content-center"
                    height={"350px"}
                />
            </div>
        </Fragment>
    )
}

export default SalesChart