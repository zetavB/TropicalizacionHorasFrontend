import {ProjectModel} from '../../../../models/entities/project.model';

export interface ProjectToAddModel {
  project: ProjectModel;
  selected: boolean;
}
