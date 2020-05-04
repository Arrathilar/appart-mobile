import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import {Block, Text, Button as GaButton, theme, Card} from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import axios from "react-native-axios";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";

const { width } = Dimensions.get("screen");

class Users extends React.Component {
  state = {
    data: null,
    isLoaded: false
  };

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });

  componentDidMount() {
    axios('https://jsonplaceholder.typicode.com/users')
      .then((result) => {
        this.setState({
          data: result.data,
          isLoaded: true
        })
      })
  }

  render() {
    if (!this.state.isLoaded) {
      return <Text>Loading...</Text>
    } else {
    console.log(this.state.data)
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.state.data.map((item) => (
            <TouchableOpacity onPress={() => alert("test")}>
            <Card
              flex
              borderless
              style={styles.card}
              title={item.name}
              caption={item.email}
              location={item.address.city}
              avatar="http://i.pravatar.cc/100?id=skater"
              imageStyle={styles.card}
              imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
              image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
            />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    )
    }
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: theme.SIZES.BASE * 20,
    height: theme.SIZES.BASE * 6,
    marginBottom: 5,
    marginTop: 5
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});

export default Users;