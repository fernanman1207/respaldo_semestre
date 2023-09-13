import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2viewPage } from './tab2view.page';

describe('Tab2viewPage', () => {
  let component: Tab2viewPage;
  let fixture: ComponentFixture<Tab2viewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab2viewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
