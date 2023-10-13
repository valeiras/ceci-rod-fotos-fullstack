import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div className="error-container">
          <h3>Ups</h3>
          <p>No hemos podido encontrar la página que buscas</p>
          <button className="btn">
            <Link to="/">Sácame de aquí</Link>
          </button>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="error-container">
        <h3>Ups...</h3>
        <p>Algo ha salido mal:</p>
        <p style={{ fontStyle: 'italic' }}>{error.message}</p>
        <button className="btn">
          <Link to="/">Sácame de aquí</Link>
        </button>
      </div>
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: var(--color-1);
    padding: 4rem;
    border-radius: var(--border-radius);
  }

  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem;
  }
`;
