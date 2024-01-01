import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { ICollection } from '../../../../types/Collections/CollectionType'

import {
    CancelImport,
    CardContainer,
    ConfirmButton,
    DragButtons,
    ImportTextArea,
    ItemContainer,
    ModalWrapper,
    SeparatorContainer,
    SeparatorInput,
    SeparatorItem,
    SeparatorType,
} from './style'
import {
    Container,
    ContentContainer,
    Flex,
    Text,
} from '../../../../components/Common'
import CardExample from './CardExample'
import {
    UseFieldArrayPrepend,
    UseFieldArrayRemove,
    UseFormGetValues,
    UseFormSetValue,
} from 'react-hook-form'

type Props = {
    setGroup: Dispatch<SetStateAction<ICollection>>
    group: ICollection
    setImportModal: Dispatch<SetStateAction<boolean>>
    getValues: UseFormGetValues<{
        name: string
        description: string
        termins: {
            id: number
            termin: string
            meaning: string
            reading: string
            isValide: boolean
        }[]
    }>
    setValue: UseFormSetValue<{
        name: string
        description: string
        termins: {
            id: number
            termin: string
            meaning: string
            reading: string
            isValide: boolean
        }[]
    }>
    prepend: UseFieldArrayPrepend<
        {
            name: string
            description: string
            termins: {
                id: number
                termin: string
                meaning: string
                reading: string
                isValide: boolean
            }[]
        },
        'termins'
    >
    remove: UseFieldArrayRemove
}
type Card = {
    id: number
    order: number
    text: string
}
export const ImportModal = ({
    group,
    setImportModal,
    getValues,
    remove,
    prepend,
}: Props) => {
    const [card, setCard] = useState<Card[]>([
        { id: 1, order: 1, text: 'termin' },
        { id: 2, order: 2, text: 'reading' },
        { id: 3, order: 3, text: 'meaning' },
    ])
    const [currentCard, setCurrentCard] = useState({
        id: 1,
        order: 1,
        text: 'termin',
    })
    const [tempCard, setTempCard] = useState<
        { id: number; reading: string; meaning: string; termin: string }[]
    >([])
    const [separator, setSeparator] = useState('tab')
    const [rowSeparator, setRowSeparator] = useState('\n')
    const [rowCustom, setRowCustom] = useState('')
    const [stringCustom, setStringCustom] = useState('')
    const [textArea, setTextArea] = useState('')
    function dragStartHandler(card: Card) {
        setCurrentCard(card)
    }
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault(),
            ((e.target as HTMLDivElement).style.background = '#2e3856;')
    }
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        ;(e.target as HTMLDivElement).style.background = '#2e3856;'
    }
    function dragDropHandler(
        e: React.DragEvent<HTMLDivElement>,
        card1: { id: number; order: number; text: string }
    ) {
        e.preventDefault()
        setCard(
            card.map((el) => {
                if (el.order === card1.order) {
                    return { ...el, order: currentCard.order }
                }
                if (el.id === currentCard.id) {
                    return { ...el, order: card1.order }
                }
                return el
            })
        ),
            ((e.target as HTMLDivElement).style.background = '#2e3856;')
    }
    function sortCards(
        a: { id: number; order: number; text: string },
        b: { id: number; order: number; text: string }
    ) {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    function generateCard(e: string) {
        const tempArray: {
            id: number
            termin: string
            meaning: string
            reading: string
        }[] = []
        let arr
        e.split(rowSeparator).forEach((el: string, index: number) => {
            arr = el.split(separator === 'tab' ? '	' : separator)
            const temp = {
                id: group.termins[group.termins.length - 1].id + index + 1,
                termin:
                    arr[card.find((el1) => el1.text === 'termin')!.order - 1] ||
                    '',
                meaning:
                    arr[
                        card.find((el1) => el1.text === 'meaning')!.order - 1
                    ] || '',
                reading:
                    arr[
                        card.find((el1) => el1.text === 'reading')!.order - 1
                    ] || '',
            }
            tempArray.push(temp)
        })
        setTempCard(tempArray)
    }
    function confirmImport() {
        tempCard.forEach((card) =>
            prepend({
                id: card.id,
                reading: card.reading,
                termin: card.termin,
                meaning: card.meaning,
                isValide: false,
            })
        )
        getValues('termins').forEach((item, index) => {
            if (tempCard.length < 3) return
            if (
                item.meaning === '' &&
                item.reading === '' &&
                item.termin === ''
            ) {
                remove(index)
            }
        })

        setImportModal(false)
    }
    useEffect(() => {
        generateCard(textArea)
    }, [separator, rowSeparator, card])
    return (
        <ModalWrapper>
            <ContentContainer>
                <Container w={80} m={'0 auto'}>
                    <CancelImport onClick={() => setImportModal(false)}>
                        Cancel import
                    </CancelImport>

                    <Flex justify="space-between">
                        {card.sort(sortCards).map((el) => (
                            <DragButtons
                                key={el.id}
                                draggable
                                onDragStart={(e) => dragStartHandler(el)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dragDropHandler(e, el)}
                            >
                                {el.text}
                            </DragButtons>
                        ))}
                    </Flex>
                    <Text margin={'0px 0px 10px'} color="#2E3856">
                        <Text inline fw={'bold'}>
                            Import data
                        </Text>
                        . Copy and paste your data (from Word, Excel, Google
                        Docs, etc.)
                    </Text>
                    <div>
                        <ImportTextArea
                            onChange={(e) => (
                                generateCard(e.target.value),
                                setTextArea(e.target.value)
                            )}
                            rows={6}
                            placeholder={`${
                                card.find((el) => el.order === 1)!.text
                            } 1${separator === 'tab' ? '  ' : separator}${
                                card.find((el) => el.order === 2)!.text
                            } 1${separator === 'tab' ? '  ' : separator}${
                                card.find((el) => el.order === 3)!.text
                            } 1${rowSeparator}${
                                rowSeparator !== '\n' ? '\n' : ''
                            }${card.find((el) => el.order === 1)!.text} 2${
                                separator === 'tab' ? '  ' : separator
                            }${card.find((el) => el.order === 2)!.text} 2${
                                separator === 'tab' ? '  ' : separator
                            }${
                                card.find((el) => el.order === 3)!.text
                            } 2${rowSeparator}`}
                        ></ImportTextArea>
                    </div>
                    <Flex m={'40px 0px'} justify="space-between">
                        <Flex wrap="wrap" gap={'30px'}>
                            <SeparatorContainer>
                                <SeparatorType>Between the terms</SeparatorType>
                                <ItemContainer>
                                    <SeparatorItem>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="tab"
                                                value={'tab'}
                                                checked={separator === 'tab'}
                                                onChange={(e) =>
                                                    setSeparator(e.target.value)
                                                }
                                            />
                                            <label htmlFor={'tab'}>Tab</label>
                                        </div>
                                    </SeparatorItem>
                                    <SeparatorItem>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="comma"
                                                value={','}
                                                checked={separator === ','}
                                                onChange={(e) =>
                                                    setSeparator(e.target.value)
                                                }
                                            />
                                            <label htmlFor={'comma'}>
                                                comma
                                            </label>
                                        </div>
                                    </SeparatorItem>
                                    <SeparatorItem>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id={stringCustom}
                                                value={stringCustom}
                                                checked={
                                                    separator === stringCustom
                                                }
                                                onChange={(e) =>
                                                    setSeparator(e.target.value)
                                                }
                                            />
                                            <label
                                                htmlFor={stringCustom}
                                            ></label>
                                        </div>
                                        <SeparatorInput
                                            className="stringCustom"
                                            value={stringCustom}
                                            onChange={(e) => (
                                                setStringCustom(e.target.value),
                                                setSeparator(e.target.value)
                                            )}
                                        />
                                    </SeparatorItem>
                                </ItemContainer>
                            </SeparatorContainer>
                            <SeparatorContainer>
                                <SeparatorType>Between the lines</SeparatorType>
                                <ItemContainer>
                                    <SeparatorItem>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="linebreak"
                                                value={'\n'}
                                                checked={rowSeparator === '\n'}
                                                onChange={(e) =>
                                                    setRowSeparator(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label htmlFor={'linebreak'}>
                                                Line break
                                            </label>
                                        </div>
                                    </SeparatorItem>
                                    <SeparatorItem>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="semicolon"
                                                value={';'}
                                                checked={rowSeparator === ';'}
                                                onChange={(e) =>
                                                    setRowSeparator(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label htmlFor={'semicolon'}>
                                                Semicolon
                                            </label>
                                        </div>
                                    </SeparatorItem>
                                    <Flex>
                                        <SeparatorItem>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={rowCustom}
                                                    value={rowCustom}
                                                    checked={
                                                        rowSeparator ===
                                                        rowCustom
                                                    }
                                                    onChange={(e) =>
                                                        setRowSeparator(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={rowCustom}
                                                ></label>
                                            </div>
                                            <SeparatorInput
                                                className="rowCustom"
                                                value={rowCustom}
                                                onChange={(e) => (
                                                    setRowCustom(
                                                        e.target.value
                                                    ),
                                                    setRowSeparator(
                                                        e.target.value
                                                    )
                                                )}
                                            />
                                        </SeparatorItem>
                                    </Flex>
                                </ItemContainer>
                            </SeparatorContainer>
                        </Flex>

                        <ConfirmButton onClick={() => confirmImport()}>
                            Import
                        </ConfirmButton>
                    </Flex>
                    <CardContainer count={tempCard.length > 6}>
                        {tempCard.map((el, index) => (
                            <CardExample
                                key={index}
                                index={index + 1}
                                card={el}
                            />
                        ))}
                    </CardContainer>
                </Container>
            </ContentContainer>
        </ModalWrapper>
    )
}

export default ImportModal
