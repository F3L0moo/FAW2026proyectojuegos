import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adivina } from './adivina';

describe('Adivina', () => {
  let component: Adivina;
  let fixture: ComponentFixture<Adivina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adivina],
    }).compileComponents();

    fixture = TestBed.createComponent(Adivina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
