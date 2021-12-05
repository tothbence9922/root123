import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import { errorToast } from "components/common/Toast/Toast"
import URLS from "constants/URLS"
import { useEffect, useState } from "react"
import AuthService from "services/Auth/AuthService"
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
const Browse = () => {
    const [caffs, setCaffs] = useState([])
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                URLS.caff
            )
            if (res.status >= 200 && res.status < 300) {
                setCaffs(res.data)
            } else {
                errorToast("Loading CAFFs failed")
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <BrowseWrapper>
            <TitleWrapper>
                <TitleText>
                    Browse
                </TitleText>
            </TitleWrapper>
            <ListWrapper>
                {caffs.length === 0 ?
                    <TitleText>
                        There are no CAFFs uploaded yet...
                    </TitleText>
                    :
                    caffs.map((caff, idx) => (
                        <CaffPreview id={caff.id} name={caff.name ? caff.name : `CAFF ${idx}`} src={caff.thumbnail} />
                    ))
                }
            </ListWrapper>
        </BrowseWrapper>
    );
}

export default Browse