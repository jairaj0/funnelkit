import { createSlice } from '@reduxjs/toolkit';

export const personSlice = createSlice({
    name : 'persons',
    initialState:{
        persons : [],
        isLoading : false
    },
    reducers: {
        getPersonsFetch : (state) =>{
            state.isLoading = true;
        },
        getPersonsSuccess : (state , action) => {
            state.persons = action.payload;
            state.isLoading = false;
        },
        getPeronsFailure : (state) => {
            state.isLoading = false
        },
        editedPersons : (state , action) => {
            state.persons = action.payload
        }
    }
})

export const {getPersonsFetch , getPersonsSuccess , getPeronsFailure , editedPersons} = personSlice.actions;
export default personSlice.reducer;