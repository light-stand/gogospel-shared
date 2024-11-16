import axios from "axios";
import { ReverseGeocodeResponse } from "../domain/Geocoding";

type LatLng = { latitude: number; longitude: number };

const key = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export type AutoCompleteResult = { description: string; place_id: string };

export const geocode = async (address: string) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: { key, address },
  });
  return response.data.results[0].geometry;
};

export const reverseGeocode = async (coords: LatLng) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: { key, latlng: `${coords.latitude},${coords.longitude}` },
  });
  return response.data.results[0] as ReverseGeocodeResponse;
};

export const autoComplete = async (input: string, coords: LatLng) => {
  if (!input || input.length < 3) return [];
  const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
    params: { key, input },
  });
  return response.data.predictions as AutoCompleteResult[];
};

export const getPlaceDetails = async (placeId: string) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
    params: {
      key,
      placeid: placeId,
      fields: "geometry,address_components",
    },
  });
  return response.data.result;
};
