import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import {
  NoApiKeyProvidedException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from './exceptions';

import { Project } from './resources/Project';
import { Branch } from './resources/Branch';
import { Endpoint } from './resources/Endpoint';

const BASE_URL = 'https://console.neon.tech/api/v2';
const SDK_VERSION = '0.0.1';

type RequestOptions = {
  headers?: {
    [key: string]: string;
  };
  params?: Record<string, any>;
};

export class Neon {
  readonly client: AxiosInstance;
  readonly project = new Project(this);
  readonly branch = new Branch(this);
  readonly endpoint = new Endpoint(this);

  constructor(private readonly apiKey: string) {
    if (!this.apiKey) {
      throw new NoApiKeyProvidedException();
    }

    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'User-Agent': `neon-node/${SDK_VERSION}`,
      },
    });
  }

  async post<T>(
    path: string,
    payload: any,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    const requestHeaders: any = {};

    try {
      return await this.client.post(path, payload, {
        params: options.params,
        headers: requestHeaders,
      });
    } catch (error) {
      this.handleAxiosError({ path, error });

      throw error;
    }
  }

  async get<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get(path, {
        params: options.params,
      });
    } catch (error) {
      this.handleAxiosError({ path, error });

      throw error;
    }
  }

  async patch<T>(
    path: string,
    payload: any,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.patch(path, payload, {
        params: options.params,
      });
    } catch (error) {
      this.handleAxiosError({ path, error });

      throw error;
    }
  }

  async delete<T>(path: string, query?: any): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete(path, {
        params: query,
      });
    } catch (error) {
      this.handleAxiosError({ path, error });

      throw error;
    }
  }

  emitWarning(warning: string) {
    if (typeof process.emitWarning !== 'function') {
      return console.warn(`Neon: ${warning}`);
    }

    return process.emitWarning(warning, 'Neon');
  }

  private handleAxiosError({ path, error }: { path: string; error: unknown }) {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      if (response) {
        const { status, data } = response;

        const { code, errors, message } = data;

        switch (status) {
          case 401: {
            throw new UnauthorizedException();
          }
          case 404: {
            throw new NotFoundException({
              code,
              message,
              path,
            });
          }
          default: {
            throw new BadRequestException({
              code,
              errors,
              message,
            });
          }
        }
      }
    }
  }
}
