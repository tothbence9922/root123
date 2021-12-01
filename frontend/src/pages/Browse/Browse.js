import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import { useState } from "react"
import styled from "styled-components"

const BrowseWrapper = styled.div`
    padding: 2rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const TitleWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    text-align: left;
    margin: 2rem;

`
const ListWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

`
const TitleText = styled.h1`
    height: 3rem;
`
const DescriptionText = styled.h2`
    height: 1.25rem;
`

const dummyData = [
    { "breeds": [{ "weight": { "imperial": "11.5 - 15.5", "metric": "5 - 7" }, "height": { "imperial": "11 - 16", "metric": "28 - 41" }, "id": 51, "name": "Border Terrier", "bred_for": "Fox bolting, ratting", "breed_group": "Terrier", "life_span": "12 - 14 years", "temperament": "Fearless, Affectionate, Alert, Obedient, Intelligent, Even Tempered", "reference_image_id": "HJOpge9Em" }], "id": "HJOpge9Em", "url": "https://cdn2.thedogapi.com/images/HJOpge9Em_1280.jpg", "width": 674, "height": 450 }, { "breeds": [{ "weight": { "imperial": "88 - 120", "metric": "40 - 54" }, "height": { "imperial": "23.5 - 27.5", "metric": "60 - 70" }, "id": 67, "name": "Cane Corso", "bred_for": "Companion, guard dog, and hunter", "breed_group": "Working", "life_span": "10 - 11 years", "temperament": "Trainable, Reserved, Stable, Quiet, Even Tempered, Calm", "reference_image_id": "r15m-lc4m" }], "id": "r15m-lc4m", "url": "https://cdn2.thedogapi.com/images/r15m-lc4m_1280.jpg", "width": 645, "height": 380 }, { "breeds": [], "id": "S1GWY_hr7", "url": "https://cdn2.thedogapi.com/images/S1GWY_hr7_1280.jpg", "width": 1024, "height": 683 }, { "breeds": [], "id": "D3R7H5v0o", "url": "https://cdn2.thedogapi.com/images/D3R7H5v0o.jpg", "width": 729, "height": 485 }, { "breeds": [{ "weight": { "imperial": "130 - 180", "metric": "59 - 82" }, "height": { "imperial": "25.5 - 27.5", "metric": "65 - 70" }, "id": 212, "name": "Saint Bernard", "bred_for": "Draft, search, rescue", "breed_group": "Working", "life_span": "7 - 10 years", "temperament": "Friendly, Lively, Gentle, Watchful, Calm", "reference_image_id": "_Qf9nfRzL" }], "id": "c2ROfi5fr", "url": "https://cdn2.thedogapi.com/images/c2ROfi5fr.jpg", "width": 1080, "height": 616 }]

const Browse = () => {

    const [caffs, setCaffs] = useState(dummyData)

    return (

        <BrowseWrapper>
            <TitleWrapper>
                <TitleText>
                    Browse
                </TitleText>
            </TitleWrapper>
            <ListWrapper>
                {
                    caffs.map((caff, idx) => (
                        <CaffPreview id={caff.id} name={caff.breeds[0] ? caff.breeds[0].name : `CAFF ${idx}`} src={caff.url} />
                    ))
                }
            </ListWrapper>
        </BrowseWrapper>
    );
}

export default Browse