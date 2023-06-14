import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    location: null,
    coordinates: null,
    precip: null,
    tempr: null,
    min_tempr: null,
    max_tempr: null,
    date: null
}

export const locationSlice = createSlice({
    initialState,
    name: "location",
    reducers:{
        setlocation: (state, action)=>{
            state.location = action.payload;
        },
        setcoordinates:(state, action)=>{
            state.coordinates = action.payload;
        },
        setprecip:(state, action)=>{
            state.precip = action.payload;
        },
        settempr:(state, action)=>{
            state.tempr = action.payload;
        },
        setmin_tempr:(state, action)=>{
            state.min_tempr = action.payload;
        },
        setmax_tempr:(state, action)=>{
            state.max_tempr = action.payload;
        },
        setdate:(state, action)=>{
            state.date = action.payload
        }
    }
})

//Selector
export const locations = (state) => state.location.location;
export const coordinatess = (state) => state.location.coordinates;
export const precips = (state) => state.location.precip;
export const temprs = (state) => state.location.tempr;
export const min_temprs = (state) => state.location.min_tempr;
export const max_temprs = (state) => state.location.max_tempr;
export const dates = (state) => state.location.date;

export default locationSlice.reducer;
export const {setlocation,setcoordinates, setdate, setprecip, settempr, setmin_tempr, setmax_tempr} = locationSlice.actions