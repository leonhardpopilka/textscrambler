import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import ReverseText from './ReverseText'
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 50,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

function App() {
  const [theme, setTheme] = useState(true)
  const classes = useStyles();
  const icon = !theme ? <Brightness7Icon /> : <Brightness4Icon />

  const light = {
    palette: {
      type: 'light',
    },
  }

  const dark = {
    palette: {
      type: 'dark',
    },
  }
  const appliedTheme = createMuiTheme(theme ? light : dark)

  return (
    <ThemeProvider theme={appliedTheme}>
      <Paper className={classes.root}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="mode"
          onClick={() => setTheme(!theme)}
        >
          {icon}
        </IconButton>
        <p style={{ padding: 50 }}>
          Listo Learns React
          </p>
        <ReverseText></ReverseText>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
