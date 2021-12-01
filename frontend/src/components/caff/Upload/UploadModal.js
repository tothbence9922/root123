import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { errorToast, successToast } from 'components/common/Toast/Toast'
import URLS from 'constants/URLS'
import React, { useEffect, useState } from 'react'
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

const UploadModal = (props) => {

    const calcProgress = (progressData) => {
        setProgress(Math.floor(progressData.loaded / progressData.total))
    }

    const [progress, setProgress] = useState();

    useEffect(() => {
        calcProgress(props.progressData)
    }, [props.progressData])

    return (
        <BackgroundWrapper onClick={(event) => event.stopPropagation()}>
        </BackgroundWrapper>
    )
}

export default UploadModal
