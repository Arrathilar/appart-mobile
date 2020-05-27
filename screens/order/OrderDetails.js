import React from "react";
import {AsyncStorage, Dimensions, ScrollView, StyleSheet, View} from "react-native";
// Galio components
import {Block, Button, Text, theme} from "galio-framework";
// Argon themed components
import axios from "react-native-axios";
import * as env from "../../env"
import {argonTheme} from "../../constants/";

const {width} = Dimensions.get('screen');

class OrderDetails extends React.Component {
    state = {
        data: null,
        isLoaded: false
    };

    toggleSwitch = switchId =>
        this.setState({[switchId]: !this.state[switchId]});

    async componentDidMount() {
        const token = await AsyncStorage.getItem('Token');
        axios({
            url: env.ORDERS + this.props.route.params.pk + '/',
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

    moveToForm(pk) {
        const {navigate} = this.props.navigation;
        navigate('OrderForm', {
            pk: pk
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Text>Loading...</Text>
        } else {
            const {data} = this.state;

            function warning() {
                if (data.warning) {
                    return (
                        <View style={styles.detail}>
                            {data.warning &&
                            <><Text style={styles.label}>Зауваження: </Text><Text
                                style={styles.accent}>{data.warning}</Text></>
                            }
                        </View>
                    )
                } else {
                    return void 0;
                }
            }

            return (
                <Block flex center fluid>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                        <Block style={[styles.block, styles.shadow]}>
                            <View style={styles.detail}>
                                <Text style={styles.label}>Назва замовлення: </Text><Text
                                style={styles.accent}>{data.work_name}</Text>
                            </View>
                            <View style={styles.detail}>
                                <Text style={styles.label}>Номер апартаментів: </Text><Text
                                style={styles.accent}>{data.apartment}</Text>
                            </View>
                            <View style={styles.detail}>
                                <Text style={styles.label}>Статус виконання: </Text><Text
                                style={styles.accent}>{data.exec_status}</Text>
                            </View>
                            <View style={styles.detail}>
                                <Text style={styles.label}>Додаткова інформація:</Text>
                                <Text style={styles.accent}>{data.information}</Text>
                            </View>
                            {warning()}
                            <Button onPress={() => this.moveToForm(data.pk)} style={styles.button} round
                                    color="warning">Редагувати</Button>
                        </Block>
                    </ScrollView>
                </Block>
            )
        }
    }
}

const styles = StyleSheet.create({
    button: {
        margin: theme.SIZES.CARD_MARGIN_VERTICAL,
        width: width - theme.SIZES.BASE * 4,
    },
    detail: {
        alignItems: 'center',
        marginVertical: theme.SIZES.CARD_MARGIN_VERTICAL,
        marginHorizontal: 6
    },
    block: {
        textAlignVertical: 'center',
        alignItems: 'center',
        width: width - theme.SIZES.BASE * 2,
        borderRadius: theme.SIZES.BORDER_RADIUS,
        margin: theme.SIZES.CARD_MARGIN_VERTICAL,
        backgroundColor: argonTheme.COLORS.WHITE,
    },
    label: {
        color: argonTheme.COLORS.LABEL
    },
    accent: {
        fontWeight: "bold",
        color: argonTheme.COLORS.DEFAULT
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});

export default OrderDetails;