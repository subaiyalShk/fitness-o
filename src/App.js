
import './App.css';
import {useEffect, useState} from 'react'
import MenuBar from './components/MenuBar'
import MenuPage from './pages/MenuPage'
import MealPlan from './pages/MealPlan'
import GrocceyList from './pages/GrocceryList'
import { AppData } from './Data/AppData'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import { auth, Auth } from './firebase-config'


function App() {
  const [page, setPage] = useState(0)
  const [authenicated, setAuthenticate] = useState(false)
  const [register, setRegister] = useState(false)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setAuthenticate(true)
      }else{
        setAuthenticate(false)
      }
    })

    return unsubscribe
  },[])

  if(!authenicated)return(<>
    {!register?
      <SignIn setRegister={setRegister}/>
      :
      <SignUp setRegister={setRegister}/>
    }</>)
  else return (
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
