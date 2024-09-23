import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './settings-dropdown-menu.component.html',
  styleUrl: './settings-dropdown-menu.component.scss'
})
export class SettingsDropdownMenuComponent {
  isActive: boolean = false;

  toggleSettingsMenu() {
    this.isActive = !this.isActive;
  }
}
