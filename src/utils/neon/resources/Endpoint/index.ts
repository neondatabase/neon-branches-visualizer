import { components } from '../../neon';
import type { Neon } from '../../sdk';

type EndpointsResponse = components['schemas']['EndpointsResponse'];

export class Endpoint {
  constructor(private readonly neon: Neon) {}

  async getAll(projectId: string) {
    const { data } = await this.neon.get<EndpointsResponse>(
      `/projects/${projectId}/endpoints`
    );

    return data.endpoints;
  }
}
