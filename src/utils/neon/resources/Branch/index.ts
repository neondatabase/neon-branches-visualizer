import type { Neon } from '../../sdk';
import type { components } from '../../types';

export type TBranch = components['schemas']['Branch'];
type BranchesResponse = components['schemas']['BranchesResponse'];
type BranchResponse = components['schemas']['BranchResponse'];
type BranchCreateRequest = components['schemas']['BranchCreateRequest'];
type BranchOperations = components['schemas']['BranchOperations'];
type EndpointsResponse = components['schemas']['EndpointsResponse'];

export class Branch {
  constructor(private readonly neon: Neon) {}

  async getAll(projectId: string) {
    const { data } = await this.neon.get<BranchesResponse>(
      `/projects/${projectId}/branches`
    );

    return data.branches;
  }

  async get(projectId: string, branchId: string) {
    const { data } = await this.neon.get<BranchResponse>(
      `/projects/${projectId}/branches/${branchId}`
    );

    return data.branch;
  }

  async getBranchesWithEndpoints(projectId: string) {
    const { data: branches } = await this.neon.get<BranchesResponse>(
      `/projects/${projectId}/branches`
    );
    const { data: endpoints } = await this.neon.get<EndpointsResponse>(
      `/projects/${projectId}/endpoints`
    );

    const result = branches.branches.map((branch) => ({
      ...branch,
      endpoint: endpoints.endpoints.find(
        (endpoint) => endpoint.branch_id === branch.id
      ),
    }));

    return result;
  }

  async delete(projectId: string, branchId: string) {
    const { data } = await this.neon.delete<BranchOperations>(
      `/projects/${projectId}/branches/${branchId}`
    );

    return data.branch;
  }

  async create(projectId: string, data: BranchCreateRequest) {
    const { data: response } = await this.neon.post<BranchCreateRequest>(
      `/projects/${projectId}/branches`,
      data
    );
    return response.branch;
  }
}
