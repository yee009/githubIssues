import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Chip, CircularProgress, TextField } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import issuesReducer from '../../reducers/issuesReducer'
import { dateFormat } from '../../util/util'

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '700px',
        padding: '40px',
    },
    circularProgress: {
        marginTop: '20%',
        marginLeft: '50%',
    },
    issueTitle: {
        fontSize: '18px',
        fontWeight: 500,
    },
    issueNumber: {
        color: 'gray',
        paddingLeft: '10px',
    },
    whiteIcon: {
        color: 'white',
    },
    openStatus: {
        backgroundColor: '#07ab00',
        color: 'white',
        float: 'left',
    },
    closedStatus: {
        backgroundColor: '#ab0000',
        color: 'white',
        float: 'left',
    },
    issueInfo: {
        float: 'left',
        paddingTop: '8px',
        paddingLeft: '10px',
        color: '#757575',
    },
    issueBodyContainer: {
        paddingTop: '50px',
    },
    issueBody: {
        width: '100%',
        color: 'rgba(0, 0, 0, 0.6)',
    },
})

const initialState = {
    loading: true,
    post: {},
}

function IssueDetails({ match }) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(issuesReducer, initialState)
    const issueNumber = match.params.id

    useEffect(() => {
        axios.get('https://api.github.com/repos/rails/rails/issues/' + issueNumber)
            .then(res => {
                dispatch({ type: 'FETCH_ISSUE_DETAILS_SUCCESS', payload: res.data })
            })
    }, [issueNumber])

    return (
        <Paper className={classes.root}>
            {state.loading ? <CircularProgress className={classes.circularProgress} size={80} /> :
                <>
                    <div className={classes.issueTitle}>{state.post.title}<label className={classes.issueNumber}>{'#' + state.post.number}</label></div>
                    <Chip
                        icon={<ErrorOutlineIcon className={classes.whiteIcon} />}
                        label={state.post.state}
                        className={state.post.state === 'open' ? classes.openStatus : classes.closedStatus} />
                    <div className={classes.issueInfo}><b>{state.post.user.login}</b> opened this issue on {dateFormat(state.post.created_at)}</div>
                    <br />
                    <div className={classes.issueBodyContainer}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={25}
                            disabled
                            defaultValue={state.post.body}
                            variant="outlined"
                            className={classes.issueBody} />
                    </div>
                </>
            }
        </Paper >
    )
}

export default IssueDetails