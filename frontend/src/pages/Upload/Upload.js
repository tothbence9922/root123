import { Button, TextField } from "@material-ui/core"
import axios from "axios"
import CaffPreview from "components/caff/CaffPreview/CaffPreview"
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
const Upload = () => {
    const [file, setFile] = useState()

    const formik = useFormik({
        initialValues: {
            name: '',
            userId: AuthService.getUsername(),
            creator: AuthService.getUsername(),
            metaData: "sample_meta",
            data: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            handlePost(values)
        },
    });

    const [res, setRes] = useState()
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)

    const handlePost = async (values) => {
        try {
            setLoading(true)
            let formData = new FormData();
            formData.append("name", formik.values.name);
            formData.append("userId", formik.values.userId);
            formData.append("creator", formik.values.creator);
            formData.append("metaData", formik.values.metaData);
            formData.append("daffData", file);
            const req = axios.post(
                URLS.postCaff,
                formData,
                {
                    headers: {
                        Authorization: AuthService.authHeader(),
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (e) => console.log(e)
                }
            )
            console.log(req)
            const res = await req
            setRes(res.data)
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    const handleFile = (file) => {
        setFile(file)
    }

    useEffect(() => {
        formik.values.data = file
    }, [file])

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