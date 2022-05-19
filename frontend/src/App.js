import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify'
import Day from "./components/Day";
import EmptyPage from "./components/EmptyPage";
import CreateWord from "./components/CreateWord";
import CreateDay from "./components/CreateDay";

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path= '/' element={<Dashboard/>}/>
            <Route path= '/login' element={<Login/>}/>
            <Route path= '/register' element={<Register/>}/>
            <Route path='/day/:day' element={<Day/>}/>
            <Route path='/create_word' element={<CreateWord/>}/>
            <Route path='/create_day' element={<CreateDay/>}/>
            <Route path="*" element={<EmptyPage/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
