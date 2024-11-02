export type ReverseGeocodeResponse = {
  address_components: { long_name: string; short_name: string; types: string[] }[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
};

interface Location {
  lat: number;
  lng: number;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: {
    northeast: Location;
    southwest: Location;
  };
}
