import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { examples } from '../../../types/Vocabulary/Kanji'

import { ExampleContainer } from './style'
import AddKanjiModal from '../../../components/Modal/AddKanjiModal'
import { IoMdVolumeMute, IoMdVolumeHigh } from 'react-icons/io'
import { BiBookAdd } from 'react-icons/bi'
import { Flex, Text } from '../../../components/Common'

interface Props {
    exampleItem: examples
}

export const ExampleCard = ({ exampleItem }: Props) => {
    const [modal, setModal] = useState<boolean>(false)
    const [playing, setPlaying] = useState<boolean>(false)
    const [audio] = useState(new Audio(exampleItem.audio.mp3))
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [playing])
    return (
        <ExampleContainer>
            <div>
                <Text inline ff="Noto Sans JP" fz={'1.3rem'} fw={'400'}>
                    {exampleItem.japanese}
                </Text>
                <Text inline fz={'1.3rem'} margin={'0px 20px 0px 10px'}>
                    —
                </Text>
                <Text
                    inline
                    fw={'400'}
                    fz={'1.3rem'}
                    color="#282E3E"
                    ff="Nanum Gothic"
                >
                    {exampleItem.meaning.english}
                </Text>
            </div>
            <Flex gap={'10px'}>
                <Flex align="center" onClick={() => setModal(true)}>
                    <BiBookAdd color="#282E3E" />{' '}
                </Flex>
                <Flex
                    align="center"
                    style={{cursor:'pointer'}}
                    onClick={() => (setPlaying(true), audio.play())}
                >
                    {playing ? (
                        <IoMdVolumeHigh color="#282E3E" />
                    ) : (
                        <IoMdVolumeMute color="#282E3E" />
                    )}
                </Flex>
            </Flex>
            {modal &&
                createPortal(
                    <AddKanjiModal example={exampleItem} />,
                    document.body
                )}
        </ExampleContainer>
    )
}
