import { Button } from "@material-ui/core"
import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import CommentModal from "components/caff/Comment/CommentModal"
import URLS from "constants/URLS"
import { useState } from "react"
import AuthService from "services/Auth/AuthService"
import styled from "styled-components"

const CaffWrapper = styled.div`
    padding: 2rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const DetailsWrapper = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;

    padding: 0 1rem;

    border-radius: 11px;
    border: 1px solid lightgrey;
    box-shadow: 11px 11px 11px rgba(0, 0, 0, 0.3);
`

const TitleWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    text-align: left;
    margin: 2rem;

`
const TitleText = styled.h1`
    font-size: 3rem;
`
const MediaWrapper = styled.div`
    width: 100%;

    border-radius: 11px 11px 0 0;
    overflow: hidden;
    margin: 2rem 0 3rem 0;
`

const CaffMedia = styled.img`
    margin: 0 auto;
    width: 100%;
    height: auto;
`


const ButtonsRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row; 
    justify-content: space-around;
    margin: 1rem 0;
`

const DetailRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const DetailName = styled.p`
    font-size: 1rem;
    font-weight: 400;
`

const DetailValue = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
`

const dummyData = {
    id: '1',
    name: 'caff-1',
    thumbnail: 'https://cdn2.thedogapi.com/images/S1GWY_hr7_1280.jpg',
    userId: 'user-1',
    data: null,
    creator: 'caff-creator-1',
    createdAt: '2021-09-11',
    metaData: "sample_meta"
}

const Caff = () => {

    const [caff, setCaff] = useState(dummyData)

    const [res, setRes] = useState()
    const [err, setErr] = useState()
    const [loading, setLoadingl] = useState(false)

    const handleDownload = async () => {
        try {
            setLoadingl(true)
            const res = await axios.get(
                URLS.downloadCaff,
                {
                    headers: {
                        Authorization: AuthService.authHeader()
                    }
                }
            )
            setRes(res)
            setLoadingl(false)
        } catch (err) {
            setErr(err)
        }
    }

    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(!open) }

    return (

        <CaffWrapper>
            <DetailsWrapper>
                <TitleWrapper>
                    <TitleText>
                        {caff.name}
                    </TitleText>
                </TitleWrapper>
                <DetailRow>
                    <DetailName>
                        User ID
                    </DetailName>
                    <DetailValue>
                        {caff.userId}
                    </DetailValue>
                </DetailRow>
                <DetailRow>
                    <DetailName>
                        Creator
                    </DetailName>
                    <DetailValue>
                        {caff.creator}
                    </DetailValue>
                </DetailRow>
                <DetailRow>
                    <DetailName>
                        Date of creation
                    </DetailName>
                    <DetailValue>
                        {caff.createdAt}
                    </DetailValue>
                </DetailRow>
                <DetailRow>
                    <DetailName>
                        Meta data
                    </DetailName>
                    <DetailValue>
                        {caff.metaData}
                    </DetailValue>
                </DetailRow>
                <MediaWrapper>
                    <CaffMedia src={caff.thumbnail} alt={`CAFF preview for ${caff.name}`} />
                </MediaWrapper>
                <ButtonsRow>
                    <Button onClick={handleDownload} variant="contained" component="button">Download</Button>
                    <Button onClick={toggleOpen} variant="contained" component="button">Leave a comment!</Button>
                </ButtonsRow>
                {open &&
                    <CommentModal id={caff.id} setOpen={setOpen} />
                }
            </DetailsWrapper>
        </CaffWrapper>
    );
}

export default Caff