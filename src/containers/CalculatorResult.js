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
import { AndroidPicker } from '../components/AndroidPicker'
import { AppHeader } from '../components/AppHeader';
import SwipeableViews from 'react-swipeable-views-native';
// import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class CalculatorResult extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            heightUnit: ['cms', 'inch'],
            selectedHeightUnit: 'cms',
            heightUnitVisibility: false,
            weightUnit: ['kgs', 'lbs'],
            selectedWeightUnit: 'kgs',
            weightUnitVisibility: false,
            resultData: ['1', '2', '3', '4']


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

            if (value !== null) {
                // We have data!!
                console.log(" KEY = " + value)

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
                        fontSize: 40, color: Colors.textColor,
                        fontFamily: 'BRANDING-MEDIUM', textAlign: 'center',
                        marginTop: 20, marginBottom: 20
                    }}>Dosage Calculator</Text>

                    <SwipeableViews style={{flex:0.4}}>
                        {this.state.resultData.map((v) => {
                            return <View style={styles.inputs}>

                                <Text style={{ fontSize: 18, fontFamily: 'BRANDING-THIN', paddingLeft: 10 }}>Weekly Protocol</Text>

                                <Text style={{
                                    color: '#63AFAA', fontSize: 25, fontFamily: 'BRANDING-THIN',
                                    alignSelf: 'flex-end', paddingRight: 30, paddingTop: 10
                                }}>Weekly Protocol</Text>

                                <Text style={{
                                    color: '#63AFAA', fontSize: 18,
                                    fontFamily: 'BRANDING-THIN', paddingLeft: 10
                                }}>Dosage</Text>
                                <Text style={{
                                    color: Colors.blackColor, fontSize: 25,
                                    fontFamily: 'BRANDING-THIN', paddingLeft: 10
                                }}>250 mg/m2</Text>

                                <Text style={{
                                    fontSize: 16, fontFamily: 'BRANDING-THIN',
                                    alignSelf: 'center', marginTop: 50, padding: 5
                                }}>Swipe left/right to change weeks
                        </Text>

                            </View>
                        })}
                    </SwipeableViews>

                    
                    <Text style={{color: '#63AFAA', fontSize: 20,
                     fontFamily: 'BRANDING-THIN', paddingLeft: 20 }}>Parameters</Text>
                   
                   <Text style={{
                                    color: Colors.blackColor, fontSize: 18,
                                    fontFamily: 'BRANDING-THIN', paddingLeft: 20, marginTop:5
                                }}>Weight:   72 Kgs</Text>

<Text style={{
                                    color: Colors.blackColor, fontSize: 18,
                                    fontFamily: 'BRANDING-THIN', paddingLeft: 20, marginTop:5
                                }}>Height:   172 cms</Text>


                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'BRANDING-THIN',
        // width: width * .4,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS == 'ios' ? 8 : 5,
        paddingBottom: Platform.OS == 'ios' ? 8 : 5,

    },

    inputs: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        margin: 15

    },

    unitsDropDown: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1

    },

    calculateButton: {
        width: width * .8,
        marginTop: 80,
        // paddingRight: 60,
        // paddingLeft: 60,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#4D6578',
        alignSelf: 'center'
    },
    slideContainer: {
        height: 100,
    },
    slide: {
        padding: 15,
        height: 100,
    },
    slide1: {
        backgroundColor: '#FEA900',
    },
    slide2: {
        backgroundColor: '#B3DC4A',
    },
    slide3: {
        backgroundColor: '#6AC0FF',
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
});
