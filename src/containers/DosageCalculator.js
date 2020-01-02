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

import { AndroidPicker } from '../components/AndroidPicker'
import { AppHeader } from '../components/AppHeader';


import languages from '../languages'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class DosageCalculator extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            heightUnit: ['cms', 'inch'],
            selectedHeightUnit: 'cms',
            heightUnitVisibility: false,
            weightUnit: ['kgs', 'lbs'],
            selectedWeightUnit: 'kgs',
            weightUnitVisibility: false


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
                        fontSize: 40, color: Colors.textColor,marginLeft:30,
                        fontFamily: 'BRANDING-MEDIUM', textAlign: languages.getLanguage() == 'ar' ? 'right':'left',
                        marginTop: 20, marginBottom: 20
                    }}>Dosage Calculator</Text>

                    <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30 }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginRight: 25 }}>
                            <Text style={{
                                 fontSize: 20,
                                color: Colors.textColor,
                                fontFamily: 'BRANDING-SEMIBOLD',
                            }}>
                                Height
                            </Text>

                            <View style={styles.inputs}>

                                <TextInput

                                    autoCapitalize='none'
                                    placeholderTextColor={Colors.textColor}
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    onChangeText={(username) => this.setState({ username: username })}
                                    style={styles.textInput}>
                                </TextInput>

                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25 }}>

                            <Text style={{
                                fontSize: 20,
                                color: Colors.textColor,
                                fontFamily: 'BRANDING-SEMIBOLD',
                            }}>
                                Units
                            </Text>

                            <TouchableOpacity
                                onPress={() => this.setState({ heightUnitVisibility: true })}
                            >

                                <View
                                    style={styles.unitsDropDown}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 18,
                                            paddingTop: 8, paddingBottom: 8,
                                            paddingLeft: 10, paddingRight: 10,
                                            fontFamily: 'BRANDING-MEDIUM',
                                            color: Colors.textColor,
                                        }}>{this.state.selectedHeightUnit}</Text>
                                    <Image style={{
                                        width: 10, height: 10,
                                        margin: 10, position: 'absolute', right: 0, alignSelf: 'center'
                                    }}
                                        source={require('../assets/Icons/dropdown.png')} />
                                    <AndroidPicker data={this.state.heightUnit}
                                        visibility={this.state.heightUnitVisibility}
                                        visible={(heightUnitVisibility) => this.setState({ heightUnitVisibility })}
                                        callback={(item) => this.setState({ selectedHeightUnit: item, heightUnitVisibility: false })}>
                                    </AndroidPicker>

                                </View>
                            </TouchableOpacity>


                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginRight: 25 }}>
                            <Text style={{
                                fontSize: 20,
                                color: Colors.textColor,
                                fontFamily: 'BRANDING-SEMIBOLD',
                            }}>
                                Weight
                            </Text>

                            <View style={styles.inputs}>

                                <TextInput

                                    autoCapitalize='none'
                                    placeholderTextColor={Colors.textColor}
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    onChangeText={(username) => this.setState({ username: username })}
                                    style={styles.textInput}>
                                </TextInput>

                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25 }}>

                            <Text style={{
                                fontSize: 20,
                                color: Colors.textColor,
                                fontFamily: 'BRANDING-SEMIBOLD',
                            }}>
                                Units
                            </Text>

                            <TouchableOpacity
                                onPress={() => this.setState({ weightUnitVisibility: true })}
                            >

                                <View
                                    style={styles.unitsDropDown}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 18,
                                            paddingTop: 8, paddingBottom: 8,
                                            paddingLeft: 10, paddingRight: 10,
                                            fontFamily: 'BRANDING-MEDIUM',
                                            color: Colors.textColor,
                                        }}>{this.state.selectedWeightUnit}</Text>
                                    <Image style={{
                                        width: 10, height: 10,
                                        margin: 10, position: 'absolute', right: 0, alignSelf: 'center'
                                    }}
                                        source={require('../assets/Icons/dropdown.png')} />
                                    <AndroidPicker data={this.state.weightUnit}
                                        visibility={this.state.weightUnitVisibility}
                                        visible={(weightUnitVisibility) => this.setState({ weightUnitVisibility })}
                                        callback={(item) => this.setState({ selectedWeightUnit: item, weightUnitVisibility: false })}>
                                    </AndroidPicker>

                                </View>
                            </TouchableOpacity>


                        </View>

                    </View>

                    <TouchableOpacity

                        // onPress={this.onLoginClick.bind(this)}
                        style={styles.calculateButton}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'BRANDING-MEDIUM',
                                color: '#fff',
                                fontSize: 20
                            }}>{'Calculate Dosage'}</Text>
                    </TouchableOpacity>



                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'BRANDING-MEDIUM',
        // width: width * .4,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS == 'ios' ? 8 : 5,
        paddingBottom: Platform.OS == 'ios' ? 8 : 5,

    },

    inputs: {
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
    }
});
