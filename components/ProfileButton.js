import React from "react";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import {AsyncStorage, Dimensions, Platform, StyleSheet} from "react-native";
import {Text, theme} from "galio-framework";

const {height, width} = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

export default class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
  }

  content = (isWhite, style, navigation) => {
    return (
      <>
        <Menu>
          <MenuTrigger style={[styles.button, style]}>
            <Icon
              family="AntDesign"
              size={16}
              name="user"
              color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
            />
          </MenuTrigger>
          <MenuOptions>
            <>
              <MenuOption disabled onSelect={() => alert(`Save`)} text='Профіль'/>
              <MenuOption onSelect={async () => {
                try {
                  await AsyncStorage.removeItem('Token');
                  this.props.updateIsAuthenticate("LogOut")
                } catch (error) {
                  console.log(error)
                }
              }}>
                <Text style={{color: 'red'}}>Вийти</Text>
              </MenuOption>
            </>
          </MenuOptions>
        </Menu>
      </>
    )
  }

  render() {
    return (
      this.content(this.props.isWhite, this.props.style, this.props.navigation)
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});