import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

async function fetchCountry(name) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/countries/${name}`);
  if (!res.ok) {
    throw new Error("Network response was not ok " + res.statusText);
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No data received or data format is incorrect");
  }
  return data[0];
}

export default function SingleCountry() {
  const { name } = useParams();
  const {
    data: country,
    error,
    isError,
  } = useQuery(["country", name], () => fetchCountry(name), {
    staleTime: 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      {isError && <p className="error-message">{error.message}</p>}
      {country && (
        <section className="p-8 md:py-0 max-w-7xl mx-auto">
          <div
            key={country.population}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
          >
            <article>
              <img src={country.flags.svg} alt={country.name.common} />
            </article>

            <article>
              {country.name.official && country.name.official[0] && (
                <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
                  {country.name.official}
                </h1>
              )}

              <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                {country.capital && country.capital[0] && (
                  <li>Capital: {country.capital[0]}</li>
                )}
                {country.population && country.population[0] && (
                  <li>Population: {country.population.toLocaleString()}</li>
                )}
                {country.region && country.region[0] && (
                  <li>Region: {country.region}</li>
                )}
                {country.subregion && country.subregion[0] && (
                  <li>Subregion: {country.subregion}</li>
                )}
              </ul>

              {country.borders && country.borders.length > 0 && (
                <>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                    Borders:
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {country.borders.map((border, index) => (
                      <li
                        key={index}
                        className="bg-cyan-300 p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link
                to="/"
                className="inline-block mt-8 bg-cyan-400 py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
              >
                &larr; Back
              </Link>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
