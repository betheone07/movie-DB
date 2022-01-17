import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './models/genre.model';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private http: HttpClient) { }


  getGenres() {
    return this.http.get<Genre>('https://api.themoviedb.org/3/genre/movie/list?api_key=06234e2e197e3614d2c37574f9a9f7f8');
  }

  getMoviesUser(theme: string, page: number) {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${theme}?api_key=06234e2e197e3614d2c37574f9a9f7f8&language=en-US&page=${page}`)
  }
}
