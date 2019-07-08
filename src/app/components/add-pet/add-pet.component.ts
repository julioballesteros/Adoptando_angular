import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import { ImageLoaderService } from 'src/app/services/image-loader.service'
import {Pet} from '../../models/pet.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  selectedFile : File = null;
  loggedUser: User;

  newPetForm = new FormGroup({
    "name": new FormControl('', Validators.required),
    "type": new FormControl('', Validators.required),
    "birthdate": new FormControl('', Validators.required),
    "image": new FormControl('', Validators.required),
    "shelter": new FormControl(''),
    "description": new FormControl('', Validators.required)
  });


  constructor(private petsService : PetsService,
              private imageService : ImageLoaderService,
              private router:Router,
              private usersService: UsersService,
              ) { }

  ngOnInit() {
    this.usersService.loggedUserSubject.asObservable().subscribe(
      user => this.loggedUser = user
    );
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0]

    }

  registerPet() {

    this.newPetForm.value['image'] = this.imageService.uploadImageFirebase(this.selectedFile);

    this.newPetForm.value['shelter'] = this.loggedUser.name;

    this.petsService.addPet(this.newPetForm.value)
    .subscribe(
      (pet) => {
        console.log("Pet created!: " + pet);
        this.router.navigate( ['/pet', pet['id']] );
      },
      (error) => {
        console.log(error);
      }
    );


  }

}
