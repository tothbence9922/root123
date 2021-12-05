import { Button } from "@material-ui/core"
import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import CommentModal from "components/caff/Comment/CommentModal"
import URLS from "constants/URLS"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import AuthService from "services/Auth/AuthService"
import styled from "styled-components"
import { errorToast } from "components/common/Toast/Toast"
import { Link } from "react-router-dom"
import fileDownload from "js-file-download"

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

const Caff = () => {
    const { id } = useParams()
    const [caff, setCaff] = useState();
    const [errGet, setErrGet] = useState();
    const [loadingGet, setLoadingGet] = useState(true);

    const fetchData = async () => {
        try {
            setLoadingGet(true)
            const res = await axios.get(
                URLS.caff + `/${id}`,
                {
                    headers: {
                        Authorization: AuthService.authHeader()
                    }
                }
            )
            if (res.status >= 200 && res.status < 300) {
                setCaff(res.data)
            } else if (res.status === 401) {
                AuthService.updateToken(fetchData)
            } else {
                errorToast("An error occured while loading the CAFF.")
            }
            setLoadingGet(false)

        } catch (err) {
            setErrGet(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(!open) }

    const handleDownload = () => {
        fileDownload(caff.data, `${caff.name}.caff`)
    }

    return (

        <CaffWrapper>
            {
                caff &&
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
                        <CaffMedia src={`data:image/jpeg;base64,${caff.thumbnail}`} alt={`CAFF preview for ${caff.name}`} />
                        <p>{caff.data}</p>
                    </MediaWrapper>
                    <ButtonsRow>
                        <Button onClick={AuthService.isLoggedIn() ? handleDownload : () => { AuthService.doLogin() }} variant="contained" component="button">Download</Button>
                        <Button onClick={toggleOpen} variant="contained" component="button">Leave a comment!</Button>
                    </ButtonsRow>
                    {

                    }
                    {open &&
                        <CommentModal id={caff.id} setOpen={setOpen} />
                    }
                </DetailsWrapper>
            }

        </CaffWrapper>
    );
}

export default Caff