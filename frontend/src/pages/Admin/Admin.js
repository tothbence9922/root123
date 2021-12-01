import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import { errorToast } from "components/common/Toast/Toast"
import URLS from "constants/URLS"
import { useEffect, useState } from "react"
import AuthService from "services/Auth/AuthService"
import styled from "styled-components"

import keycloakConfig from 'constants/keycloak.json'

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
const Admin = () => {

    const [users, setUsers] = useState([])
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)
    
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                keycloakConfig.url + `/${keycloakConfig.realm}/clients/${keycloakConfig.clientId}/roles/user/users`,
                {
                    headers: {
                        Authorization: AuthService.authHeader()
                    }
                }
            )
            if (res.status === 200) {
                setUsers(res.data)
            } else {
                errorToast("Loading users failed")
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        console.log({users})
    }, [users])

    return (

        <BrowseWrapper>
            <TitleWrapper>
                <TitleText>
                    Admin
                </TitleText>
            </TitleWrapper>
            <ListWrapper>
                {
                    users.map((user, idx) => (
                        <div>
                            <p>{`${JSON.stringify(user)}`}</p>
                        </div>
                    ))
                }
            </ListWrapper>
        </BrowseWrapper>
    );
}

export default Admin