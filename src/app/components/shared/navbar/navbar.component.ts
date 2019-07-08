import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.loggedUserSubject.asObservable().subscribe(
      user => this.loggedUser = user
    );
  }

  logout() {
    this.usersService.logout();
  }

}
