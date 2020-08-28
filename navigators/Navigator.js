import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from '../views/Home'
import ProfileScreen from '../views/Profile'
import Single from '../views/Single'

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
  return (
    <Stack.Navigator>
      {/*
      TODO: make two stack screens:
      // 1st: name=Home, component=TabScreen
      // 2nd: name=Single, component=Single
       */}
      <Stack.Screen name="Home" component={TabScreen} />
      <Stack.Screen name="Single" component={Single} />
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
