import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  newUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private usersService: UsersService,
              private router:Router
  ) {
  }

  registerUser() {

    this.usersService.createUser(this.newUserForm.value)
    .subscribe(
      (user) => {
        this.usersService.login(user['mail'], user['password'])
        this.router.navigate( ['/home'] );
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
