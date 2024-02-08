import './App.css';
import NavigationBar from './Components/NavigationBar';
import Admin from './Pages/Admin';
import{BrowserRouter, Routes, Route} from "react-router-dom"
import Adminpage from './Components/Adminpage';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavigationBar/>}/>
          <Route path='/Admin' element={<Admin/>}/>
          <Route path='/Adminpage' element={<Adminpage/>}/>
        </Routes>
      </BrowserRouter>
     
    </div>

  );
}


export default App;
