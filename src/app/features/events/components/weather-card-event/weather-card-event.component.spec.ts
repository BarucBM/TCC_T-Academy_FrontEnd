import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardEventComponent } from './weather-card-event.component';

describe('WeatherCardEventComponent', () => {
  let component: WeatherCardEventComponent;
  let fixture: ComponentFixture<WeatherCardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherCardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
