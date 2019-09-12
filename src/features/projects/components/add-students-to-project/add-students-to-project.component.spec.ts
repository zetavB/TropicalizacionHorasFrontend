import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsToProjectComponent } from './add-students-to-project.component';

describe('AddStudentsToProjectComponent', () => {
  let component: AddStudentsToProjectComponent;
  let fixture: ComponentFixture<AddStudentsToProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentsToProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
