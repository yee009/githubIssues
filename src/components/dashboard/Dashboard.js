import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import NotificationsIcon from '@material-ui/icons/Notifications'
import IssuesTable from '../issue/IssuesTable'
import IssueDetails from '../issue/IssueDetials'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        backgroundColor: '#24292e',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 80,
    },
}))

function Dashboard() {
    const classes = useStyles()

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                            GitHub
                    </Typography>
                        <IconButton color='inherit'>
                            <Badge badgeContent={4} color='secondary'>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='lg' className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Switch>
                                    <Route path='/' exact component={IssuesTable} />
                                    <Route path='/issue/:id' component={IssueDetails} />
                                </Switch>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default Dashboard