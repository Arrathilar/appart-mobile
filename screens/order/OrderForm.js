import React from "react";
import {AsyncStorage, Dimensions, ScrollView, StyleSheet} from "react-native";
// Galio components
import {Block, Button, Input, Text, theme, Toast} from "galio-framework";
// Argon themed components
import axios from "react-native-axios";
import * as env from "../../env"
import {argonTheme} from "../../constants/";
import {Formik} from "formik";
import * as Yup from "yup";

const {width} = Dimensions.get('screen');

class OrderForm extends React.Component {
    state = {
        isNotificationShow: false,
        toastMessage: null,
        toastColor: null,
        data: null,
        workData: null,
        isLoaded: false,
        fieldErrors: {
            information: null,
            warning: null
        }
    };

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
                    data: result.data
                })
            })
            .catch(e => console.log(e.response.data))
        axios({
            url: env.works,
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
            .then((result) => {
                this.setState({
                    workData: result.data.results,
                    isLoaded: true
                })
            })
            .catch(e => console.log(e.response.data))
    }

    OrderSchema = Yup.object().shape({
        work_name: Yup.string()
            .min(2, 'Введіть більше 2 символів!'),
        information: Yup.string()
            .min(2, 'Введіть більше 2 символів!'),
        warning: Yup.string()
            .min(2, 'Введіть більше 2 символів!')
    });

    async handleSubmit(values) {
        const token = await AsyncStorage.getItem('Token');
        axios({
            method: "put",
            url: env.ORDERS + this.props.route.params.pk + '/',
            data: values,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                this.setState({
                    isNotificationShow: true,
                    toastMessage: 'Форму збережено.',
                    toastColor: 'success'
                })
            })
            .catch(error => {
                this.setState({
                    fieldErrors: error.response.data,
                    isNotificationShow: true,
                    toastMessage: `Помилка: ${error.response.data}`,
                    toastColor: 'error'
                });
                console.log(this.state.fieldErrors.apartment)
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return <Text>Loading...</Text>
        } else {
            const {data} = this.state;
            console.log(this.state.workData);
            return (
                <Block flex center fluid>
                    <Toast isShow={this.state.isNotificationShow} positionIndicator="center"
                           color={this.state.toastColor}>
                        {this.state.toastMessage}
                    </Toast>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                        <Formik
                            onSubmit={values => this.handleSubmit(values)}
                            initialValues={{
                                apartment: data.apartment,
                                work: data.work,
                                // work_name: data.work_name,
                                warning: data.warning,
                                information: data.information
                            }}
                            validationSchema={this.OrderSchema}
                        >
                            {({
                                  errors,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit, values
                              }) => (
                                <Block style={styles.block}>
                                    {/*<Text>Назва роботи</Text>*/}
                                    {/*<Input*/}
                                    {/*    style={styles.input}*/}
                                    {/*    rounded*/}
                                    {/*    type="default"*/}
                                    {/*    onChangeText={handleChange('work_name')}*/}
                                    {/*    onBlur={handleBlur('work_name')}*/}
                                    {/*    value={values.work_name}*/}
                                    {/*/>*/}
                                    {/*{errors.work_name ? (*/}
                                    {/*    <Text style={styles.error}*/}
                                    {/*          color={argonTheme.COLORS.ERROR}>{errors.work_name}</Text>*/}
                                    {/*) : null}*/}
                                    <Text>Інформація</Text>
                                    <Input
                                        style={styles.input}
                                        rounded
                                        type="default"
                                        onChangeText={handleChange('information')}
                                        onBlur={handleBlur('information')}
                                        value={values.information}
                                    />
                                    {errors.information ? (
                                        <Text style={styles.error}
                                              color={argonTheme.COLORS.ERROR}>{errors.information}</Text>
                                    ) : null}
                                    {this.state.fieldErrors.information ? (
                                        <Text style={styles.error}
                                              color={argonTheme.COLORS.ERROR}>{this.state.fieldErrors.information}</Text>
                                    ) : null}
                                    <Text>Зауваження</Text>
                                    <Input
                                        style={styles.input}
                                        rounded
                                        type="default"
                                        onChangeText={handleChange('warning')}
                                        onBlur={handleBlur('warning')}
                                        value={values.warning}
                                    />
                                    {errors.warning ? (
                                        <Text style={styles.error}
                                              color={argonTheme.COLORS.ERROR}>{errors.warning}</Text>
                                    ) : null}
                                    {this.state.fieldErrors.warning ? (
                                        <Text style={styles.error}
                                              color={argonTheme.COLORS.ERROR}>{this.state.fieldErrors.warning}</Text>
                                    ) : null}
                                    <Button onPress={handleSubmit} style={styles.button} round
                                            color="success">Зберегти</Button>
                                </Block>
                            )}
                        </Formik>

                    </ScrollView>
                </Block>
            )
        }
    }
}

const styles = StyleSheet.create({
    block: {
        textAlignVertical: 'center',
        alignItems: 'center',
        width: width - theme.SIZES.BASE * 2,
        borderRadius: theme.SIZES.BORDER_RADIUS,
        margin: theme.SIZES.CARD_MARGIN_VERTICAL,
    },
    button: {
        margin: theme.SIZES.CARD_MARGIN_VERTICAL,
        width: width - theme.SIZES.BASE * 4,
    },
    label: {
        color: argonTheme.COLORS.LABEL,
    },
    input: {
        marginLeft: theme.SIZES.INPUT_HORIZONTAL,
        marginRight: theme.SIZES.INPUT_HORIZONTAL
    },
});

export default OrderForm;