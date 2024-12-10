import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Toaster/>
  <main>
    <Outlet/>
  </main>

  </>
  );
}

export default App;
