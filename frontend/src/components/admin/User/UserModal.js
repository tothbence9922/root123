import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { errorToast, successToast, warningToast } from 'components/common/Toast/Toast'
import URLS from 'constants/URLS'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import AuthService from 'services/Auth/AuthService'
import styled from 'styled-components'
import validationSchema from 'validation/Comment/Schemas'

const BackgroundWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
`

const FixedWrapper = styled.div`
    width: 100%;
    max-width: 300px;
    position: fixed;
    padding: 0 1rem;
    left: 50%;
    transform: translate(-50%, 10rem);
    z-index: 100;
    background: white;
    border: 1px solid lightgrey;
    border-radius: 11px;
    box-shadow: 11px 11px 11px rgba(0, 0, 0, 0.3);
`

const ModalWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    max-height: 70vh;
    z-index: 100;
    overflow-y: auto;
`

const ModalTitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`

const ModalTitle = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
`

const ModalRow = styled.div`
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

function UserModal(props) {

    const [res, setRes] = useState();
    const [err, setErr] = useState();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true)
            const res = await axios.delete(
                `http://localhost:8080/auth/admin/realms/testrealm/users/${props.user.id}`
            )
            setRes(res.data)
            if (res.status >= 200 && res.status < 300) {
                successToast("Delete successful")
                props.setOpen(false)
            } else if (res.status === 401) {
                AuthService.updateToken(handleDelete)
                warningToast("Unauthorized")
            } else {
                warningToast(res.statusText)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
            errorToast(err)
        }

    }

    return (
        <BackgroundWrapper onClick={(e) => { props.setOpen(false); e.stopPropagation() }}>
            <FixedWrapper>
                <ModalWrapper onClick={(event) => event.stopPropagation()}>
                    <ModalTitleWrapper>
                        <ModalTitle>
                            Delete user
                        </ModalTitle>
                    </ModalTitleWrapper>
                    <ButtonWrapper>
                        <Button onClick={handleDelete} variant="contained" component="button">Confirm</Button>
                        <Button onClick={() => props.setOpen(false)} variant="contained" component="button">Cancel</Button>
                    </ButtonWrapper>

                </ModalWrapper>
            </FixedWrapper>
        </BackgroundWrapper>
    )
}

export default UserModal
