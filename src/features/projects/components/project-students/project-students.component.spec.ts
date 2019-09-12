import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStudentsComponent } from './project-students.component';

describe('ProjectStudentsComponent', () => {
  let component: ProjectStudentsComponent;
  let fixture: ComponentFixture<ProjectStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
