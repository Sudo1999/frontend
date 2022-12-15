import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeWelcomeComponent } from './poe-welcome.component';

describe('PoeWelcomeComponent', () => {
  let component: PoeWelcomeComponent;
  let fixture: ComponentFixture<PoeWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
