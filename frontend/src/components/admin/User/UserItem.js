import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import styled from 'styled-components'
import UserModal from './UserModal'

const UserItemWrapper = styled.div`
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 11px;
    border: 1px solid lightgrey;
    box-shadow: 11px 11px 11px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: 0.1s linear;

    &:hover, &:focus {
        transition: 0.1s linear;
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
`

const ItemRowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid lightgrey;
`

const ItemRowName = styled.p`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
`

const ItemRowValue = styled.p`
    line-height: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
`
const UserItem = (props) => {

    const [open, setOpen] = useState(false)

    return (
        <UserItemWrapper onClick={() => setOpen(true)}>
            {
                open &&
                <UserModal setOpen={setOpen} user={props.user} />
            }
            <ItemRowWrapper>
                <ItemRowName>
                    first name
                </ItemRowName>
                <ItemRowValue>
                    {props.user.firstName}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    last name
                </ItemRowName>
                <ItemRowValue>
                    {props.user.lastName}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    user name
                </ItemRowName>
                <ItemRowValue>
                    {props.user.username}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    email
                </ItemRowName>
                <ItemRowValue>
                    {props.user.email}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    email verified
                </ItemRowName>
                <ItemRowValue>
                    {props.user.emailVerified}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    enabled
                </ItemRowName>
                <ItemRowValue>
                    {props.user.enabled}
                </ItemRowValue>
            </ItemRowWrapper>
            <ItemRowWrapper>
                <ItemRowName>
                    id
                </ItemRowName>
                <ItemRowValue>
                    {props.user.id}
                </ItemRowValue>
            </ItemRowWrapper>
        </UserItemWrapper>
    )
}

export default UserItem
