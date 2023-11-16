import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VocabularyAPI } from "../../api/services/VocabularyService";
import { Kanji } from "../../types/Vocabulary/Kanji";
export const loadData = createAsyncThunk("vocabulary/getData", async () => {
	try {
		const response = await VocabularyAPI.getVocabulary();
		return response.data;
	} catch (e) {}
});

export const LoadSelectedKanji = createAsyncThunk(
	"vocabulary/getSelectedKanji",
	async (kanji: string) => {
		try {
			const response = await VocabularyAPI.geCurrentKanji(kanji);
			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
);

type GroupState = {
	kanjiList: Kanji[] | null;
	isLoading: boolean;
	currentKanji: Kanji | null;
	selectedLoad: boolean;
};
const initialState: GroupState = {
	kanjiList: null,
	currentKanji: null,
	isLoading: false,
	selectedLoad: false,
};
const VocabularySlice = createSlice({
	name: "vocabulary",
	initialState,
	reducers: {
		setCurrentKanji(state, action) {
			state.currentKanji = state!.kanjiList!.filter(
				(el) => el.kanji.character === action.payload
			)[0];
		},
		Search(state, action) {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadData.fulfilled, (state, action: PayloadAction<Kanji[]>) => {
				state.kanjiList = action.payload;
				state.isLoading = false;
			})

			.addCase(LoadSelectedKanji.pending, (state) => {
				state.selectedLoad = false;
			})
			.addCase(LoadSelectedKanji.fulfilled, (state, action: PayloadAction<Kanji>) => {
				state.currentKanji = action.payload;
				state.selectedLoad = true;
			});
	},
});

export const { setCurrentKanji, Search } = VocabularySlice.actions;

export default VocabularySlice.reducer;
