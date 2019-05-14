import {CHANGE_CHART,CHANGE_YEAR} from '../utils/constants';
import chartsData from '../../data/chartsData2.json';

const years=["2014","2015","2019"];

const INITIAL_STATE = {
  currentChart:"BarChart",
  chartsData,
  year:years[0]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_CHART:
    console.log(CHANGE_CHART,action);
      return ({...state,currentChart:action.payload.name});
    case CHANGE_YEAR:
      console.log(CHANGE_YEAR,action)
      return ({...state,year:action.payload.value});
    default:
      return state;
  }
}
