import styled from "styled-components"

const LandingWrapper = styled.div`
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const TitleWrapper = styled.div`
    widht: 100%;
    max-width: 1000px;
    text-align: center;
    margin: 2rem;

`
const DescriptionWrapper = styled.div`
    widht: 100%;
    max-width: 1000px;
    text-align: center;

`
const TitleText = styled.h1`
    height: 3rem;
`
const DescriptionText = styled.h2`
    height: 1.25rem;
`

const Landing = () => {

    return (

        <LandingWrapper>
            <TitleWrapper>
                <TitleText>
                    Welcome to the Strategy Game!
                </TitleText>
            </TitleWrapper>
            <DescriptionWrapper>
                <DescriptionText>
                    Please login to begin your journey...
                </DescriptionText>
            </DescriptionWrapper>
        </LandingWrapper>
    );
}

export default Landing