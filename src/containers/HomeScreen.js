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

import languages from '../languages'

import { Toast } from 'native-base'
import { AppHeader } from '../components/AppHeader';
// import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class HomeScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            usertype : "",
            username : ""

        }

        this.buttonInactive = false
    }

    componentWillMount() {
        this.getKey()

        //SplashScreen.hide()
    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('LANGUAGE');
            const usertype = await AsyncStorage.getItem('USERTYPE')
            const username = await AsyncStorage.getItem('USERNAME')

            if (value !== null) {
                // We have data!!
                console.log(" Language = " + value)
                languages.setLanguage(value)
                this.setState({usertype: usertype, username: username})

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



    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                {/* {this.props.isLoading && <Loader></Loader>} */}

                <ImageBackground
                    style={{
                        flex: 1,

                    }}
                    source={require('../assets/BackgroundImages/default_backdrop.png')}
                    resizeMode='center'>


                    <AppHeader navigation={this.props.navigation} />


                    <Text style={{
                       
                        fontSize: 20, color: Colors.textColor,
                        fontFamily: 'BRANDING-MEDIUM',textAlign:languages.getLanguage() != 'ar' ? 'left':'right',  
                        marginTop: 20, marginBottom: 20, marginLeft:35,marginRight:35,
                    }}>{this.state.usertype == '3' ? languages.welcome+" "+  this.state.username: languages.welcome + " Dr. " + this.state.username }</Text>

                    {/* <View style={{ marginLeft: 30, marginRight: 30 }}> */}
                        <View style={{flexDirection: "row",marginLeft: 30, marginRight: 30  }}>
                            <TouchableOpacity style={{padding:20,
                                flex: 1, alignItems: 'center',
                                margin: 5, justifyContent:'center',
                                backgroundColor: Colors.green
                            }}>

                                <Image
                                    style={{ width: 40, height: 40, }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/crc.png')}>
                                </Image>
                                <Text style={{
                                      fontSize:18,
                                    color: Colors.textColor, fontFamily: 'BRANDING-SEMIBOLD',
                                    textAlign: 'center',  marginTop:10
                                }}>{languages.crc}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{padding:20,
                                flex: 1, alignItems: 'center',
                                margin: 5, 
                                backgroundColor: Colors.yellowish
                            }}>

                                <Image
                                    style={{ width: 40, height: 40,}}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/head.png')}>
                                </Image>
                                <Text style={{
                                      fontSize:18,
                                    color: Colors.textColor, fontFamily: 'BRANDING-SEMIBOLD',
                                    textAlign: 'center', marginTop:10, 
                                }}>{languages.headneck}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{flexDirection: "row", marginLeft: 30, marginRight: 30 }}>


                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ErbituxScreen')}
                                style={{padding:25,
                                    flex: 1, alignItems: 'center',
                                    margin: 5,  justifyContent:'center',
                                    backgroundColor: Colors.yellowish
                                }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/erbitux.png')}>
                                </Image>
                                <Text style={{
                                    fontSize:18,
                                    color: Colors.textColor,
                                    fontFamily: 'BRANDING-SEMIBOLD',
                                    textAlign: 'center', marginTop:10,
                                }}>{"Erbitux "}</Text>
                            </TouchableOpacity>

                            <View style={{padding:25,
                                flex: 1, alignItems: 'center',
                                margin: 5,  
                                backgroundColor: '#fff'
                            }}>

                            </View>

                        </View>
                    {/* </View> */}

           
                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

});
