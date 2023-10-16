export const fetchCountries = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Please enter a valid country name.');
    }
    return res.json();
  };
