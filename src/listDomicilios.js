import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function ListDomicilios() {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');

  const [options, setOptions] = React.useState([]);

 
  const handleChange = event => {
    setInputValue(event.target.value);
  };

 
  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }
console.log(inputValue);

(async () => {
  const response = await fetch(  
    
    `https://ms-api-preprod.paquery.com/maps/address/autocomplete?partialAddress=${inputValue}`
  );
  const countries = await response.json();

  if (active) {
    setOptions(
      Object.keys(countries.data.suggestions).map(key => countries.data.suggestions[key])
    );
  }
})();



    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}

      getOptionSelected={(option, value) => option.label === value.label}
      getOptionLabel={option => option.label}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      disableOpenOnFocus
      renderInput={params => (
        <TextField
          {...params}
          label="Ingrese el domicilio"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      )}
      renderOption={option => {
        const parts = option;
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {
                <span  style={{ fontWeight: parts.highlight ? 700 : 400 }}>
                  {parts.label}
                </span>
              } 
            </Grid>
          </Grid>
        );
      }}
    />
  );
}