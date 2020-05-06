import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import axios from "react-native-axios"
import * as Yup from 'yup';
//galio
import {Block, Button, Icon, Input, Text, theme} from "galio-framework";
//argon
import {argonTheme} from "../constants/";
import {Formik} from "formik";
import * as env from "../env.json"

const {width} = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Login extends React.Component {

  /**
   * Set token to async storage.
   *
   * @param token
   * @return {Promise<void>}
   * @private
   */
  _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('Token', token);
      AsyncStorage.getItem('Token').then(result => console.log(result))
    } catch (error) {
      console.log(error)
    }
  };

  handleSubmit(values) {
    axios({
      method: "post",
      url: env.REACT_APP_LOGIN,
      data: values,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'accept': 'application/json'
      }
    })
      .then(response => {
        this._storeToken(response.data.key)
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Введіть більше 2 символів!')
      .max(50, 'Введіть не більше 50 символів!')
      .required('Поле обов\'язкове!'),
    password: Yup.string()
      .min(6, 'Введіть більше 2 символів!')
      .max(50, 'Введіть не більше 50 символів!!')
      .required('Поле обов\'язкове!')
  });

  render() {
    return (
      <Block style={styles.container}>
        <Formik
          onSubmit={values => this.handleSubmit(values)}
          initialValues={{username: '', password: ''}}
          validationSchema={this.SignupSchema}
        >
          {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit, values
            }) => (
            <View>
              <Input
                left
                rounded
                type="phone-pad"
                placeholder="Номер телефону"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                iconContent={
                  <Icon
                    style={styles.icons}
                    size={15}
                    color={argonTheme.COLORS.ICON}
                    name="account-circle"
                    family="ArgonExtra"
                  />
                }
              />
              {errors.username ? (
                <Text style={styles.error} color={argonTheme.COLORS.ERROR}>{errors.username}</Text>
              ) : null}
              <Input
                left
                password
                viewPass
                rounded
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Пароль"
                iconContent={
                  <Icon
                    style={styles.icons}
                    size={15}
                    color={argonTheme.COLORS.ICON}
                    name="key"
                    family="Entypo"
                  />
                }
              />
              {errors.password ? (
                <Text style={styles.error} color={argonTheme.COLORS.ERROR}>{errors.password}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                radius={30}
              >Вхід</Button>
            </View>
          )}

        </Formik>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
  },
  icons: {
    marginEnd: 10
  },
  errors: {
    marginBottom: 10,
    marginStart: 20,
    marginEnd: 20,
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Login;
