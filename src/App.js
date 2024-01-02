import './App.css';
import Quiz from './assets/Quiz';
import {jsQuizz} from'./assets/Constants'
function App() {
  return (
    <div>
      <Quiz questions={jsQuizz.questions} />
    </div>
  );
}

export default App;
