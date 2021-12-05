import { Button } from "@material-ui/core"
import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import CommentModal from "components/caff/Comment/CommentModal"
import URLS from "constants/URLS"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
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

    overflow: hidden;
    margin: 2rem 0 3rem 0;
`

const CaffMedia = styled.img`
    margin: 0 auto;
    width: 100%;
    height: auto;
`
const CommentName = styled.p`
    font-size: 1.25rem;
    font-weight: 400;

`

const CommentDate = styled.p`
    font-size: 1rem;
    font-weight: 600;
`
const CommentText = styled.div`
    max-width: 80ch;
    word-wrap: break-word;
    font-weight: 600;
    line-height: 1.5rem;
`

const DeleteWrapper = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
`

const DeleteButton = styled.div`
    width: 100%;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem 1.25rem;
    border-radius: 11px;
    font-size: 1.25rem;
    font-weight: 400;

    background: #f04a4a;
    border: 1px solid black;
    transition: 0.2s linear;

    line-height: 1rem;
    &:hover {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 1rem;

        background: #f23535;
        cursor: pointer;
        transition: 0.2s linear;
}
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
const CommentRow = styled.div`
    width: 100%;
    background: #efefef;
    border-radius: 11px;
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
                AuthService.doLogin()
            } else {
                errorToast("An error occured while loading the CAFF.")
            }
            setLoadingGet(false)

        } catch (err) {
            setLoadingGet(false)
            setErrGet(err)
        }
    }

    const [delRes, setDelRes] = useState();
    const [delErr, setDelErr] = useState();
    const [delLoading, setDelLoading] = useState(true);

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            setDelLoading(true)
            const res = await axios.delete(
                URLS.caff + `/${id}`,
                {
                    headers: {
                        Authorization: AuthService.authHeader()
                    }
                }
            )
            if (res.status >= 200 && res.status < 300) {
                setDelRes(res.data)
                navigate('/browse')
            } else {
                errorToast("An error occured while deleting the CAFF.")
            }
            setDelLoading(false)

        } catch (err) {
            setDelLoading(false)
            setDelErr(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(!open) }

    const handleDownload = () => {
        let data = new Blob([caff.data], { type: 'application/octet-stream; charset=x-user-defined;' });
        let csvURL = window.URL.createObjectURL(data);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'filename.caff');
        tempLink.click();
    }

    return (

        <CaffWrapper>
            {
                caff &&
                <DetailsWrapper>
                    {(AuthService.isLoggedIn() && AuthService.hasRole("admin_user")) &&
                        <DeleteWrapper>
                            <DeleteButton onClick={handleDelete}>
                                Delete
                            </DeleteButton>
                        </DeleteWrapper>
                    }
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
                            {
                                caff.metaData?.map(data => (
                                    <p>{data}</p>
                                ))
                            }
                        </DetailValue>
                    </DetailRow>
                    <MediaWrapper>
                        <CaffMedia src={`data:image/jpeg;base64,${caff.thumbnail}`} alt={`CAFF preview for ${caff.name}`} />
                    </MediaWrapper>
                    <ButtonsRow>
                        <Button onClick={AuthService.isLoggedIn() ? handleDownload : () => { AuthService.doLogin() }} variant="contained" component="button">Download</Button>
                        <Button onClick={toggleOpen} variant="contained" component="button">Leave a comment!</Button>
                    </ButtonsRow>
                    {
                        caff.comments?.map(comment => {
                            return (
                                <CommentRow>
                                    <DetailRow>
                                        <CommentName>
                                            {comment.userId}
                                        </CommentName>
                                        <CommentDate>
                                            {comment.createdAt}
                                        </CommentDate>
                                    </DetailRow>
                                    <CommentText>
                                        {comment.text}
                                    </CommentText>
                                </CommentRow>
                            )
                        })
                    }
                    {open &&
                        <CommentModal fetchData={fetchData} id={caff.id} setOpen={setOpen} />
                    }
                </DetailsWrapper>
            }

        </CaffWrapper>
    );
}

export default Caff