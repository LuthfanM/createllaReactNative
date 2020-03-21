import App from '../App';
import * as React from 'react';
import FilterScreen from '../screens/FilterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
      initialRouteName="App">
        <Stack.Screen name="App" component={App} initialParams={{ dataKey: "None" }}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;