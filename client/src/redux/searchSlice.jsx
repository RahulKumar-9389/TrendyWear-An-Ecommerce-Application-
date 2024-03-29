import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    result: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.keyword = action.payload.keyword,
                state.result = action.payload.result
        }
    }

});

export const { searchProduct } = searchSlice.actions;
export default searchSlice.reducer;