import { formatDate } from "@/utils/DateUtils";

export type NasaPictureType = {
    date: string;
    title: string;
    explanation: string;
    url: string;
    hdurl: string;
    media_type: string;
}

export const mockNasaPicture: NasaPictureType = {
    date: formatDate(new Date()),
    title: 'Title',
    explanation: 'Lorem ipsum',
    url: 'https://mock.com',
    hdurl: 'https://mock.com',
    media_type: 'image'
}