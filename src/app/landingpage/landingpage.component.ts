import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { Genre, genre } from '../models/genre.model';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  genres: any[] = [];
  selectedGenre: number[] = [];

  constructor(public commonservice: CommonserviceService, private router: Router) { }

  ngOnInit(): void {
    this.genres = [];
    //adding extra field to genre object to keep track of whether genre is selected or not
    this.commonservice.getGenres().subscribe((data: Genre) => {
      this.genres = data.genres.map((obj: genre) => ({ ...obj, isSelected: false }));
    })
  }

  pushGenre(genre: genre) {
    //if genre is already selected, remove it from selectedGenre array else add it
    if (genre.isSelected === false) {
      this.selectedGenre.push(genre?.id);
      this.genres.find((currentgenre: genre) => currentgenre?.id === genre?.id).isSelected = true;
      console.log(this.selectedGenre)
    }
    else {
      this.selectedGenre = this.selectedGenre.filter(function (item) {
        return item !== genre.id
      })
      this.genres.find((currentgenre: genre) => currentgenre?.id === genre?.id).isSelected = false;
      console.log(this.selectedGenre)
    }
  }

  gotoDashboard() {
    //send selected genres to session storage and route to dashboard
    sessionStorage.setItem('genres', JSON.stringify(this.selectedGenre));
    this.router.navigate(['/homepage']);
  }

}
