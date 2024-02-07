
import './App.css';
import {useEffect, useState} from 'react'
import Navigation from './components/Navigation'
import MenuPage from './pages/RecipieBook'
import MealPlan from './pages/MealPlan'
import GrocceyList from './pages/GrocceryList'
import { AppData } from './Data/AppData'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import { auth, Auth } from './firebase-config'

import Backdrop from '@mui/material/Backdrop';
import Logo from './taekwondo.png'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import TrainingPage from './pages/TrainingPage';

function App() {
  const [page, setPage] = useState(0)
  const [authenicated, setAuthenticate] = useState(false)
  const [register, setRegister] = useState(false)
  const [loading, setLoading] = useState(true)

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

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },authenicated)
  
  return (
    <div className="App">
      <Backdrop
        sx={{ color: '#fff', bgcolor:"#192327", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Stack spacing={2}>
          <img height={'300px'} src={Logo} alt="Taekwondo Image" />
          <LinearProgress color="success" />
        </Stack>
      </Backdrop>
      {
        !authenicated ?
        !register?
          <SignIn setRegister={setRegister}/>
          :
          <SignUp setRegister={setRegister}/>
        :
        <AppData>
          <Navigation page={page} setPage={setPage}>
            { page===0? <TrainingPage/> : null}
            { page===1? <MealPlan/> : null}
            { page===2? <GrocceyList/> : null}
          </Navigation>
        </AppData>
      }
    </div>
  )
}

export default App;
