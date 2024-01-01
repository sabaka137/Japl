import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SearchAPI } from '../../api/services/SearchService'

export const BasicSearch = createAsyncThunk(
    'search/BasicSearch',
    async (data: string) => {
        try {
            const response = await SearchAPI.BasicSearch(data)

            const detailResponse = await SearchAPI.GetKanjiDetails(
                response.data
            )
            return detailResponse.map((el: any) => el.data)
        } catch (e) {
            console.log(e)
        }
    }
)
type GroupState = {
    searchResults: any[] | null | undefined
    isLoad: boolean
}
const initialState: GroupState = {
    searchResults: null,
    isLoad: false,
}
const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setLoad(state) {
            state.isLoad = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(BasicSearch.pending, (state, action) => {
                state.isLoad = false
            })
            .addCase(BasicSearch.fulfilled, (state, action) => {
                state.searchResults = action.payload
                state.isLoad = true
            })
    },
})

export const { setLoad } = SearchSlice.actions

export default SearchSlice.reducer
