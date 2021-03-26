import { createGlobalStyle } from 'styled-components';

import Global from './global';
import Root from './root';

export default createGlobalStyle`
  ${Root}
  ${Global}
`;
