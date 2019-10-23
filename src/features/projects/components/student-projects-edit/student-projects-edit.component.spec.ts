import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectsEditComponent } from './student-projects-edit.component';

describe('StudentProjectsEditComponent', () => {
  let component: StudentProjectsEditComponent;
  let fixture: ComponentFixture<StudentProjectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
