import axios from 'axios';
import userData from '../src/data/userData';
import {roles} from '../src/data/roleListData';
import MockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const mock = new MockAdapter(api);

// Mock GET /users
mock.onGet('/users').reply(200, {
  userData,
});

// Mock GET /roles
mock.onGet('/roles').reply(200, {
  roles,
});

export default api;