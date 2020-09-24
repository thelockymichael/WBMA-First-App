import React, {useEffect, useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native'
import HomeScreen from '../views/Home'
import ProfileScreen from '../views/Profile'
import UploadScreen from '../views/Upload'
import Single from '../views/Single'
import Authentication from '../views/Authentication'
import {AuthContext} from '../contexts/AuthContext'
import {Ionicons} from '@expo/vector-icons'
import MyFiles from '../views/MyFiles'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const defaultStackNavOptions = ({navigation}) => {
  return {
    headerStyle: {
    },
    headerTitleStyle: {
      fontFamily: 'cairo-bold',
    },

    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    // headerTitle: "A Screen",
    // eslint-disable-next-line react/display-name

  }
}

const getHeaderTitle = (route) => {
  // If the focused route is not found,
  // we need to assume it's the initial screen
  // This can happen during if there hasn't
  // been any navigation inside the screen
  // In our case, it's "Feed" as that's the
  // first screen inside the navigator}

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Profile':
      return 'Profile'
    case 'Upload':
      return 'Upload Image'
  }
}

/* const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="MyFiles"
        component={MyFiles}
      />
    </Stack.Navigator>
  )
} */

const TabScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({headerTitle: getHeaderTitle(route)})
  }, [navigation, route])

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={
          {
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="ios-home"
                  size={25}
                  color={tabInfo.color}
                />
              )
            },
          }
        }
      >
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          {
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="ios-person"
                  size={25}
                  color={tabInfo.color}
                />
              )
            },
          }
        }
      >
      </Tab.Screen>
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={
          {
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="ios-image"
                  size={25}
                  color={tabInfo.color}
                />
              )
            },
          }
        }
      ></Tab.Screen>
    </Tab.Navigator >
  )
}

const StackScreen = () => {
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={TabScreen} />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="MyFiles" component={MyFiles} options={{title: 'My Files'}} />
        </>
      ) : (
          <Stack.Screen name="Authentication" component={Authentication} />
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
