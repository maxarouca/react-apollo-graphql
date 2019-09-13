import React, { useState } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import useDebounce from '../../hooks/useDebounce'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useStyles from './styles'
import { Link } from 'react-router-dom'

export default function IntegrationAutosuggest(props) {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({
    single: ''
  });

  const [stateSuggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setsuggestionSelected] = useState('');

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, props));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const debouncedSearchTerm = useDebounce(state.single, 250);

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
      <>
        <TextField
          fullWidth
          InputProps={{
            inputRef: node => {
              ref(node);
              inputRef(node);
            },
            classes: {
              input: classes.input,
            },
          }}
          {...other}
        />
      </>
    );
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    const number = suggestion.number

    return (
      <MenuItem selected={isHighlighted} component="div" onKeyUp={(e) => console.log(e)} >
        <Link to={`/station/${number}`} className={classes.link}>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </Link>
      </MenuItem>
    );
  }

  function getSuggestions(value, props) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  function getSuggestionValue(suggestion) {
    setsuggestionSelected(suggestion.number)

    return suggestion.value;

  }

  const handleSuggestionSelected = (props) => {
    props.history.push(`/station/${suggestionSelected}`)
  }


  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
    onSuggestionSelected: () => handleSuggestionSelected(props),
  };

  const LOAD_STATIONS = gql`
    query Stations($debouncedSearchTerm: String!) {
    search(searchTerm: $debouncedSearchTerm){
      stations {
        name
        stationNumber
      }
    }
  }
  `;

  const { loading, data } = useQuery(LOAD_STATIONS, {
    variables: { debouncedSearchTerm },
  });
  const suggestions = data && data.search && data.search.stations ? data.search.stations
    .map(suggestion => ({
      number: suggestion.stationNumber,
      label: suggestion.name.replace(` (${debouncedSearchTerm})`, ''),
      value: suggestion.name.replace(` (${debouncedSearchTerm})`, ''),
    }))
    : []

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Stations',
          placeholder: 'Search a station',
          value: state.single,
          onChange: handleChange('single'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  );
}
