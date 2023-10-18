import { Navigate, useRouteLoaderData } from 'react-router-dom';

const NavigateToFirstSection = () => {
  const { sections } = useRouteLoaderData('home');
  return <Navigate to={`/${sections[0].friendlyUrlName}`} />;
};
export default NavigateToFirstSection;
