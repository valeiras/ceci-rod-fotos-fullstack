import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, AdminLayout, AdminSectionLayout, Login, Error } from './routes';
import { action as loginAction } from './routes/Login';

import { loader as menuLoader } from './routes/AdminLayout';
import { loader as sectionLoader } from './routes/AdminSectionLayout';
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
    loader: menuLoader,
    errorElement: <Error />,
    children: [
      {
        path: 'static_uploader',
        element: <StaticUploader />,
      },
      {
        path: ':sectionName',
        element: <AdminSectionLayout />,
        loader: sectionLoader,
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
