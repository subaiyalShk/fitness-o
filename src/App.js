
import './App.css';
import {useState} from 'react'
import MenuBar from './components/MenuBar'
import MenuPage from './pages/MenuPage'
import MealPlan from './pages/MealPlan'
import GrocceyList from './pages/GrocceryList'
import { AppData } from './Data/AppData'

function App() {
  // const data = {
  //   pages:{
  //     0: 'MenuPage',
  //     1: 
  //   }
  // }
  const [page, setPage] = useState(0)
  return (
    <div className="App">
      <AppData>
        <MenuBar page={page} setPage={setPage}>
          { page===0? <MenuPage/> : null}
          { page===1? <MealPlan/> : null}
          { page===2? <GrocceyList/> : null}
        </MenuBar>
      </AppData>
    </div>
  );
}

export default App;
