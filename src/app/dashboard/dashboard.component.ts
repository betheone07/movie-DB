import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { MovieDetails, Movie } from '../models/movie.model';
import { genre } from '../models/genre.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  genres: genre[] = [];
  totalMovies: number = 0;
  movieList: MovieDetails[] = [];
  start: number = 1;
  end: number = 0;
  page: number = 1;
  totalPages: number = 0;
  selectedCategory: string;

  constructor(public commonservice: CommonserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getMoviesPaginated(0);
  }


  getMoviesPaginated(page: number) {
    this.page += page;
    //getting the genres from session storage
    this.genres = JSON.parse(sessionStorage.getItem('genres') || '');
    this.selectedCategory = JSON.parse(sessionStorage.getItem('category') || '');
    
    //filtering out the movies based on genres and category
      this.commonservice.getMoviesUser(this.selectedCategory, this.page).subscribe((data: Movie) => {
        this.totalMovies = data.total_results;
        this.totalPages = data.total_pages;
        this.movieList = data.results.filter((movie: MovieDetails)  => {
          return movie.genre_ids.some((id: any) => this.genres.includes(id));
        });

        //setting the start and end index of the movie list based on page
        if (page >= 0) {
          this.start = this.end + 1;
          this.end = this.start + this.movieList.length
        }
        else {
          this.start -= this.movieList.length
          this.end -= this.movieList.length
        }
      });
  }

  getNextMovieList() {
    //if the page is less than total pages, get the next page
    if (this.page <= this.totalPages) {
      this.getMoviesPaginated(1);
    }
  }

  getPreviousMovieList() {
    //if the page is greater than 1, get the previous page
    if (this.page > 1) {
      this.getMoviesPaginated(-1);
    }

  }

}
