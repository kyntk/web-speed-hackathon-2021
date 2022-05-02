import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

const AuthModalContainer = lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = lazy(() => import('../NewPostModalContainer'));
const NotFoundContainer = lazy(() => import('../NotFoundContainer'));
const PostContainer = lazy(() => import('../PostContainer'));
const TimelineContainer = lazy(() => import('../TimelineContainer'));
const UserProfileContainer = lazy(() => import('../UserProfileContainer'));
const TermContainer = lazy(() => import('../TermContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    data && setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Suspense fallback={<div />}>
          <Routes>
            <Route element={<TimelineContainer />} path="/" />
            <Route element={<UserProfileContainer />} path="/users/:username" />
            <Route element={<PostContainer />} path="/posts/:postId" />
            <Route element={<TermContainer />} path="/terms" />
            <Route element={<NotFoundContainer />} path="*" />
          </Routes>
        </Suspense>
      </AppPage>

      {modalType === 'auth' ? (
        <Suspense fallback={<div />}>
          <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
        </Suspense>
      ) : null}
      {modalType === 'post' ? (
        <Suspense fallback={<div />}>
          <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} />
        </Suspense>
      ) : null}
    </>
  );
};

export { AppContainer };
