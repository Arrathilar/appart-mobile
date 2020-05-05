import React from "react";
import {AsyncStorage, Image} from "react-native";
import {Asset} from "expo-asset";
import {Block, GalioProvider} from "galio-framework";
import {NavigationContainer} from "@react-navigation/native";
// Before rendering any navigation stack
import {enableScreens} from "react-native-screens";
import Screens from "./navigation/Screens";
import {argonTheme, articles, Images} from "./constants";
import Login from "./screens/Login";
import * as env from "./env.json"
import axios from "react-native-axios";

enableScreens();


// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isAuthenticate: false
  };

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

  render() {
    if (!this.state.isAuthenticate) {
      return (
        <Login/>
      )
    } else {
      // if (!this.state.isLoadingComplete) {
      //   return (
      //     <AppLoading
      //       startAsync={this._loadResourcesAsync}
      //       onError={this._handleLoadingError}
      //       onFinish={this._handleFinishLoading}
      //     />
      //   );
      // } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={argonTheme}>
            <Block flex>
              <Screens/>
            </Block>
          </GalioProvider>
        </NavigationContainer>
      )
      // }
    }


    //   return (
    //     <NavigationContainer>
    //       <GalioProvider theme={argonTheme}>
    //         <Block flex>
    //           <Screens />
    //         </Block>
    //       </GalioProvider>
    //     </NavigationContainer>
    //   );
    // }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}
