import { jwtDecode, JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

// get token from Cookies
export const getToken = () => {
  const token = Cookies.get('auth_token');

  return token;
};

// set token from cookies to cookies
export const setToken = (jwtToken: string) => {
  const token = Cookies.set('auth_token', jwtToken);

  return token;
};

interface CustomJwtPayload extends JwtPayload {
  userId: string;
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
