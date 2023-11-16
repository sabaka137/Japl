import axios from "axios";
import API from "..";
import { ShorkKanji } from "../../types/Vocabulary/Kanji";
//TODO:api-key в .env
const headers = {
	"content-type": "application/octet-stream",
	"X-RapidAPI-Key": "7f803d46cfmshc54ce1c75e03b98p187d0ejsn9905e1b93caa",
	"X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
};
export const SearchAPI = {
	BasicSearch(data: string) {
		return axios.get(
			`https://kanjialive-api.p.rapidapi.com/api/public/search/${data}`,
			{ headers }
		);
	},
	GetKanjiDetails(kanji: ShorkKanji[]|[]) {
		//fix-type
		let arr: any = [];
		kanji.forEach((el: ShorkKanji) => {
			arr.push(
				axios.get(
					`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${el.kanji.character}`,
					{ headers }
				)
			);
		});
		return axios.all(arr);
	},
};
