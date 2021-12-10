import React, { Dispatch, SetStateAction, useState } from 'react';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';

interface Props {
  setCompany: Dispatch<SetStateAction<{ label: string; value: string } | null>>;
}

const AsyncSearchBar = ({ setCompany }: Props) => {
  //set default query terms
  const [query, setQuery] = useState("");

  //get animated components wrapper
  const animatedComponents = makeAnimated();

  // fetch filteres search results for dropdown
  const loadOptions = () => {
    return fetch(`/tickerSymbol?symbol=${query}`).then((res) => {
      return res.json();
    });
  };

  const handleCompanyChange = (value: any) => {
    if (value) {
      setCompany(value);
    }
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        isClearable={true}
        components={animatedComponents}
        loadOptions={loadOptions}
        onInputChange={(value) => setQuery(value)}
        onChange={(value) => handleCompanyChange(value)}
      />
    </>
  );
};

export default AsyncSearchBar;
