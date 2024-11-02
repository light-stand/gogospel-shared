import { find, includes } from "lodash";
import { ReverseGeocodeResponse } from "../domain/Geocoding";

export const addressToCityCountryString = (revGeo: ReverseGeocodeResponse): string => {
  const address = revGeo?.address_components;
  const cityComponent = find(
    address,
    (component) => includes(component.types, "sublocality") || includes(component.types, "locality")
  );

  const countryComponent = find(address, (component) => includes(component.types, "country"));

  const city = cityComponent ? cityComponent.long_name : "";
  const country = countryComponent ? countryComponent.long_name : "";

  return `${city}, ${country}`;
};
