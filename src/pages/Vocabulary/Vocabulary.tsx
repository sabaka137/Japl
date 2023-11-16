import React, { useEffect, useState } from "react";
import { VocabularyInput, VocabularyWrapper } from "./style";
import { Container, ContentContainer, Flex } from "../../components/Common";
import { KanjiCard } from "./components/KanjiCard";

import { Search, loadData } from "../../redux/reducers/VocabularySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { AiOutlineSearch } from "react-icons/ai";
import { CollectionSliceAsyncActions } from "../../redux/reducers/CollectionSlice";
function Vocabulary() {
	const dispatch = useAppDispatch();
	const { isLoading, kanjiList } = useAppSelector((state) => state.vocabulary);
	const [searcValue, setSearchValue] = useState("");
	const [groups, setGroups] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		kanjiList == null && dispatch(loadData());
		dispatch(CollectionSliceAsyncActions.GetCollections()).then((res) =>
			setGroups(res.payload)
		);
	}, []);

	return (
		<VocabularyWrapper>
			<ContentContainer>
				<Container w={80} m={"0 auto"}>
					<div>
						<VocabularyInput>
							<input
								onKeyDown={(e) => e.key == "Enter" && dispatch(Search(searcValue))}
								value={searcValue}
								onChange={(e) => setSearchValue(e.target.value)}
							></input>
							<AiOutlineSearch style={{ fontSize: "1.7rem" }} />
						</VocabularyInput>
					</div>
					<div>
						<button onClick={() => setPage(page - 1)}>prev</button>
						<button onClick={() => setPage(page + 1)}>next</button>
					</div>
					<button
						onClick={() => {
							dispatch(Search(searcValue));
						}}
					>
						search
					</button>
					{!isLoading ? (
						searcValue.length == 0 ? (
							kanjiList?.map(
								(el, index) =>
									index > (page - 1) * 10 &&
									index + 1 < page * 10 && <KanjiCard props={el} groups={groups} />
							)
						) : (
							<div>123</div>
						)
					) : (
						<div>Loader</div>
					)}
				</Container>
			</ContentContainer>
		</VocabularyWrapper>
	);
}

export default Vocabulary;
