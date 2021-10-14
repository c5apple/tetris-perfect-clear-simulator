import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AdsenseModule } from 'ng2-adsense';

import { MyAdsenseComponent } from './my-adsense.component';

describe('MyAdsenseComponent', () => {
  let component: MyAdsenseComponent;
  let fixture: ComponentFixture<MyAdsenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AdsenseModule.forRoot({}),
      ],
      declarations: [MyAdsenseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
