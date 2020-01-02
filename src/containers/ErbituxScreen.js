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
import { AppHeader } from '../components/AppHeader';
// import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class ErbituxScreen extends React.Component {

    // static navigationOptions={
    //     drawerIcon: <Image style={{ width: 20, height: 20, marginRight:10 }}
    //     resizeMode='contain'
    //     source={require('../assets/Icons/erbitux_sidenav.png')}></Image>
    // }


    constructor(props) {
        super(props)

        this.state = {
            userType: '',
            username: ''

        }

        this.buttonInactive = false
    }

    componentDidMount() {
        this.getKey()

        //SplashScreen.hide()
    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');
            const userType = await AsyncStorage.getItem('USERTYPE')
            const username = await AsyncStorage.getItem('USERNAME')
            if (value !== null) {
                // We have data!!
                console.log(" KEY = " + userType)
                this.setState({userType: userType,username: username})

                // this.props.navigation.navigate('Roadmap  ')

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
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} />


                    <Text style={{
                        fontSize: 20, color: Colors.textColor,
                        fontFamily: 'BRANDING-MEDIUM', textAlign:languages.getLanguage() != 'ar'? 'left':'right', 
                         marginTop: 20, marginBottom: 20, marginLeft:35,marginRight:35,
                    }}>{this.state.userType == '3'? languages.welcome+" "+  this.state.username: languages.welcome + " Dr. " + this.state.username }</Text>


                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                      {this.state.userType == '2' ?
                       <View style={{ flexDirection: "row" }}>
                            
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('DosageCalculator')}
                            style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.green
                            }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/dosage_calculator.png')}>
                                </Image>
                                <Text style={{fontSize:16, color: Colors.textColor, fontFamily: 'BRANDING-SEMIBOLD', 
                                textAlign: 'center', paddingTop:15, }}>{languages.dosageCalculator}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('SideEffectManagement')}
                            style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.yellowish
                            }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/side_effect.png')}>
                                </Image>
                                <Text style={{ color: Colors.textColor, fontSize:16,
                                    fontFamily: 'BRANDING-SEMIBOLD', 
                                    textAlign: 'center', paddingTop:15, }}>{languages.sideEManagement}</Text>
                            </TouchableOpacity>

                        </View>

                        :

                        <View style={{ flexDirection: "row" }}>
                            
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('UnderstandingDisease')}
                            style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.green
                            }}>

                                <Image
                                    style={{ width: 40, height: 40}}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/dosage_calculator.png')}>
                                </Image>
                                <Text style={{fontSize:16, color: Colors.textColor, fontFamily: 'BRANDING-SEMIBOLD', 
                                textAlign: 'center', paddingTop:15, }}>{languages.understandDisease}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('SideEffectManagement')}
                            style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.yellowish
                            }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/side_effect.png')}>
                                </Image>
                                <Text style={{fontSize:16, color: Colors.textColor, 
                                    fontFamily: 'BRANDING-SEMIBOLD', 
                                    textAlign: 'center', paddingTop: 15,  }}>{languages.sideEManagement}</Text>
                            </TouchableOpacity>

                        </View>
                      }
        

                      {this.state.userType == '2' && 
                      <View style={{ flexDirection: "row" }}>


                            <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate('Precautions')}
                            style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.yellowish
                            }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/precautions.png')}>
                                </Image>
                                <Text style={{fontSize:16,
                                    color: Colors.textColor,
                                    fontFamily: 'BRANDING-SEMIBOLD',
                                    textAlign: 'center', paddingTop: 10
                                }}>{languages.precaution}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flex: 1, alignItems: 'center',
                                margin: 5, padding: 20, justifyContent: 'center',
                                backgroundColor: Colors.green
                            }}>

                                <Image
                                    style={{ width: 40, height: 40 }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/medical_updates.png')}>
                                </Image>
                                <Text style={{fontSize:16,
                                    color: Colors.textColor,
                                    fontFamily: 'BRANDING-SEMIBOLD',
                                    textAlign: 'center', paddingTop: 10
                                }}>{languages.medUpdate}</Text>
                            </TouchableOpacity>

                        </View>
                      }
                    </View>
                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

});
