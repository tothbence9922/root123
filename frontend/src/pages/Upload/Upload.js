import { Button, TextField } from "@material-ui/core"
import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
import UploadModal from "components/caff/Upload/UploadModal"
import { errorToast, successToast } from "components/common/Toast/Toast"
import URLS from "constants/URLS"
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import AuthService from "services/Auth/AuthService"
import styled from "styled-components"
import validationSchema from "validation/Upload/Schemas"

const UploadWrapper = styled.div`
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


const DetailRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`

const DetailRowHorizontal = styled.div`
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

const Upload = () => {
    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            name: '',
            userId: AuthService.getUsername(),
            username: AuthService.getUsername(),
            creator: AuthService.getUsername(),
            comments: []
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handlePost(values)
        },
    });

    const [res, setRes] = useState()
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)

    const [progressData, setProgressData] = useState({ loaded: 0, total: 1 })

    const handlePost = async () => {
        try {
            setLoading(true)
            let formData = new FormData();
            formData.append('caffDTO', new Blob([JSON.stringify(formik.values)], {
                type: "application/json"
            }));
            formData.append('caffData', file);
            const res = await axios.post(
                URLS.caff,
                formData,
                {
                    headers: {
                        Authorization: AuthService.authHeader(),
                        ContentType: "multipart/form-data",
                    },
                    onUploadProgress: (e) => setProgressData(e)
                }
            )
            if (res.status >= 200 && res.status < 300) {
                setRes(res.data)
                successToast("Upload successful!")
                setLoading(false)
            } else if (res.status === 401) {
                AuthService.doLogin()
            } else {
                errorToast("Upload failed!")
                setLoading(false)
            }
        } catch (err) {
            errorToast("Upload failed!")
            setErr(err)
            setLoading(false)
        }
    }

    const handleFile = (file) => {
        setFile(file)
    }

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    return (

        <UploadWrapper>
            {loading &&
                <UploadModal progressData={progressData} />
            }
            <DetailsWrapper>
                <TitleWrapper>
                    <TitleText>
                        Upload
                    </TitleText>
                </TitleWrapper>
                <DetailRow>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Title of the CAFF file"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </DetailRow>
                <DetailRow>
                    <Button onClick={handleClick} variant="contained" component="button">Select file to upload...</Button>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />
                </DetailRow>
                {file &&
                    <>
                        <DetailRowHorizontal>
                            <DetailName>
                                Name
                            </DetailName>
                            <DetailValue>
                                {file.name}
                            </DetailValue>
                        </DetailRowHorizontal>
                        <DetailRowHorizontal>
                            <DetailName>
                                Type
                            </DetailName>
                            <DetailValue>
                                {file.type}
                            </DetailValue>
                        </DetailRowHorizontal>
                    </>
                }
                <DetailRow>
                    <Button onClick={formik.submitForm} variant="contained" component="button">Upload CAFF</Button>
                </DetailRow>
            </DetailsWrapper>
        </UploadWrapper>
    );
}

export default Upload