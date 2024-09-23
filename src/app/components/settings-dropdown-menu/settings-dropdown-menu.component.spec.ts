import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDropdownMenuComponent } from './settings-dropdown-menu.component';

describe('SettingsDropdownMenuComponent', () => {
  let component: SettingsDropdownMenuComponent;
  let fixture: ComponentFixture<SettingsDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDropdownMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
