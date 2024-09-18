import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  boardName:string = 'Platform Launch';
  isActive:boolean = false;


  toggleSettingsMenu () {
    this.isActive = !this.isActive;
  }

  editBoard () {
    this.isActive = false;
  }

  deleteBoard () {
    this.isActive = false;
  }

}
