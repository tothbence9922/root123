import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import AuthService from "services/Auth/AuthService"
import styled from "styled-components"
import axios from "axios"
import URLs from "constants/URLS"

const PreviewCard = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 11px;
    box-shadow: 11px 11px 11px rgba(0, 0, 0, 0.3);
    transition: 0.1s linear;

    border: 1px solid lightgrey;

    opacity: 0.8;

    &:hover {
        cursor: pointer;
     opacity: 1.0;
    }

    &:hover, &:focus {
        opacity: 1.0;
        background-color: lightgrey;
        transition: 0.1s linear;
    }

`

const CardMediaWrapper = styled.div`
    width: 100%;

    border-radius: 11px 11px 0 0;
    overflow: hidden;
`

const CardMedia = styled.img`
    margin: 0 auto;
    width: 100%;
    height: auto;
`

const CardTitleWrapper = styled.div`
    width: 100%;
    margin: 1rem 0;
    text-align: center;
`

const CardTitle = styled.h3`
    height: 1.25rem;
    font-weight: 600;
    color: grey;
`

const CaffPreview = (props) => {

    const navigate = useNavigate()
    

    return (
        <PreviewCard onClick={() => navigate(`/browse/${props.id}`)}>
            <CardMediaWrapper>
                <CardMedia src={`data:image/jpeg;base64,${props.src}`} alt={`CAFF preview for ${props.name}`} />
            </CardMediaWrapper>
            <CardTitleWrapper>
                <CardTitle>
                    {props.name}
                </CardTitle>
            </CardTitleWrapper>
        </PreviewCard>
    )
}

export default CaffPreview