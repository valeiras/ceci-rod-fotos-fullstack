import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, AdminLayout, AdminPictureLayout, Login, Error } from './routes';
import { action as loginAction } from './routes/Login';

import { loader as sectionsLoader } from './routes/AdminLayout';
import { loader as picturesLoader } from './routes/AdminPictureLayout';
import {
  loader as singlePictureLoader,
  action as pictureEditorAction,
} from './components/admin/PictureEditor';

import { PictureEditor } from './components/admin';
import { PictureEditorContextProvider } from './components/admin/pictureEditorContext';

import StaticUploader from './routes/StaticUploader';

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
        path: 'static_uploader',
        element: <StaticUploader />,
      },
      {
        path: ':sectionName',
        element: <AdminPictureLayout />,
        loader: picturesLoader,
        children: [
          {
            path: ':pictureName',
            element: (
              <PictureEditorContextProvider>
                <PictureEditor />
              </PictureEditorContextProvider>
            ),
            loader: singlePictureLoader,
            action: pictureEditorAction,
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
