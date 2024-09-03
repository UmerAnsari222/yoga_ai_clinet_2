import {Provider} from 'react-redux';
import AppNavigation from './app/navgation/AppNavigation';
import {store} from './app/store/store';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
        <Toast position="bottom" bottomOffset={20} />
      </Provider>
    </>
  );
}

export default App;
