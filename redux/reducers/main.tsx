/*
import { AnyAction } from 'redux';
import * as t from '../types';

 const main =(state ={
    Ids:Array,
}, action: AnyAction) => {
    switch(action.type){
        case t.SET_IDS:
            return{ 
                ...state, 
                Ids: action.payload
            };
        default:
            return {...state};
    }
};

export default main;
*/

import { createSlice } from "@reduxjs/toolkit";
export const IdsSlice = createSlice({
name: "Ids",
initialState: {
    Ids: []
},
reducers:{
    set_Ids :(state,action) =>{
        state.Ids = action.payload;
    }
}
}

);

export const {set_Ids} = IdsSlice.actions;
export default IdsSlice.reducer;