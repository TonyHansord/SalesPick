import SideNav from './components/SideNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeView from './components/HomeView';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Sidebar */}
      <SideNav />
      <HomeView />
    </div>
  );
}

export default App;
