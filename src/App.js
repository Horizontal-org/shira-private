import styled from 'styled-components'
import { 
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { QuestionLayout } from './components/QuestionLayout';
import { HomeLayout } from './components/HomeLayout';
import { LoginLayout } from './components/LoginLayout';
import shallow from 'zustand/shallow';
import { useStore } from './store';
import { useEffect } from 'react';

function App() {

  const {
    user,
    fetching,
    me
  } = useStore((state) => ({
    user: state.user,
    fetching: state.fetching,
    fetchMe: state.fetchMe,
    me: state.me
  }), shallow)


  useEffect(() => {
    me()    
  }, [])

  if (fetching) {
    return (
      <div>
        ...Loading
      </div>
    )
  }
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>          
          <Route path='/login' element={<LoginLayout />} />
          { user && (
            <>
              <Route path="/question" element={<QuestionLayout />} />
              <Route path="/" element={<HomeLayout />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default App;
