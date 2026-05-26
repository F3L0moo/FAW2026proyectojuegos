import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Memoria } from './memoria';

describe('Memoria', () => {
  let component: Memoria;
  let fixture: ComponentFixture<Memoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Memoria],
    }).compileComponents();

    fixture = TestBed.createComponent(Memoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
