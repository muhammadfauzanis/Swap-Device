import { jwtDecode, JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

// get token from Cookies
export const getToken = () => {
  const token = Cookies.get('auth_token');

  return token;
};

interface CustomJwtPayload extends JwtPayload {
  name: string;
}

export const removeToken = () => {
  const token = Cookies.remove('auth_token');

  return token;
};

export const getDecodeJwt = () => {
  const token = getToken();

  if (token) {
    const decodeData = jwtDecode<CustomJwtPayload>(token);

    return decodeData;
  }

  return null;
};
