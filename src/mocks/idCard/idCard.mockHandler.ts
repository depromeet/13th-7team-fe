import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createIdCard } from '~/mocks/idCard/idCard.mock';

const idCardMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: createIdCard() }));
  }),
];

export default idCardMockHandler;
