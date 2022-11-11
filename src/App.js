import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory } from "history";

import { Header, Menu } from './components/menu';
import { Loading, Login, SignUp, Confirm, Home, Config } from './pages';
import { Category, Inventory, InventoryAdd, Modifier, ModifierAdd } from './pages/invt';
import { Employee } from './pages/emp';
import { setIsLoggedIn } from './services';

export function App(){
  const [collapsed, setCollapsed] = useState(true);
  const loggedIn = useSelector(state => state.temp.loggedIn);
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!window.sessionStorage.length){
      window.localStorage.setItem('getSessionStorage', Date.now());
    } else {
      dispatch(setIsLoggedIn(true));
    }
    window.addEventListener('storage', function(event){
      if(event.key === 'getSessionStorage') {
        window.localStorage.setItem('sessionStorage', Date.now());
        window.localStorage.removeItem('sessionStorage');
      } else if(event.key === 'sessionStorage' && !window.sessionStorage.length){
        window.sessionStorage.setItem('CREDENTIALS_TOKEN', Date.now());
        dispatch(setIsLoggedIn(true));
      } else if(event.key === 'CREDENTIALS_FLUSH'){
        dispatch(setIsLoggedIn(false));
        window.sessionStorage.removeItem('CREDENTIALS_TOKEN');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!loggedIn || !user) return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='*' element={<Login />} />
          <Route path='/sign_up' element={<SignUp />} />
          <Route path='/confirm' element={<Confirm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );

  const onClickLayout = e => {
    e?.preventDefault();
    if(!collapsed) setCollapsed(true);
  }

  const menuProps = { collapsed, setCollapsed };
  
  return (
    <HistoryRouter history={createBrowserHistory()}>
      <Suspense fallback={<Loading />}>
        <Layout style={{minHeight: '100vh'}}>
          <Header {...menuProps} />
          <Layout>
            <Menu {...menuProps} />
            <Layout onClick={onClickLayout}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Home />} />
                <Route path='/confirm' element={<Confirm />} />
                <Route path='/config' element={<Config />} />
                <Route path='/inventory/invt_category' element={<Category />} />
                <Route path='/inventory/invt_list' element={<Inventory />} />
                <Route path='/inventory/invt_list/invt_add' element={<InventoryAdd />} />
                <Route path='/inventory/invt_modi' element={<Modifier />} />
                <Route path='/inventory/invt_modi/modi_add' element={<ModifierAdd />} />
                <Route path='/employee/emp_list' element={<Employee />} />
              </Routes>
            </Layout>
          </Layout>
        </Layout>
      </Suspense>
    </HistoryRouter>
  )
}