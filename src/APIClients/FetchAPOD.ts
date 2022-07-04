const apiURL = 
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APOD_API_KEY as string}`;

interface IAPOD {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

/**
 * Gets the HDURL of the APOD from the NASA APOD API
 */
export function getAPODURL(): Promise<string> {
    return fetchAPOD().then((response:IAPOD)=>response.hdurl);
}

/**
 * Gets the APOD JSON object
 */
function fetchAPOD(): Promise<IAPOD> {
    return fetch(apiURL)
        .then((response) => response.json())
        .catch((Error) => console.warn("Your mom"));
}