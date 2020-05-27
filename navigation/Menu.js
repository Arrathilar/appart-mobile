import React from "react";
import {useSafeArea} from "react-native-safe-area-context";
import {ScrollView, StyleSheet} from "react-native";
import {Block, Text, theme} from "galio-framework";
import {DrawerItem as DrawerCustomItem} from '../components';

function CustomDrawerContent({drawerPosition, navigation, profile, focused, state, ...rest}) {
    const insets = useSafeArea();
    const screens = [
        "Home",
        "Orders"
    ];
    return (
        <Block
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <Block flex={0.06} style={styles.header}>
                {/*<Image styles={styles.logo} source={Images.Logo}/>*/}
                <Text h4 center>Дім онлайн</Text>
            </Block>
            <Block flex style={{paddingLeft: 8, paddingRight: 14}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    {screens.map((item, index) => {
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                                focused={state.index === index ? true : false}
                            />
                        );
                    })}
                </ScrollView>
            </Block>
        </Block>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        justifyContent: 'space-around'
    },
    header: {
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 3,
        justifyContent: 'center'
    }
});

export default CustomDrawerContent;
