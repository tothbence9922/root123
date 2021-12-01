import styled from "styled-components"
import { Fragment } from "react";
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'

import FooterData from './FooterData'

import { useTheme, makeStyles } from '@material-ui/core'

import SIZES from 'constants/sizes'

const OuterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: raleway;
`

const FooterWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Sections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;


    @media (min-width: ${SIZES.SM}px) {
        display: grid;
        grid-template-columns: min-content min-content;
        place-items: start stretch;
    }
    @media (min-width: ${SIZES.MD}px) {
        display: grid;
        grid-template-columns: min-content min-content min-content;
        place-items: start stretch;
    }
    
 
`

const SectionWrapper = styled.div`
    width: 100%;
    margin: 1rem 3rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;

    @media (min-width: 375px) {
        margin: 1rem 3rem;
        flex-direction: column;
        align-items: start;
        padding: 1rem;
    }
`

const CopyrightWrapper = styled.div`
    margin: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const SectionContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`

const SectionTitle = styled.p`
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
`

const TitleWrapper = styled.div`
    width: 100%;
    border-bottom: 2px solid ${(props) => props.color};
    margin-bottom: 1rem;
`


const SectionA = styled.a`
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 1.5rem;

    max-width: 40ch;
    margin-left: 1rem;

    &:hover, &:focus{
        text-decoration: underline;
        cursor: pointer;
    }
    &:focus{
        outline: none !important;
    }

`
const SectionLink = styled(RouterLink)`
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 1.5rem;


    max-width: 40ch;
    margin-left: 1rem;

    &:hover, &:focus {
        text-decoration: underline;
        cursor: pointer;
    }
    &:focus{
        outline: none !important;
    }
`


const useStyles = makeStyles((theme) => ({
    outerWrapper: {
        backgroundColor: 'lightgrey',
    },
    link: {
        color: theme.palette.primary.dark,
        outline: "none !important",
    },
    title: {
        color: theme.palette.primary.contrastText,
        outline: "none !important",
    },
    titleWrapper: {
        color: theme.palette.primary.light,
    }
}));


const Footer = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);

    const copyright = () => {
        return (
            <Typography align="center">
                {'Copyright © '}
                <SectionA className={classes.link} target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noreferrer">
                    SG
                </SectionA>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <OuterWrapper className={classes.outerWrapper}>
            <FooterWrapper>
                <Sections>
                    {
                        FooterData.sections.map((section, secIdx) => {
                            return (
                                <SectionWrapper key={`footer_section_${secIdx}`}>
                                    <TitleWrapper color={theme.palette.primary.dark}>
                                        <SectionTitle className={classes.title}>{section.name}</SectionTitle>
                                    </TitleWrapper>
                                    <SectionContent>
                                        {
                                            section.links.map((link, idx) => {
                                                return (
                                                    <Fragment key={`footer_section_${secIdx}_link_${idx}`}>
                                                        <SectionA target="_blank" href={link.to} rel="noreferrer" className={classes.link} >{link.icon} {link.name}</SectionA>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </SectionContent>
                                </SectionWrapper>
                            )
                        })
                    }
                </Sections>
                <CopyrightWrapper>
                    <SectionContent className={classes.link}>
                        {copyright()}
                    </SectionContent>
                </CopyrightWrapper>
            </FooterWrapper>
        </OuterWrapper >
    )
}

export default Footer