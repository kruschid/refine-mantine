import { NotFound } from './NotFound';

export default {
  title: 'Pages/NotFound',
  component: NotFound,
};

export const WithPasswordConfirmation = () =>
  <NotFound returnTo='/' />;
