import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CollectionAPI } from '../../api/services/CollectionService'
import {
    CollectionTermin,
    ICollection,
} from '../../types/Collections/CollectionType'

export const CollectionSliceAsyncActions = {
    GetCollections: createAsyncThunk('collection/GetCollections', async () => {
        try {
            const response = await CollectionAPI.GetCollections()
            const result = await response.data
            return result
        } catch (e) {
            console.log(e)
        }
    }),
    GetCollection: createAsyncThunk(
        'collection/GetCollection',
        async (id: string) => {
            try {
                const response = await CollectionAPI.GetCollection(id)
                const result = await response.data
                return result
            } catch (e) {
                console.log(e)
            }
        }
    ),
    DeleteCollection: createAsyncThunk(
        'collection/DeleteCollection',
        async (id: number, { dispatch }) => {
            try {
                await CollectionAPI.DeleteCollection(id)
                dispatch(GroupActions.DeleteCollection(id))
            } catch (e) {
                console.log(e)
            }
        }
    ),
    UpdateCollection: createAsyncThunk(
        'collection/UpdateCollection',
        async (data: { id: string; group: ICollection }, { dispatch }) => {
            try {
                await CollectionAPI.UpdateCollection(data)
                dispatch(CollectionSliceAsyncActions.GetCollections())
            } catch (e) {
                console.log(e)
            }
        }
    ),
    GetCollectionNames: createAsyncThunk(
        'collection/GetCollectionNames',
        async () => {
            try {
                const response = await CollectionAPI.GetCollectionNames()
                const result = await response.data
                return result
            } catch (e) {
                console.log(e)
            }
        }
    ),
    CreateCollection: createAsyncThunk(
        'collection/create',
        async (group: ICollection, { dispatch }) => {
            try {
                await CollectionAPI.CreateCollection(group)
                dispatch(CollectionSliceAsyncActions.GetCollections())
            } catch (e) {
                console.log(e)
            }
        }
    ),
    AddToCollection: createAsyncThunk(
        'vocabulary/addToCollection',
        async (data: { kanji: CollectionTermin; name: string }) => {
            try {
                const response = await CollectionAPI.AddToCollection(data)
                return response.data
            } catch (e) {
                console.log(e)
            }
        }
    ),
}

type CollectionState = {
    collections: ICollection[]
    currentCollection: ICollection | null
    isLoading: boolean
}
const initialState: CollectionState = {
    collections: [],
    currentCollection: null,
    isLoading: true,
}

const CollectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        getCurrentGroup(state, action: PayloadAction<number>) {
            state.currentCollection = state.collections.filter(
                (collection) => action.payload === collection.id
            )[0]
        },
        DeleteCollection(state, action: PayloadAction<number>) {
            state.collections = state.collections.filter(
                (collection) => collection.id !== action.payload
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            CollectionSliceAsyncActions.GetCollections.pending,
            (state) => {
                state.isLoading = true
            }
        )
        builder.addCase(
            CollectionSliceAsyncActions.GetCollections.fulfilled,
            (state, action: PayloadAction<ICollection[]>) => {
                state.collections = action.payload
                state.isLoading = false
            }
        )
        builder.addCase(
            CollectionSliceAsyncActions.GetCollection.pending,
            (state) => {
                state.isLoading = true
            }
        )
        builder.addCase(
            CollectionSliceAsyncActions.GetCollection.fulfilled,
            (state, action: PayloadAction<ICollection>) => {
                state.currentCollection = action.payload
                state.isLoading = false
            }
        )
    },
})

export const GroupActions = CollectionSlice.actions

export default CollectionSlice.reducer
