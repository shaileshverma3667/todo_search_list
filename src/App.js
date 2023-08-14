import TodoForm from "./Components/TodoForm";
import "bootstrap/dist/css/bootstrap.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
  <TodoForm/>
  <ToastContainer/>
    </>
  );
}

export default App;
