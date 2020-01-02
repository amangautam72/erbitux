import React from 'react'

import {
    Platform,
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'

import Colors from '../Colors/Colors'
const width = Dimensions.get('window').width;

import { Toast } from 'native-base'
import { AppHeader } from '../components/AppHeader';
import { forgotPassword } from '../services/requests';
import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class ForgotPassword extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isLoading: false

        }

        // this.buttonInactive = false
    }

    componentDidMount() {

        
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

    onSubmitClick() {


        // if (!this.buttonInactive) {
        //     this.buttonInactive = true;
        //     // do stuff

        // }
        let email = this.state.email


        if (email === '') {
            //alert('Please enter your details');
            Toast.show({
                text: 'Invalid email',
                buttonText: 'okay', duration: 3000
            })
            // ToastAndroid.show('Please enter your details', ToastAndroid.SHORT)
            // this.buttonInactive = false
            return;
        }

        if (reg.test(email) === false) {
            Toast.show({
                text: 'Invalid email',
                buttonText: 'okay', duration: 3000
            })
            // this.buttonInactive = false
            return;
        }

        this.setState({ isLoading: true })

        forgotPassword(email).then(response => {
            console.log("RESPONSE  = = = = " + JSON.stringify(response))
            if(response.status == '1'){
                Toast.show({text: 'an email has been sent to your mail id', duration:3000})
                this.setState({email:'', isLoading: false})

            }else{
                Toast.show({text: response.message, duration:3000})
                this.setState({ isLoading: false })
            }
        }).catch((err) =>  {
            Toast.show({text: 'Something went wrong', duration:3000})
            this.setState({ isLoading: false })
        })

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                {/* {this.props.isLoading && <Loader></Loader>} */}

                <ImageBackground
                    style={{
                        flex: 1,

                    }}
                    source={require('../assets/BackgroundImages/default_backdrop.png')}
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} hideMenu={true} />


                    <Text style={{
                        fontSize: 30, color: Colors.textColor,
                        fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', marginTop: 20, marginBottom: 20
                    }}>Forgot Password</Text>

                    <View style={styles.inputs}>

                        <TextInput
                            placeholder="Email"
                            autoCapitalize='none'
                            placeholderTextColor={Colors.textColor}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>



                   

                    <TouchableOpacity

                        onPress={this.onSubmitClick.bind(this)}
                        style={styles.submitButton}>

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
                            alignSelf:'center',
                            fontFamily: 'BRANDING-MEDIUM',
                            color: '#fffFFF',
                            fontSize: 20,
                            marginTop:25,
                            paddingLeft:5,
                            paddingRight:5,
                            paddingTop:10, paddingBottom:10
                        }}
                        onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        {'Already have an account?'}</Text>

                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        color:Colors.black,
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

    submitButton: {
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
