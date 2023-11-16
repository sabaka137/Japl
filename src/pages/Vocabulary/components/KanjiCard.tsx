import React, { FC, useState } from "react";
import {
	Item,
	ItemInfo,
	Kanji,
	ItemTranslation,
	KanjiInf,
	KanjiMeaning,
	ReadingType,
	ReadingJap,
	ReadingRom,
	Reading,
	ReadingContainer,
	Test,
} from "./style";
import { Flex } from "../../../components/Common";



import { ICollection } from "../../../types/Collections/CollectionType";

type Iprops = {
	props: any;
	groups: ICollection[];
};
export const KanjiCard: FC<Iprops> = ({ props, groups }) => {

	const [modal, setModal] = useState(false);
	function handleClick(e: any) {
		/**
		 * dispatch(
			CollectionSliceAsyncActions.AddToCollection({
				id: 22,
				meaning: props.kanji.meaning.english,
				reading: props.kanji.kunyomi.hiragana,
				termin: props.kanji.character,
			})
		);
		 */
	}

	return (
		<>
			<Item>
				<ItemInfo>
					<Flex align="center">
						<Kanji>{props.kanji.character}</Kanji>
						<KanjiInf>
							<div>
								<span>writen with</span> 4 strokes
							</div>
							<div>
								<span>taught in </span>grade 1
							</div>
						</KanjiInf>
					</Flex>
					<div>JLPT N5</div>
				</ItemInfo>
				<ItemTranslation>
					<KanjiMeaning>{props.kanji.meaning.english} </KanjiMeaning>
					<div>
						<Reading>
							<ReadingType>Kun</ReadingType>
							<Test>
								<ReadingContainer>
									<ReadingJap>{props.kanji.kunyomi.hiragana}</ReadingJap>
									<ReadingRom>{props.kanji.kunyomi.romaji}</ReadingRom>
								</ReadingContainer>
							</Test>
						</Reading>
						<Flex align="center">
							<ReadingType>On</ReadingType>
							<ReadingContainer>
								<ReadingJap>{props.kanji.onyomi.katakana}</ReadingJap>
								<ReadingRom>{props.kanji.onyomi.romaji}</ReadingRom>
							</ReadingContainer>
						</Flex>
					</div>
				</ItemTranslation>

				<div
					style={{ width: "100px", fontSize: "5rem", background: "red" }}
					onClick={(e) => setModal(true)}
				>
					&
				</div>
			</Item>
			{/**{modal && <AddKanjiModal groups={groups} kanji={props.kanji} />}
			 */}
		</>
	);
};

export default KanjiCard;
