/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';

import { Form, redirect, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { LoginFormRow } from '../components';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    return redirect('/admin');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Login</h4>
        <LoginFormRow name="email" type="email" />
        <LoginFormRow name="password" type="password" />

        <button type="submit" className="btn" disabled={isSubmmitting}>
          {isSubmmitting ? 'enviando...' : 'enviar'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
  }
`;
