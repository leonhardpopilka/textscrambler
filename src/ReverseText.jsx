import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      marginTop: 50,
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    display: "inline-block",
    marginTop: 50,
    "& > *": {
      padding: 10,
      margin: theme.spacing(1),
      width: 600,
      height: 300,
      textAlign: "center",
      overflow: "auto",
      // backgroundColor: 'slateblue',
      color: "white",
      fontSize: 40,
    },
  },
}));

const ReverseText = () => {
  const classes = useStyles();
  const [text, setText] = useState();
  const [mode, setMode] = useState(0);
  const [timer, setTimer] = useState(false);
  const interval = useRef();

  useEffect(() => {
    if (timer) {
      interval.current = setInterval(function () {
        randomizeMode();
      }, 1000);
    } else clearInterval(interval.current);
  }, [timer]);

  const handleInput = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
  };

  const handleClick = (e, newMode) => {
    newMode === "random" ? randomizeMode() : setMode(newMode);
  };

  const mixedText = (pText) => {
    const words = pText ? pText.split(" ") : [];
    return words.reverse().join(" ").toString();
  };

  const reversedText = (pText) => {
    const characters = pText ? pText.split("") : [];
    return characters.reverse().join("").toString();
  };

  const scrambledText = (pText) => {
    const words = pText ? pText.split(" ") : [];
    const scrambledWords = [];
    for (let word of words) {
      const letters = word.split("");
      letters.sort(() => Math.random() - 0.5);
      scrambledWords.push(letters.join("").toString());
    }
    return scrambledWords.join(" ").toString();
  };

  const modeSwitcher = (pMode, pText) => {
    let text;

    switch (pMode) {
      case "normal":
        text = pText;
        // console.log('normaler text')
        break;
      case "sentence_reversed":
        text = mixedText(pText);
        // console.log('gemischter text')
        break;
      case "words_reversed":
        text = reversedText(pText);
        // console.log('reverseder text')
        break;
      case "words_scrambled":
        text = scrambledText(pText);
        // console.log('gewürfelter text')
        break;
      case "text_reversed":
        text = mixedText(reversedText(pText));
        // console.log('gemischt reverser text')
        break;
      default:
        // console.log('default text')
        text = pText;
    }
    return text;
  };

  const randomizeMode = () => {
    setMode(Math.floor(Math.random() * 5).toString());
  };

  const toggleTimer = () => {
    setTimer((timer) => !timer);
  };

  return (
    <React.Fragment>
      <Container>
        <form
          className={classes.textField}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="TextField"
            label="Text to Reverse"
            placeholder="Los schreib was!"
            variant="outlined"
            autoFocus
            value={text || ""}
            onChange={handleInput}
          />
        </form>

        <div className={classes.buttonGroup}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleClick}
            aria-label="text alignment"
          >
            <ToggleButton value="normal" aria-label="normal">
              One
            </ToggleButton>
            <ToggleButton value="sentence_reversed" aria-label="int reversed">
              Two
            </ToggleButton>
            <ToggleButton value="text_reversed" aria-label="right aligned">
              Three
            </ToggleButton>
            <ToggleButton value="words_reversed" aria-label="justified">
              Four
            </ToggleButton>
            <ToggleButton value="words_scrambled" aria-label="justified">
              Five
            </ToggleButton>
            <ToggleButton value="random" aria-label="justified">
              Random
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton
            aria-label="clock"
            size="medium"
            onClick={() => {
              toggleTimer();
            }}
          >
            <QueryBuilderIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </div>
        <div className={classes.paper}>
          <Paper elevation={3} color="secondary">
            {modeSwitcher(mode, text)}
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ReverseText;
