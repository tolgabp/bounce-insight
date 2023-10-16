import React, { useState } from "react";
import Article from "./Article";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/api";

const regions = [
  { name: "Africa" },
  { name: "Antarctic" },
  { name: "Americas" },
  { name: "Asia" },
  { name: "Europe" },
  { name: "Oceania" },
];

export default function Countries() {
  const [searchText, setSearchText] = useState("");
  const [currentRegion, setCurrentRegion] = useState("");
  const [apiError, setApiError] = useState(null);

  const handleError = (error) => setApiError(error.message);

  const { data: allCountriesData } = useQuery(
    ["allCountries"],
    () => fetchCountries(`${process.env.REACT_APP_API_URL}/countries`),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 120 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: handleError,
    }
  );

  const { data: searchCountryData } = useQuery(
    ["searchCountry", searchText],
    () =>
      fetchCountries(
        `${process.env.REACT_APP_API_URL}/countries/${searchText}`
      ),
    {
      enabled: !!searchText,
      staleTime: 60 * 60 * 1000,
      cacheTime: 120 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: handleError,
    }
  );

  const { data: filterByRegionData } = useQuery(
    ["filterByRegion", currentRegion],
    () =>
      fetchCountries(
        `${process.env.REACT_APP_API_URL}/regions/${currentRegion}`
      ),
    {
      enabled: !!currentRegion,
      staleTime: 60 * 60 * 1000,
      cacheTime: 120 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: handleError,
    }
  );

  const handleSearchCountry = (e) => {
    e.preventDefault();
    setApiError(null);
  };

  const handleFilterByRegion = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setCurrentRegion(selectedValue);
    setApiError(null);
  };

  let displayCountries = [];
  if (allCountriesData) displayCountries = allCountriesData;
  if (searchCountryData) displayCountries = searchCountryData;
  if (filterByRegionData) displayCountries = filterByRegionData;

  return (
    <>
      {apiError && (
        <div className="flex justify-center items-center">
          <div className="bg-teal-500 m-4 p-4 rounded-lg shadow-lg">
            <big className=""> {apiError}</big>
          </div>
        </div>
      )}{" "}
      {!displayCountries.length ? (
        <h1>Loading...</h1>
      ) : (
        <section className="container mx-auto p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Enter a country name"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-3 px-4 text-gray-700 focus:bg-gray-300 placeholder-gray-900 w-full shadow rounded outline-none dark:text-gray-300 dark:bg-cyan-700 dark:focus:bg-slate-800 dark:placeholder-gray-400 transition-all duration-200"
              />
            </form>
            <form onSubmit={handleFilterByRegion}>
              <select
                name="filter by region"
                id="filter-by-region"
                value={currentRegion}
                onChange={handleFilterByRegion}
                className="md:w-52 py-3 px-4 outline-none shadow rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:bg-cyan-700 dark:hover:bg-slate-800 dark:placeholder-slate-800 transition-all duration-200"
              >
                <option id="default-option" value="">
                  All Regions
                </option>
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {displayCountries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
