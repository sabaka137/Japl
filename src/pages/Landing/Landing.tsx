import { ContentContainer } from '../../components/Common'
import {
    HeroContainer,
    HeroImg,
    HeroText,
    HeroTextSub,
    HeroWrapper,
    LandingContainer,
} from './style'

import About from './components/About'
import HowWork from './components/HowWork'
import TeacherBlock from './components/TeacherBlock'
import StudentBlock from './components/StudentBlock'

import LandingHero from '../../assets/images/LandingHero.jpg'


export const Landing = () => {
    return (
        <div
            style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0px 0px 100px',
                background: '#f3f3f3',
            }}
        >
            <LandingContainer>
                <HeroWrapper>
                    <HeroContainer>
                        <HeroText>Speak confidently in any language</HeroText>
                        <HeroTextSub>with tutors from all over the world</HeroTextSub>
                    </HeroContainer>
                    <HeroImg>
                        <img
                            src={LandingHero}
                        />
                    </HeroImg>
                </HeroWrapper>

                <About />
                <HowWork />
                <TeacherBlock />
                <StudentBlock />
            </LandingContainer>
        </div>
    )
}
