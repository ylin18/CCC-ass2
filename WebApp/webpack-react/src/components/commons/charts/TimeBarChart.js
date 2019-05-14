import React from "react";
import {Bar} from 'react-chartjs-2';

export default class TimeBarChart extends React.Component {

  // render
  render() {
    var data;
    var count = 0;
    var years = ["2014","2015","2019"];
    const index = this.props.index;
    console.log(this.props.data);
    data = {
      labels: ["Timeblock1 0-3","Timeblock2 3-6","Timeblock3 6-9","Timeblock4 9-12","Timeblock5 12-15","Timeblock6 15-18","Timeblock7 18-21","Timeblock8 21-0"],
      datasets: [
        {
          label: "Melbourne",
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.8)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data:this.props.data[index][0]
        },
        {
          label: "Sydney",
          backgroundColor: 'rgb(66,134,244,0.5)',
          borderColor: 'rgb(66,134,244,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(66,134,244,0.8)',
          hoverBorderColor: 'rgb(66,134,244,1)',
          data: this.props.data[index][1]
        },
        {
          label: "Perth",
          backgroundColor: 'rgb(255, 206, 86 ,0.5)',
          borderColor: 'rgb(255, 206, 86 ,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(255, 206, 86 ,0.8)',
          hoverBorderColor: 'rgb(255, 206, 86 ,1)',
          data: this.props.data[index][2]
        },
        {
          label: "Brisbane",
          backgroundColor: 'rgb(67, 242, 96 ,0.5)',
          borderColor: 'rgb(67, 242, 96 ,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(67, 242, 96 ,0.8)',
          hoverBorderColor: 'rgb(67, 242, 96 ,1)',
          data: this.props.data[index][3]
        }
      ]
    };
    return( <div className="mb-3">
              <div className="display-4 text-dark text-center my-3">Number of tweets for different cities in different time periods of {years[index]}</div>
              <Bar data={data} />
            </div>
    );
  }
}
