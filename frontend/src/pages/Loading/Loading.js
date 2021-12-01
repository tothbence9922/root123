import { useTheme, makeStyles, Typography } from '@material-ui/core';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const useStyles = makeStyles((theme) => ({
    mainText: {
        fontSize: "7rem",
        fontWeight: "600",
        color: theme.palette.primary.light,
        marginTop: "5rem",
    },
    secondaryText: {
        fontSize: "3rem",
        fontWeight: "400",
        color: theme.palette.primary.main,
        '&::after': {
            content: '""',
            border: `1px solid ${theme.palette.primary.main}`,
            animation: `$blink 1000ms infinite`,
        },
    },
    '@global': { //need add into global rules
        '@keyframes blink': {
            '0%': {
                opacity: 1,
            },
            '49%': {
                opacity: 1,
            },
            '50%': {
                opacity: 0,
            },
            '100%': {
                opacity: 0,
            },
        }
    }
}));

const Loading = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    return (
        <Wrapper>
            <Typography component="h1" variant="h1" className={classes.mainText}>
                Hold on,
            </Typography>
            <Typography component="h2" variant="h2" className={classes.secondaryText}>
                we' re loading
            </Typography>
        </Wrapper>
    );
}

export default Loading