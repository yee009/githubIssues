import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { Badge, CircularProgress, IconButton } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import issuesReducer from '../../reducers/issuesReducer'
import { dateFormat } from '../../util/util'

const columns = [
    { id: 'icon', label: '', minWidth: 20 },
    { id: 'title', label: '', minWidth: 300 },
    { id: 'comments', label: '', minWidth: 20 },
]

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '700px',
    },
    container: {
        maxHeight: 640,
    },
    circularProgress: {
        marginTop: '20%',
        marginLeft: '50%',
    },
    tableRowTitle: {
        marginBlockStart: '0rem',
    },
    tableRowSubtitle: {
        marginBlockEnd: '0rem',
        fontSize: 12,
        color: 'gray',
    },
    links: {
        color: '#0000d3',
        textDecoration: 'none'
    },
})

const initialState = {
    loading: true,
    post: {},
}

function IssuesTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [state, dispatch] = useReducer(issuesReducer, initialState)

    useEffect(() => {
        axios.get('https://api.github.com/repos/rails/rails/issues')
            .then(res => {
                dispatch({ type: 'FETCH_ISSUES_LIST_SUCCESS', payload: res.data })
            })
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper className={classes.root}>
            {state.loading ? <CircularProgress className={classes.circularProgress} size={80} /> :
                <>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} key={'tableHeader'}>
                                        Issues Table
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.post.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                switch (column.id) {
                                                    case 'icon':
                                                        return (
                                                            <TableCell key={row.id + '_' + column.id} width={'40px'} align='center'>
                                                                <ErrorOutlineIcon style={{ color: 'green' }} />
                                                            </TableCell>
                                                        )
                                                    case 'title':
                                                        return (
                                                            <TableCell key={row.id + '_' + column.id} width={'calc(100% - 110px)'}>
                                                                <div>
                                                                    <p className={classes.tableRowTitle}>
                                                                        <Link to={`/issue/${row.number}`} className={classes.links}>
                                                                            {row.title}
                                                                        </Link>
                                                                    </p>
                                                                    <p className={classes.tableRowSubtitle}>
                                                                        {'#' + row.number + ' opened on ' + dateFormat(row.created_at) + ' by ' + row.user.login}
                                                                    </p>
                                                                </div>
                                                            </TableCell>
                                                        )
                                                    case 'comments':
                                                        return (
                                                            <TableCell key={row.id + '_' + column.id} width={'70px'} align='center'>
                                                                <IconButton component="span" disabled={row.comments === 0}>
                                                                    <Badge badgeContent={row.comments} color="primary">
                                                                        <MailIcon />
                                                                    </Badge>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    default:
                                                        return (
                                                            <TableCell key={row.id + '_' + column.id} />
                                                        )
                                                }
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 20]}
                        component="div"
                        count={state.post.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage} />
                </>
            }
        </Paper>
    )
}

export default IssuesTable