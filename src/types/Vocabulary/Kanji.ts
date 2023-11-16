export interface Kanji {
    dick: string
    dicn: string
    examples: examples[]
    grade: number
    hint_group: number
    ka_id: string
    ka_utf: string
    kanji: kanji
    kname: string
    kstroke: number
    kunyomi: string
    kunyomi_ja: string
    kunyomi_ja_search: string[]
    kunyomi_ja_display: string
    kunyomi_search: string[]
    luminous: string
    meaning: string
    meaning_search: string[]
    mn_hint: string
    onyomi: string
    onyomi_ja: string
    onyomi_ja_search: string[]
    onyomi_search: string[]
    rad_meaning: string
    rad_meaning_search: string[]
    rad_name: string
    rad_name_file: string
    rad_name_ja: string
    rad_name_ja_search: string[]
    rad_order: number
    rad_position: string
    rad_position_ja: string
    rad_position_ja_search: string[]
    rad_position_search: string[]
    rad_stroke: number
    rad_utf: string
    radical: radical
    references: references
    stroketimes: number[]
    textbook_search: string[]
    txt_books: books
    _id: string
    _rev: string
}

export type examples = {
    japanese: string
    meaning: { english: string }
    audio: {
        opus: string
        mp3: string
        ogg: string
        aac: string
    }
}
export type ShorkKanji = {
    kanji: { character: string; stroke: number }
    radical: { character: string; stroke: number; order: number }
}
type kanji = {
    character: string
    kunyomi: { romaji: string; hiragana: string }
    meaning: { english: string }
    onyomi: { romaji: string; katakana: string }
    strokes: { count: number; timins: number[]; images: string[] }
    video: {
        mp4: string
        poster: string
        webm: string
    }
}

type radical = {
    character: string
    image: string
    meaning: { english: string }
    name: { hiragana: string; romaji: string }
    position: { hiragana: string; romaji: string; icon: string }
    strokes: number
}

type references = {
    classic_nelson: string
    grade: number
    kodansha: string
}

type books = {
    chapter: string
    txt_bk: string
}
