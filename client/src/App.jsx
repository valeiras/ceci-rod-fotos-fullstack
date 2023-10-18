import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  AdminLayout,
  AdminSectionLayout,
  Login,
  Error,
  NavigateToFirstSection,
  Gallery,
} from './routes';
import { action as loginAction } from './routes/Login';

import { loader as homeLoader } from './routes/HomeLayout';
import { loader as galleryLoader } from './routes/Gallery';
import { loader as adminLoader } from './routes/AdminLayout';
import { loader as adminSectionLoader } from './routes/AdminSectionLayout';
import {
  loader as pictureEditorLoader,
  action as pictureEditorAction,
} from './components/admin/PictureEditor';

import { PictureEditor } from './components/admin';
import { PictureEditorContextProvider } from './components/admin/pictureEditorContext';

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    id: 'home',
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <NavigateToFirstSection />,
      },
      {
        path: '/:sectionName',
        loader: galleryLoader,
        element: <Gallery />,
      },
    ],
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
    loader: adminLoader,
    errorElement: <Error />,
    children: [
      {
        path: ':sectionName',
        element: <AdminSectionLayout />,
        loader: adminSectionLoader,
        children: [
          {
            path: ':pictureName',
            element: (
              <PictureEditorContextProvider>
                <PictureEditor />
              </PictureEditorContextProvider>
            ),
            loader: pictureEditorLoader,
            action: pictureEditorAction,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
