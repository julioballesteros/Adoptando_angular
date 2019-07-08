import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../models/pet.model';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets:Pet[] = [];
  profileUrls: Observable<string | null>[] = [];
  cargando : boolean = false;
  loggedUser: User;

  constructor(  private petsService : PetsService,
                private usersService: UsersService,
                private router:Router,
                private storage: AngularFireStorage
              ) {
              }

  ngOnInit() {
    this.cargando = true;
    this.usersService.loggedUserSubject.asObservable().subscribe(
      user => this.loggedUser = user
    );
    this.getPets();
  }

  getPets() {
    this.petsService.getPets()
    .subscribe(
      pets => {
        this.pets = pets
        for(let i=0; i<pets.length; i++){
          this.profileUrls[i] = this.getUrl(this.pets[i].img);
        }
        this.cargando = false;
      }

    );
  }

  getUrl(path : string) : Observable<string>{
    const ref = this.storage.ref(path);
     return ref.getDownloadURL()
  }

  seePet(id:number) {
    this.router.navigate( ['/pet', id] );
  }

}
