import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createUserInfo } from '~/mocks/user/user.mock';

export const userMockHandler = [
  rest.get(`${ROOT_API_URL}/user/profile`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createUserInfo()));
  }),
  rest.post(`${ROOT_API_URL}/user/character`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get(`${ROOT_API_URL}/invitation/:code`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ planetId: 1 }));
  }),
  rest.post(`${ROOT_API_URL}/join/planet`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
