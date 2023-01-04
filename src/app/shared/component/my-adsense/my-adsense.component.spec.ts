import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdsenseComponent } from './my-adsense.component';

describe('MyAdsenseComponent', () => {
  let component: MyAdsenseComponent;
  let fixture: ComponentFixture<MyAdsenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdsenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
