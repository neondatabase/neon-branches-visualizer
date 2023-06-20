import { components } from '../../types';
import type { Neon } from '../../sdk';

type EndpointsResponse = components['schemas']['EndpointsResponse'];
type EndpointCreateRequest = components['schemas']['EndpointCreateRequest'];

export class Endpoint {
  constructor(private readonly neon: Neon) {}

  async getAll(projectId: string) {
    const { data } = await this.neon.get<EndpointsResponse>(
      `/projects/${projectId}/endpoints`
    );

    return data.endpoints;
  }

  async create(projectId: string, branchId: string) {
    const { data } = await this.neon.post<EndpointCreateRequest>(
      `/projects/${projectId}/endpoints`,
      {
        endpoint: {
          type: 'read_write',
          branch_id: branchId,
        },
      }
    );

    return data.endpoint;
  }
}
