import { useState } from 'react'
import {
    CardBack,
    CardFront,
    CollectionReading,
    CollectionTermin,
    GameContainer,
    GameMenu,
    GameWindow,
    LeftArrow,
    RightArrow,
} from './style'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { ICollection } from '../../../types/Collections/CollectionType'
import { Text } from '../../../components/Common'

export interface Props {
    collection: ICollection | null
}

export const FlashcardGame = ({ collection }: Props) => {
    const [index, setIndex] = useState(1)
    const [isTerm, setIsTerm] = useState(false)
    const [animation, setAnimation] = useState('')

    return (
        <GameContainer>
            <GameWindow onClick={() => setIsTerm(!isTerm)}>
                <CardFront
                    animation={animation}
                    onAnimationEnd={() => setAnimation('')}
                    isTerm={isTerm}
                >
                    <CollectionTermin>
                        {collection?.termins[index - 1]?.termin}
                    </CollectionTermin>
                    <CollectionReading>
                        {collection?.termins[index - 1]?.reading}
                    </CollectionReading>
                </CardFront>

                <CardBack
                    onAnimationEnd={() => setAnimation('')}
                    animation={animation}
                    isTerm={isTerm}
                >
                    <div>{collection?.termins[index - 1]?.meaning}</div>
                </CardBack>
            </GameWindow>
            <GameMenu>
                <LeftArrow
                    disabled={index - 1 < 0}
                    isDisabled={index - 1 <= 0}
                    onClick={() =>
                        index - 1 > 0 &&
                        (setIsTerm(false),
                        setIndex(index - 1),
                        setAnimation('right'))
                    }
                >
                    <AiOutlineArrowLeft />
                </LeftArrow>
                <Text color="#586380">
                    {index}/{collection?.termins.length}
                </Text>
                <RightArrow
                    disabled={index - 1 < 0}
                    isDisabled={index + 1 > collection!.termins.length}
                    onClick={() =>
                        typeof collection != 'undefined' &&
                        index + 1 <= collection!.termins.length &&
                        (setIsTerm(false),
                        setAnimation('left'),
                        setIndex(index + 1))
                    }
                >
                    <AiOutlineArrowRight />
                </RightArrow>
            </GameMenu>
        </GameContainer>
    )
}

export default FlashcardGame
