import googlemaps
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Directly set your Google Maps API key here
GOOGLE_MAPS_API_KEY = 'AIzaSyAhagodsFfVLkHh952Qc31OyC7wO0DXf7c'  # Replace with your actual API key

def get_google_maps_client(api_key):
    return googlemaps.Client(key=api_key)

def get_distance_and_duration(origin, destination):
    # Use the API key directly
    api_key = GOOGLE_MAPS_API_KEY
    if not api_key:
        logger.error('Google Maps API key not found')
        return None, None, 'Google Maps API key not found'
    
    gmaps = get_google_maps_client(api_key)

    try:
        response = gmaps.distance_matrix(origin, destination)
        logger.debug(f'Google Maps API response: {response}')  # Log the full response

        if response['status'] != 'OK':
            logger.error(f'Error retrieving data from Google Maps API: {response.get("error_message", "Unknown error")}')
            return None, None, response.get('error_message', 'Unknown error')

        distance_info = response['rows'][0]['elements'][0]
        distance = distance_info['distance']['text']
        duration = distance_info['duration']['text']

        return distance, duration, None  # None for error
    except Exception as e:
        logger.error(f'Error calling Google Maps API: {str(e)}')
        return None, None, str(e)