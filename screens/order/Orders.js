import React from "react";
import {AsyncStorage, Dimensions, RefreshControl, ScrollView, StyleSheet} from "react-native";
// Galio components
import {Block, Text, theme} from "galio-framework";
// Argon themed components
import {argonTheme} from "../../constants";
import axios from "react-native-axios";
import * as env from "../../env"
import OrderLine from "./components/OrderLine";

const {width} = Dimensions.get("screen");

class Orders extends React.Component {
    state = {
        data: null,
        isLoaded: false,
        modalVisible: false,
        refreshing: false
    };

    toggleSwitch = switchId =>
        this.setState({[switchId]: !this.state[switchId]});

    _loadData = async () => {
        const token = await AsyncStorage.getItem('Token');
        axios({
            url: env.ORDERS,
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
            .then((result) => {
                this.setState({
                    data: result.data,
                    isLoaded: true
                })
            })
            .catch(e => console.log(e.response.data))
    }

    componentDidMount() {
        this._loadData()
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._loadData().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Text>Loading...</Text>
        } else {
            return (
                <Block flex center>
                    <ScrollView showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: 30}}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />}>
                        {this.state.data.results.map((item) => (
                            <OrderLine navigation={this.props.navigation} item={item}/>
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
        width: theme.SIZES.BASE * 23,
        height: theme.SIZES.BASE * 8,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: theme.COLORS.WHITE
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
        shadowOffset: {width: 0, height: 2},
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

export default Orders;