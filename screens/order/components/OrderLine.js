import React from 'react';
import {Button, Card, Text, theme} from "galio-framework";
import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {argonTheme} from "../../../constants";

export default class OrderLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    render() {
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Робота: {this.props.item.work_name}</Text>
                            <Button style={styles.buttonWithMargin} color="success">Відмітити виконаною</Button>
                            <Button onPress={() => this.setState({modalVisible: false})}
                                    color="warning">Закрити</Button>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    onPress={() => this.moveToDetail(this.props.item.pk)}
                    onLongPress={() => this.setState({modalVisible: true})}
                >
                    <Card
                        flex
                        borderless
                        shadow
                        style={[styles.card]}
                        title={this.props.item.work_name}
                        caption={`Статус виконання: ${this.props.item.exec_status}\nІнформація: ${this.props.item.information}`}
                        imageStyle={styles.card}
                        imageBlockStyle={{padding: theme.SIZES.BASE / 2}}
                        image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
                    />
                </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
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
    shadow: {
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2
    },
    buttonWithMargin: {
        marginBottom: 15
    }
});