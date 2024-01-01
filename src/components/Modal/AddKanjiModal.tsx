import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/hook'

import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'
import styled from 'styled-components'
import { examples } from '../../types/Vocabulary/Kanji'
const KanjiModalContainer = styled.div`
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -200px;
    background: #2e3856;
    color: white;
    box-sizing: border-box;
    padding: 20px;
`

const Kanji = styled.div`
    display: flex;

    font-size: 3rem;
`

const ModalSelect = styled.select`
    width: 100%;
    height: 50px;
    background: #0a092d;
    color: white;
    margin-top: 30px;
`
type Props = {
    example: examples
}

function AddKanjiModal({ example }: Props) {
    const [value, setValue] = useState('')
    const [groups, setGroups] = useState([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(CollectionSliceAsyncActions.GetCollections()).then((res) => {
            if (res.payload.length !== 0) {
                setGroups(res.payload)
                setValue(res.payload[0].name)
            } else {
                alert('предложить создать коллекцию')
            }
        })
    }, [])
    function handleClick() {
        const termin = example.japanese.split('（')[0]
        const reading = example.japanese.split('（')[1].slice(0, -1)

        dispatch(
            CollectionSliceAsyncActions.AddToCollection({
                kanji: {
                    id: 22,
                    meaning: example.meaning.english,
                    reading: reading,
                    termin: termin,
                },
                name: value,
            })
        )
    }
    return (
        <KanjiModalContainer>
            <ModalSelect onChange={(e) => setValue(e.target.value)}>
                {groups != null &&
                    groups?.map((el, index) => (
                        <option key={index}>тфьу</option>
                    ))}
            </ModalSelect>

            <div>
                {example?.japanese} - {example?.meaning.english}
            </div>
            <button onClick={() => handleClick()}>Dobavit</button>
        </KanjiModalContainer>
    )
}

export default AddKanjiModal
