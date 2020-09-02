import React, {useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from '../views/Home'
import ProfileScreen from '../views/Profile'
import Single from '../views/Single'
import Login from '../views/Login'
import {AuthContext} from '../contexts/AuthContext'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}>

      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}>

      </Tab.Screen>
    </Tab.Navigator>
  )
}

const StackScreen = () => {
  const [isLoggedIn] = useContext(AuthContext)
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={TabScreen} />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
    </Stack.Navigator>
  )
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  )
}

export default Navigator
