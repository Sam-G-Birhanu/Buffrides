import { AddressAutofill } from "@mapbox/search-js-react";

const LocationSuggestion = () => {
  const accessToken =
    "pk.eyJ1IjoiY29ubmFncmVlIiwiYSI6ImNtNTR5YWJrZzBjbnUydHFycG41NmhzamwifQ.TrUliR60T4Zvf_yWb0kTOQ";
  return (
    <AddressAutofill accessToken={accessToken}>
      <input type="text" name="address" autocomplete="street-address" />
    </AddressAutofill>
  );
};
export default LocationSuggestion;
