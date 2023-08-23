import React from 'react';
import { Header } from './Components/Header';
import { TaskManager } from './Containers/TaskManager';
import ErrorBoundary from './Utils/ErrorBoundary'
import './App.css';
import './Styles/Global.style.scss';

const App = props => {

  return (
    <div className='App'>
      <ErrorBoundary>
        <Header />
        <TaskManager {...props} />
      </ErrorBoundary>
    </div>
  );

}

export default App;
