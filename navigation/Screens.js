import React from "react";
import {AsyncStorage, Dimensions} from "react-native";

import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// screens
import Home from "../screens/Home";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import {Header} from "../components";
import Users from "../screens/Users";
import Register from "../screens/Register";
import Login from "../screens/Login";
import axios from "react-native-axios";
import * as env from "../env";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Elements" navigation={navigation} scene={scene}/>
          ),
          cardStyle: {backgroundColor: "#F8F9FE"}
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Articles" navigation={navigation} scene={scene}/>
          ),
          cardStyle: {backgroundColor: "#F8F9FE"}
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: "#FFFFFF"},
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation, scene}) => (
            <Header
              updateIsAuthenticate={props.route.params.updateIsAuthenticate}
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: "#F8F9FE"}
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

class LoginStack extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator mode="card" headerMode="screen">
                <Stack.Screen
                    name="Login"
                    initialParams={{ updateIsAuthenticate: this.props.route.params.updateIsAuthenticate }}
                    component={Login}
                    options={{
                        cardStyle: {backgroundColor: "#F8F9FE"}
                    }}
                />
            </Stack.Navigator>
        );
    }
}

function UsersStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Users"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: "#F8F9FE"}
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} {...props}/>
    </Stack.Navigator>
  );
}

class AppStack extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: false
        }
    }

    /**
     * Get auth token.
     *
     * @return {Promise<string>}
     */
    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('Token');
            if (value !== null) {
                // We have data!!
                return value
            }
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        axios({
            method: "get",
            url: env.REACT_APP_USER_DATA,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
                'Authorization': 'Token ' + await this.getToken()
            }
        })
            .then(
                (response) => {
                    this.setState({
                        isAuthenticate: true,
                        user: response.data
                    });
                }).catch(e => {
            console.log(e)
        });
    }

    updateIsAuthenticate = (toggleName) => {
        switch (toggleName) {
            case "LogOut":
                console.log("LogOut");
                this.setState({
                    isAuthenticate: false
                });
                break;
            case "LogIn":
                console.log("LogIn");
                this.setState({
                    isAuthenticate: true
                });
                break;
            default:
                return
        }
    };

    render() {
        return (
            <Drawer.Navigator
                style={{flex: 1}}
                drawerContent={props => <CustomDrawerContent {...props} />}
                drawerStyle={{
                    backgroundColor: "white",
                    width: width * 0.8
                }}
                drawerContentOptions={{
                    activeTintcolor: "white",
                    inactiveTintColor: "#000",
                    activeBackgroundColor: "transparent",
                    itemStyle: {
                        width: width * 0.75,
                        backgroundColor: "transparent",
                        paddingVertical: 16,
                        paddingHorizonal: 12,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    },
                    labelStyle: {
                        fontSize: 18,
                        marginLeft: 12,
                        fontWeight: "normal"
                    }
                }}
                initialRouteName="Home"
            >
                {this.state.isAuthenticate ?
                    <Drawer.Screen name="Home" component={HomeStack} initialParams={
                        { updateIsAuthenticate: this.updateIsAuthenticate }
                    }/>
                    :
                    <Drawer.Screen name="Home" component={LoginStack} initialParams={
                        { updateIsAuthenticate: this.updateIsAuthenticate }
                    }/>
                }

                <Drawer.Screen name="Profile" component={ProfileStack}/>
                <Drawer.Screen name="Users" component={UsersStack}/>
                <Drawer.Screen name="Account" component={Register}/>
                <Drawer.Screen name="Elements" component={ElementsStack}/>
                <Drawer.Screen name="Articles" component={ArticlesStack}/>
            </Drawer.Navigator>
        );
    }
}

