import styled from 'styled-components'
import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>          
          <Route path="/" element={<MainLayout />} />
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
