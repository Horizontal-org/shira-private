import styled from 'styled-components'
import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { QuestionLayout } from './components/QuestionLayout';
import { HomeLayout } from './components/HomeLayout';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>          
          <Route path="/question" element={<QuestionLayout />} />
          <Route path="/" element={<HomeLayout />} />
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
