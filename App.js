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
import {MenuProvider} from 'react-native-popup-menu';
import {UserContext} from "./globalContext/UserContext";
import {AppLoading} from "expo";

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
  };

  render() {
      if (!this.state.isLoadingComplete) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      } else {
      return (
        <MenuProvider>
          <NavigationContainer>
            <GalioProvider theme={argonTheme}>
              <Block flex>
                <Screens {...this.props}/>
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </MenuProvider>
      )
    }
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
