// InputSearch.js
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React from "react";

function InputSearch({
  history,
  setSearch,
  selectedIps,
  handleSelect,
  loadingHistory,
}) {
  return (
    <Autocomplete
      freeSolo={true}
      options={history || []} // Default to an empty array if history is undefined or null
      onInputChange={(event, newValue) => {
        setSearch(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter IP Address"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loadingHistory ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <div {...props} key={option.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedIps.includes(option)}
                onChange={() => handleSelect(option)}
              />
            }
            label={option}
          />
        </div>
      )}
      disabled={loadingHistory} // Disable autocomplete while loading history
    />
  );
}

export default InputSearch;
