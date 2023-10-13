import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, AdminLayout, AdminPictureLayout, Login, Error } from './routes';
import { action as loginAction } from './routes/Login';
import { action as pictureDataEditorAction } from './components/admin/PictureDataEditor';

import { loader as sectionsLoader } from './routes/AdminLayout';
import { loader as picturesLoader } from './routes/AdminPictureLayout';
import { loader as singlePictureLoader } from './components/admin/PictureDataEditor';

import { PictureDataEditor } from './components/admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
    errorElement: <Error />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: sectionsLoader,
    errorElement: <Error />,
    children: [
      {
        path: ':sectionId',
        element: <AdminPictureLayout />,
        loader: picturesLoader,
        children: [
          {
            path: ':pictureId',
            element: <PictureDataEditor />,
            loader: singlePictureLoader,
            action: pictureDataEditorAction,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
