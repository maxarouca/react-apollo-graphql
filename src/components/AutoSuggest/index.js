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
  const [state, setState] = useState('');

  const [stateSuggestions, setSuggestions] = useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, props));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const debouncedSearchTerm = useDebounce(state, 250);

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
    const number = suggestion.value

    return (
      <MenuItem selected={isHighlighted} component="div">
        <Link to={`/station/${number}`}>
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
    return suggestion.value;
  }


  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
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
      value: suggestion.stationNumber,
      label: suggestion.name.replace(` (${debouncedSearchTerm})`, ''),
    }))
    : []
  console.log(suggestions)

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Stations',
          placeholder: 'Search a station',
          value: state,
          onChange: e => setState(e.target.value),
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
