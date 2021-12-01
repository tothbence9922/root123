import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { errorToast, successToast } from 'components/common/Toast/Toast'
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
    max-width: 1000px;
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
    flex-direction: row;
    justify-content: flex-start;
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

const ButtonWrapper = styled.div`˙
    display: flex;
    flex-direction: column;
    align-items: center;
`

function CommentModal(props) {
    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            text: '',
            userId: AuthService.getUsername(),
            caffId: id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handlePost(values)
        },
    });

    const [res, setRes] = useState()
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)


    const handlePost = async (values) => {
        try {
            setLoading(true)
            const res = await axios.post(
                URLS.comment,
                values,
                {
                    headers: {
                        Authorization: AuthService.authHeader(),
                    }
                }
            )
            setRes(res.data)
            if (res.status === 200) {
                setLoading(false)
                successToast("Comment posted!")
                props.setOpen(false);
            } else {
                errorToast("Posting comment failed.")
                props.setOpen(false);
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    return (
        <BackgroundWrapper onClick={(e) => { props.setOpen(false); e.stopPropagation() }}>
            <FixedWrapper>
                <ModalWrapper onClick={(event) => event.stopPropagation()}>
                    <ModalTitleWrapper>
                        <ModalTitle>
                            Leave a comment
                        </ModalTitle>
                    </ModalTitleWrapper>
                    <ModalRow>
                        <TextField
                            required
                            id="text"
                            name="text"
                            label="Leave your comment!"
                            multiline
                            fullWidth
                            minRows={3}
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={formik.touched.text && formik.errors.text}
                        />
                    </ModalRow>
                    <ButtonWrapper>
                        <Button onClick={formik.submitForm} variant="contained" component="button">Leave a comment!</Button>
                    </ButtonWrapper>

                </ModalWrapper>
            </FixedWrapper>
        </BackgroundWrapper>
    )
}

export default CommentModal
