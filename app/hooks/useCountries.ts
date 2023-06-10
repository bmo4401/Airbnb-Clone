import countries from 'world-countries';

const formattedCountries = countries.map((country, index) => ({
   value: country.cca2,
   label: country.name.common,
   flag: `https://countries.petethompson.net/data/flags/${country.cca3.toLowerCase()}.svg`,
   latlng: country.latlng,
   region: country.region,
}));

const useCountries = () => {
   const getAll = () => formattedCountries;
   const getByValue = (value: string) => {
      return formattedCountries.find((item) => item.value === value);
   };
   return { getAll, getByValue };
};

export default useCountries;
