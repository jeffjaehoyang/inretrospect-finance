import React, { Dispatch, SetStateAction } from 'react';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';

interface Props {
  setCompany: Dispatch<SetStateAction<{ label: string; value: string } | null>>;
}

const AsyncSearchBar: React.FC<Props> = ({ setCompany }: Props) => {
  //get animated components wrapper
  const animatedComponents = makeAnimated();

  // fetch filteres search results for dropdown
  const loadOptions = (query: string) => {
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
        isMulti={false}
        isClearable={true}
        components={animatedComponents}
        loadOptions={loadOptions}
        onChange={handleCompanyChange}
        placeholder="Select company"
        noOptionsMessage={() => "Search for options"}
      />
    </>
  );
};

export default AsyncSearchBar;
