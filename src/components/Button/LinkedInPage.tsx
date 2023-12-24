import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { PostRequest } from '../../plugins/https';
import { Button } from '@mantine/core';
import { LinkedIn2 } from '../../utils/assets/image';

export default function LinkedInPage() {
  const register = async (data: any) => {
    console.log(data, '@data lin');
    const res = await PostRequest('users/linkedin-authentication', data).then(function (msg) {
      console.log(msg);
    });
  };

  return (
    <LinkedIn
      clientId={import.meta.env.REACT_APP_LINKEDIN_AUTH_CLIENT_ID!}
      redirectUri={`http://localhost:3000/linkedin-callback`}
      onSuccess={async (code) => {
        console.log(code, '@linkedin success');
        if (code) {
          const res = await register({ token: code });

          console.log(res, '@lin res');
        }
      }}
      onError={(error) => {
        console.log(error, '@linkedin error');
      }}
    >
      {({ linkedInLogin }) => (
        // <img
        //   onClick={linkedInLogin}
        //   src={linkedin}
        //   style={{ maxWidth: '180px', cursor: 'pointer' }}
        // />
        <Button variant="default" className="w-full flex gap-xs justify-center">
          <img src={LinkedIn2} className="mr-xs"></img>
          <span className="text-base font-medium text-secondary-dark">Sign In With LinkedIn</span>
        </Button>
      )}
    </LinkedIn>
  );
}
