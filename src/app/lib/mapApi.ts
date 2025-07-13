// utils/getCoordinates.ts
import axios from 'axios';

export async function getCoordinates(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address,
        key: apiKey,
      },
    }
  );

  const results = response.data.results;

  if (results.length === 0) {
    throw new Error('No location found');
  }

  const location = results[0].geometry.location;
  return {
    latitude: location.lat,
    longitude: location.lng,
  };
}