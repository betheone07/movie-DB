export class MovieDetails{
    poster_path: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    title: string;
    backdrop_path: string;
    original_language: string;
}


export class Movie{
    page: number;
    results: MovieDetails[];
    dates: object;
    total_pages: number;
    total_results: number;
}