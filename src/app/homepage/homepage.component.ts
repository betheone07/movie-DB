import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { MovieDetails } from '../models/movie.model'; 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('prev') prev: ElementRef;
  @ViewChild('next') next: ElementRef;
  index: number = 0;
  upcomingMovies: MovieDetails[] = [];
  topratedMovies: MovieDetails[] = [];
  popularMovies: MovieDetails[] = [];
  currentMovie: MovieDetails;
  constructor(public commonservice: CommonserviceService, private router: Router) { }

  ngOnInit(): void {
    //storing all calls in an array and then fork-joining them to get all the data together on load
    const calls = [];
    calls.push(this.commonservice.getMoviesUser('upcoming',1));
    calls.push(this.commonservice.getMoviesUser('top_rated',1));
    calls.push(this.commonservice.getMoviesUser('popular',1));
    forkJoin(calls).subscribe(([data1,data2,data3]) => {
      this.currentMovie = data1.results[0];
      this.upcomingMovies = data1.results.slice(1,10);
      this.topratedMovies = data2.results.slice(0,7);
      this.popularMovies = data3.results.slice(0,7);
    })
  }


  prevImage() {

    const offset = -1;
    //getting all the sildes
    const slides = this.next.nativeElement.closest("[data-carousel]").querySelector("[data-slides]")
    this.index += offset;
    //getting the current active slide i.e. currentMovie (0th index)
    const activeSlide = slides.querySelector("[data-active]")
    //if index is less than 0, set it to last index
    if(this.index < 0) this.index = slides.children.length - 1
    //if index is greater than last index, set it to 0
    if(this.index >= slides.children.length) this.index = 0

    //deleting the active class from the current active slide
    delete activeSlide.dataset.active
    //adding active class to the slide at index
    slides.children[this.index].dataset.active = true
  }

  nextImage() {
    const offset = 1;
    const slides = this.next.nativeElement.closest("[data-carousel]").querySelector("[data-slides]")
    this.index += offset;
    const activeSlide = slides.querySelector("[data-active]")
    if(this.index < 0) this.index = slides.children.length - 1
    if(this.index >= slides.children.length) this.index = 0

    delete activeSlide.dataset.active
    slides.children[this.index].dataset.active = true
  }

  allTopRatedMoviesPaginated(){
    sessionStorage.setItem('category', JSON.stringify('top_rated'));
    this.router.navigate(['/dashboard']);
  }

  allPopularMoviesPaginated(){
    //storing movie category in session storage and routing to dashboard to display all movies of that category
    sessionStorage.setItem('category', JSON.stringify('popular'));
    this.router.navigate(['/dashboard']);
  }

}
