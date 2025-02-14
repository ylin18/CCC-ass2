import React from "react";
import {Bar} from 'react-chartjs-2';

export default class Chart extends React.Component {
  // render
  render() {
    var data = {
      labels: ['Melbourne','Sydney','Brisbane','Perth'],
      datasets: [
        {
          label: '2014',
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.8)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.data[0]
        },
        {
          label: '2015',
          backgroundColor: 'rgb(66,134,244,0.5)',
          borderColor: 'rgb(66,134,244,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(66,134,244,0.8)',
          hoverBorderColor: 'rgb(66,134,244,1)',
          data: this.props.data[1]
        },
        {
          label: '2019',
          backgroundColor: 'rgb(255, 206, 86 ,0.5)',
          borderColor: 'rgb(255, 206, 86 ,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(255, 206, 86 ,0.8)',
          hoverBorderColor: 'rgb(255, 206, 86 ,1)',
          data: this.props.data[2]
        },
        {
          label: 'Aurin 2014-15',
          backgroundColor: 'rgb(237,184,28,0.5)',
          borderColor: 'rgb(237,184,28,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(237,184,28,0.8)',
          hoverBorderColor: 'rgb(237,184,28,1)',
          data: [19.027, 21.214, 18.871,18.289]
        }

      ]
    };
    return (
      <div>
        <div className="display-4 text-dark text-center my-3">Percentage of people who are considered related to obesity according to the tweets in 2014, 2015 & 2019</div>
        <Bar data={data} />
      </div>
    );
  }
}
