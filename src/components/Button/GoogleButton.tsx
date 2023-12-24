import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { authenticateGoogleSignin } from '../../store/modules/auth/actions';
import { loginSuccessNavigateHandler } from '../../utils/helpers/loginSuccess';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_AUTH_CLIENT_ID } from '../../config/socialLogin';
import { Button } from '@mantine/core';
import { GrGoogle } from 'react-icons/gr';
import { Google } from '../../utils/assets/image';

interface GoogleLoginProps {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  width?: string;
  register?: 'teacher' | 'student' | undefined;
}

const GoogleButton = ({
  type,
  theme = 'filled_blue',
  size = 'medium',
  text = 'continue_with',
  shape,
  width = '100px',
  register = undefined,
}: GoogleLoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;
  const clientId: string = GOOGLE_AUTH_CLIENT_ID;

  const SuccessHandler = async (credentialResponse: CredentialResponse) => {
    const res = await dispatch(authenticateGoogleSignin(credentialResponse, register));
    if (res.status == 201) loginSuccessNavigateHandler(res, navigate);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* <GoogleLogin
        type={type}
        theme={theme}
        size={size}
        text={text}
        shape={shape}
        width={width}
        // useOneTap={true}

        onSuccess={async (credentialResponse) => SuccessHandler(credentialResponse)}
        onError={() => {
          console.log('Error occur');
        }}
      /> */}
      <Button variant="default" className="w-full flex gap-xs justify-center">
        <img src={Google} className="mr-xs"></img>
        <span className="text-base font-medium text-secondary-dark">Sign In With Google</span>
      </Button>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
