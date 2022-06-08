import { Home, Login, ProductsDetail, Purchases } from './pages';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';
import { NavBar } from './components';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {




  const isLoading = useSelector(state => state.isLoading);
  
  return (
    <HashRouter>
     <NavBar />
      <Container>
        { isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products/:id' element={<ProductsDetail />} />
         
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>

        </Routes>
       </Container>


    </HashRouter>
  );
}

export default App;
