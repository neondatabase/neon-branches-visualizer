import type { Neon } from '../../sdk';
import type { components } from '../../types';

type ProjectResponse = components['schemas']['ProjectResponse'];
type ProjectCreateRequest = components['schemas']['ProjectCreateRequest'];
type ProjectUpdateRequest = components['schemas']['ProjectUpdateRequest'];
type ProjectOperations = components['schemas']['ProjectOperations'];

export class Project {
  constructor(private readonly neon: Neon) {}

  async delete(project_id: string) {
    const { data } = await this.neon.delete<ProjectResponse>(
      `/projects/${project_id}`
    );

    return data.project;
  }

  async get(projectId: string) {
    const { data } = await this.neon.get<ProjectResponse>(
      `/projects/${projectId}`
    );

    return data.project;
  }

  async getAll() {
    const { data } = await this.neon.get<
      components['schemas']['ProjectsResponse']
    >(`/projects`);

    return data.projects;
  }

  async update(projectId: string, data: ProjectUpdateRequest) {
    const { data: response } = await this.neon.patch<ProjectResponse>(
      `/projects/${projectId}`,
      data
    );

    return response.project;
  }

  async create(data: ProjectCreateRequest) {
    const { data: response } = await this.neon.post<ProjectOperations>(
      `/projects`,
      data
    );
    return response.project;
  }
}
