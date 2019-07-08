import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';
import {Pet} from '../../models/pet.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  private pet:Pet;
  cargando = false;
  loadingUser = false;
  profileUrl: Observable<string | null>;
  loggedUser: User;

  constructor(private petsService : PetsService,
              private usersService: UsersService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.loadingUser = true;
    this.usersService.loggedUserSubject.asObservable().subscribe(
      user => {
        this.loggedUser = user;
        this.loadingUser = false;
      }
    );
    this.activatedRoute.params.subscribe( params => this.getPet(params['id']));
  }

  getPet(id : number) {
    this.petsService.getPet(id)
    .subscribe(
      pet =>{
        this.pet = pet;
        this.profileUrl = this.getUrl(this.pet.img);
        this.cargando = false;
      }
    );
  }

  getUrl(path : string) : Observable<string>{
    console.log(path);
    const ref = this.storage.ref(path);
     return ref.getDownloadURL()
  }

  deletePet(id : number) {
    this.petsService.deletePet(id)
    .subscribe(
      next => {
        console.log(next)
        this.router.navigate( ['/home'] );
    }
    );
  }

}
