import {
  CHANGE_FEATURE,
  CHANGE_AURIN,
  SET_TIME,
  TIME_PERIODS
} from '../utils/constants';

const options = {
  Obesity:{
    layers : ['0-1k', '1k-2k', '2k-10k', '10k-50k', '50k-100k', '100k-150k', '150k-200k', '200k+'],
    colors : ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
  },
  Overweight:{
    layers : ['0-50k', '50k-100k', '100k-150k', '150k-200k', '200k-250k', '250k-300k',"300k-350k","350k"],
    colors : ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba','#6a51a3','#4a1486']
  }
};


const INITIAL_STATE = {
  name: "Hover over a state!",
  aurin: "Obesity",
  active: options.Obesity,
  time:24
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FEATURE:
      return {
        ...state,
        name:action.payload.name
       };
     case CHANGE_AURIN:
       console.log(CHANGE_AURIN,action);
       return {
         ...state,
         aurin:action.payload.name,
         active: options[action.payload.name]
        };
    case SET_TIME:
      console.log(SET_TIME,action.payload);
      return {
        ...state,
        time:action.payload.value
       };
    default:
      return state;
  }
}
