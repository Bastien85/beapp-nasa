import { NasaPictureType } from "../types/NasaPictureType";
import { formatDate } from "../utils/DateUtils";

const API_KEY = "l21YJ2gfkCjnS1ThY7wha4ryclgMvxylj9Rfj9zl";

export async function fetchDailyPicture(): Promise<NasaPictureType | null> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
      {
        method: "GET",
      }
    );

    const picture: NasaPictureType = await response.json();

    return picture;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchPictureFromDate(
  date: Date
): Promise<NasaPictureType | null> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formatDate(date)}`,
      {
        method: "GET",
      }
    );
    const picture: NasaPictureType = await response.json();

    return picture;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchPicturesList(
  startDate: Date,
  endDate: Date
): Promise<NasaPictureType[]> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`,
      {
        method: "GET",
      }
    );

    const pictures = await response.json();

    if (!pictures || pictures.code === 400) return [];

    return pictures.reverse() as NasaPictureType[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
