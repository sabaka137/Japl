import { useEffect, FC, useState } from 'react'
import {
    Container,
    ContentContainer,
    PageWrapper,
    Text,
} from '../../components/Common'

import { CollectionCard } from './components/CollectionCard'
import CreateCard from './components/CreateCard'
import { CollectionSliceAsyncActions } from '../../redux/reducers/CollectionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'

import Welcome from './components/Welcome'
import BookRecomendation from './components/BookRecomendation'
import { CollectionContainer, CollectionContent } from './style'
import { ChangeTitle } from '../../utils/ChangeTitle'
import SkeletonCard from './components/SkeletonCard'

export const Groups: FC = () => {
    const [isReady, setReady] = useState(false)
    const dispatch = useAppDispatch()
    const { collections, isLoading } = useAppSelector(
        (state) => state.collections
    )
    useEffect(() => {
        ChangeTitle('Japl | Collections')
        dispatch(CollectionSliceAsyncActions.GetCollections())
    }, [])
    useEffect(() => {
        setTimeout(() => {
            if (!isLoading) {
                setReady(true)
            }
        }, 500)
    }, [isLoading])
    return (
        <PageWrapper>
            <CollectionContent>
                <CollectionContainer>
                    <div>
                        <Text fw={'bold'} color="#2E3856" fz={'1.3rem'}>
                            Available groups
                        </Text>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexWrap: 'wrap',
                                gap: '10px',
                                marginTop: '30px',
                            }}
                        >
                            {isReady ? (
                                collections.length != 0 &&
                                collections?.map((collection) => (
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                    />
                                ))
                            ) : (
                                <>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </>
                            )}

                            <CreateCard />
                        </div>
                    </div>
                    <Welcome />
                    <BookRecomendation />
                </CollectionContainer>
            </CollectionContent>
        </PageWrapper>
    )
}
