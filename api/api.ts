import axios from 'axios';
import userData from '../src/data/userData';
import { roles as importedRoles } from '../src/data/roleListData';

let roles = [...importedRoles];
let users = [...userData];
import MockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const mock = new MockAdapter(api);

// Mock GET /users
mock.onGet('/users').reply(200, {
  userData,
});

mock.onPost('/users').reply(config => {
  const newUser = JSON.parse(config.data);
  newUser.id = users.length + 1;
  users.push(newUser);
  return [201, newUser];
});

// Mock PUT /users/:id
mock.onPut(/\/users\/\d+/).reply(config => {
  console.log("hello");
  const id = parseInt(config.url!.split('/').pop()!, 10);
  const updatedUser = JSON.parse(config.data);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return [200, updatedUser];
  }
  return [404];
});

// Mock DELETE /users/:id
mock.onDelete(/\/users\/\d+/).reply(config => {
  const id = parseInt(config.url!.split('/').pop()!, 10);
  users = users.filter(user => user.id !== id);
  return [204];
});

// Mock GET /roles
mock.onGet('/roles').reply(200, {
  roles,
});

mock.onPost('/roles').reply(config => {
  const newRole = JSON.parse(config.data);
  newRole.id = roles.length + 1;
  roles.push(newRole);
  return [201, newRole];
});

// Mock PUT /roles/:id
mock.onPut(/\/users\/\d+/).reply(config => {
  const id = parseInt(config.url!.split('/').pop()!, 10);
  const updatedUser = JSON.parse(config.data);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return [200, updatedUser];
  }
  return [404];
});

// Mock DELETE /roles/:id
mock.onDelete(/\/roles\/\d+/).reply(config => {
  const id = parseInt(config.url!.split('/').pop()!, 10);
  roles = roles.filter(role => role.id !== id);
  return [204];
});

export default api;