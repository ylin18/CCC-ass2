import React from "react";
import {connect} from "react-redux";
import Chart from "./charts/Chart";
import PieChart from "./charts/PieChart";
import TimeBarChart from "./charts/TimeBarChart";
import Header from './Header';
import {changeChart,changeYear} from "../actions";

var years = ["2014","2015","2019"];

class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.toBarChart = () => {
      this.props.changeChart("BarChart");
    };
    this.toPieChart = () => {
      this.props.changeChart("PieChart");
    };
    this.toTimeBarChart = () => {
      this.props.changeChart("TimeBarChart");
    };
    this.changeYear = e => {
      this.props.changeYear(e.target.value);
    };
  }

  calPieChart(){
    const chartsData = this.props.chart.chartsData.collections;
    // console.log("currentChart",this.props.chart);
    var pieChart = [];
    var count = 0;
    chartsData.map(year=>{
      pieChart.push([]);
      year.cities.map(city=>{
        var labels_d = [];
        var data_d = [];
        city.foodtags.map(e=>{
          labels_d.push(e[0]);
          data_d.push(e[1])
        });
        pieChart[count].push({
          city:city.city,
          labels:labels_d,
          data:data_d
        });
      })
      count += 1;
    });
    return pieChart;
  }

  calBarChart(){
    const chartsData = this.props.chart.chartsData.collections;
    // console.log("currentChart",this.props.chart);
    var barChart = [];
    var count = 0;
    chartsData.map(year=>{
      barChart.push([]);
      year.cities.map(city=>{
        barChart[count].push(city.num*100/city.plpnum);
      })
      count += 1;
    });
    return barChart;
  }

  calTimeBarChart(){
    const chartsData = this.props.chart.chartsData.collections;
    // console.log("currentChart",this.props.chart);
    var barChart = [];
    var count = 0;
    var list = ["Timeblock1 0-3","Timeblock2 3-6","Timeblock3 6-9","Timeblock4 9-12","Timeblock5 12-15","Timeblock6 15-18","Timeblock7 18-21","Timeblock8 21-0"];
    chartsData.map(year=>{
      barChart.push([]);
      year.cities.map(city=>{
        var data_d = [];
        var timeblocks = city.timeblocks;
        for(var i = 0; i< list.length;i++){
          data_d.push(timeblocks[list[i]]*100/city.tweetnum);
        }
        barChart[count].push(data_d);
        // console.log(city);
      })
      count += 1;
    });
    return barChart;
  }

  renderChart(){
    var count = 0;
    var yearIndex = 0;
    if(this.props.chart.year==="2014"){
      yearIndex = 0;
    }else if(this.props.chart.year==="2015"){
      yearIndex = 1;
    }else if(this.props.chart.year==="2019"){
      yearIndex = 2;
    }

    if(this.props.chart.currentChart === "BarChart"){
      return(<Chart data = {this.calBarChart()}/>);
    }else if(this.props.chart.currentChart === "TimeBarChart"){
      return(<TimeBarChart data = {this.calTimeBarChart()} index={yearIndex}/>);
    } else if(this.props.chart.currentChart === "PieChart"){
      var pieChart_d = this.calPieChart();
      return(
        <div className="mb-2">
          <div className="display-4 text-dark text-center mt-2">Top 5 food tags for different cities in {years[yearIndex]}</div>
          <div className="row mt-2">
            <div className="col">
              <PieChart pieChart_d = {pieChart_d[yearIndex][0]}/>
            </div>
            <div className="col">
              <PieChart pieChart_d = {pieChart_d[yearIndex][1]}/>
            </div>

          </div>
          <div className="row mt-2">
            <div className="col">
              <PieChart pieChart_d = {pieChart_d[yearIndex][2]}/>
            </div>
            <div className="col">
              <PieChart pieChart_d = {pieChart_d[yearIndex][3]}/>
            </div>
          </div>
        </div>
        );
    }
  }

  render() {
    const year = this.props.chart.year;
    return (
      <div>
        <Header/>
        <div className="container mt-100">
          <div className="input-group">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.chart.currentChart}</button>
            <div className="dropdown-menu">
              <button className="dropdown-item " onClick={this.toBarChart}>BarChart</button>
              <button className="dropdown-item" onClick={this.toPieChart}>PieChart</button>
              <button className="dropdown-item" onClick={this.toTimeBarChart}>TimeBarChart</button>

            </div>
          </div>
          <div className="input-group mt-2">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.chart.year}</button>
            <div className="dropdown-menu">
              <button className="dropdown-item" value={years[0]} onClick={this.changeYear}>{years[0]}</button>
              <button className="dropdown-item" value={years[1]} onClick={this.changeYear}>{years[1]}</button>
              <button className="dropdown-item" value={years[2]} onClick={this.changeYear}>{years[2]}</button>
            </div>
          </div>
          {this.renderChart()}
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    chart:state.chart
  };
}

export default connect(mapStateToProps,{changeChart,changeYear})(MapContainer);
