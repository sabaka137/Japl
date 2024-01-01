import axios from 'axios'
import API from '..'

const headers = {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '7f803d46cfmshc54ce1c75e03b98p187d0ejsn9905e1b93caa',
    'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
}

export const VocabularyAPI = {
    getVocabulary() {
        return axios.get(
            'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all',
            {
                headers,
            }
        )
    },
    geCurrentKanji(kanji: string) {
        return axios.get(
            `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji}`,
            { headers }
        )
    },
}
