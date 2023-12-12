import React, {useState, useEffect} from 'react';
import {TamaguiProvider} from 'tamagui';
import tamaguiConfig from './tamagui.config';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import Register from './src/screen/Register';
import Login from './src/screen/Login';
import Initial from './src/screen/Initial';
import Home from './src/screen/Home';

const Stack = createNativeStackNavigator();

const Application = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Initial" component={Initial} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Application />
    </TamaguiProvider>
  );
};

export default App;
