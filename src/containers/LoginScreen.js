import React from 'react'

import {
    Platform,
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    AsyncStorage,
    NetInfo
} from 'react-native'

import Colors from '../Colors/Colors'
const width = Dimensions.get('window').width;

import { Toast } from 'native-base'
import { AppHeader } from '../components/AppHeader';
import { loginRequest } from '../services/requests';
import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class LoginScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoading: false

        }

        // this.buttonInactive = false
    }

    componentDidMount() {
        this.getKey()

        //SplashScreen.hide()
    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');

            if (value !== null) {
                // We have data!!
                console.log(" KEY = " + value)

                this.props.navigation.navigate('HomeScreen')

            } else {
                // if (Platform.OS == 'ios') {
                //     SplashScreen.hide()
                // } else {
                //     setTimeout(() => SplashScreen.hide(), 500)
                // }

            }
        } catch (error) {
            // Error retrieving data
        }
    }


    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ username: text })
            return false;
        }
        else {
            this.setState({ username: text })
            console.log("Email is Correct");
        }
    }

    onLoginClick() {


        // if (!this.buttonInactive) {
        //     this.buttonInactive = true;
        //     // do stuff

        // }
        let username = this.state.username
        let password = this.state.password


        if (username === '' || password === '') {
            //alert('Please enter your details');
            Toast.show({
                text: 'Please enter details',
                buttonText: 'okay', duration: 3000
            })
            // ToastAndroid.show('Please enter your details', ToastAndroid.SHORT)
            // this.buttonInactive = false
            return;
        }

        if (reg.test(username) === false) {
            Toast.show({
                text: 'Invalid email or password1',
                buttonText: 'okay', duration: 3000
            })
            // this.buttonInactive = false
            return;
        }

        if (password.length < 6 || password.length > 15) {
            //alert("password range between 6-15 characters")
            Toast.show({
                text: 'Invalid email or password',
                buttonText: 'okay', duration: 3000
            })
            // ToastAndroid.show("password range between 6-15 characters", ToastAndroid.show)
            // this.buttonInactive = false
            return;
        }

        this.setState({ isLoading: true })

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                loginRequest(username, password).then(response => {
                    console.log("RESPONSE  = = = = " + JSON.stringify(response))
                    if (response.status == '1') {
                        Toast.show({ text: 'Successful', duration: 3000 })

                        if (response.data[0].usertype != 3) {
                            this.storeKey(response.data[0].login_token, response.data[0].usertype, 'en', response.data[0].fname, response.data[0].lname)
                            this.setState({ isLoading: false })
                            this.props.navigation.navigate('HomeScreen')
                        } else {
                            this.storeKey(response.data[0].login_token, response.data[0].usertype, 'en', response.data[0].fname, response.data[0].lname)
                            this.setState({ isLoading: false })
                            this.props.navigation.navigate('ChangeLanguage')
                        }

                    } else {
                        this.setState({ isLoading: false })
                        Toast.show({ text: response.message, duration: 3000 })

                    }
                })
            }else{
                this.setState({ isLoading: false })
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            }
        })




    }

    storeKey = (authkey, userType, language, fname, lname) => {
        var userName = fname + " " + lname
        try {
            AsyncStorage.setItem('AUTH', authkey);
            AsyncStorage.setItem('USERTYPE', userType.toString())
            AsyncStorage.setItem('LANGUAGE', language)
            AsyncStorage.setItem('USERNAME', userName)
        } catch (error) {
            // Error saving data
        }

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                {this.state.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1,

                    }}
                    source={require('../assets/BackgroundImages/login_backdrop.png')}
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} hideMenu={true} />


                    <Text style={{
                        fontSize: 30, color: Colors.textColor,
                        fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', marginTop: 20, marginBottom: 20
                    }}>Login</Text>

                    <View style={styles.inputs}>

                        <TextInput
                            placeholder="Email"
                            autoCapitalize='none'
                            placeholderTextColor={Colors.textColor}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            onChangeText={(username) => this.setState({ username })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    <View style={styles.inputs}>

                        <TextInput
                            placeholder="Password"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            placeholderTextColor={Colors.blackColor}
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    <Text onPress={() => this.props.navigation.navigate("ForgotPassword")}
                        style={{
                            width: width * .8,
                            textAlign: 'right', fontSize: 18,
                            fontFamily: 'BRANDING-THIN',
                            color: Colors.blackColor, margin: 20, alignSelf: 'center'
                        }}>
                        {'Forgot Password'}</Text>


                    <TouchableOpacity

                        onPress={this.onLoginClick.bind(this)}
                        style={styles.loginButton}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'BRANDING-MEDIUM',
                                color: Colors.textColor,
                                fontSize: 20
                            }}>{'Submit'}</Text>
                    </TouchableOpacity>



                    <Text
                        style={{
                            width: width * .8,
                            backgroundColor: '#4D6578',
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontFamily: 'BRANDING-MEDIUM',
                            color: '#fff',
                            fontSize: 20,
                            marginTop: 25,
                            padding:10
                        }}
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                        {'Signup now'}</Text>

                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        color:Colors.black,
        fontSize: 18,
        fontFamily: 'BRANDING-THIN',
        width: width * .8,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS == 'ios' ? 8 : 5,
        paddingBottom: Platform.OS == 'ios' ? 8 : 5,

    },

    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        marginTop: 30,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1

    },

    loginButton: {
        width: width * .8,
        marginTop: 50,
        // paddingRight: 60,
        // paddingLeft: 60,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: Colors.green,
        alignSelf: 'center'
    }

});
