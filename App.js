import React from "react";
import {Image, Vibration} from "react-native";
import {Asset} from "expo-asset";
import {Block, GalioProvider} from "galio-framework";
import {NavigationContainer} from "@react-navigation/native";
// Before rendering any navigation stack
import {enableScreens} from "react-native-screens";
import Screens from "./navigation/Screens";
import {argonTheme, articles, Images} from "./constants";
import {MenuProvider} from 'react-native-popup-menu';
import {AppLoading, Notifications} from "expo";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

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
        expoPushToken: '',
        notification: {},
    };

    componentDidMount() {
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync();
            this.setState({expoPushToken: token});
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    _handleNotification = notification => {
        console.log(notification)
        Vibration.vibrate();
        this.setState({notification: notification});
    };

    sendPushNotification = async () => {
        const message = {
            to: this.state.expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: {data: 'goes here'},
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
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
                                {/*<Button title={'Press to Send Notification'}*/}
                                {/*        onPress={() => this.sendPushNotification()}/>*/}
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
