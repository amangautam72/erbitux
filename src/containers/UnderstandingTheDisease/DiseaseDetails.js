import React from 'react'

import {
    Platform,
    StyleSheet, TextInput,
    View, Text, Image,
    Dimensions,
    ImageBackground,
    AsyncStorage,
    NetInfo,
    TouchableOpacity,
    I18nManager

} from 'react-native'

import Colors from '../../Colors/Colors'
const width = Dimensions.get('window').width;

import { Toast } from 'native-base'
import { AppHeader } from '../../components/AppHeader';
import { fetchData2 } from '../../services/requests'
import { Loader } from '../../components/Loader'
// import { login } from '../actions/LoginActions'

import languages from '../../languages'

import HTML from 'react-native-render-html';

export default class DiseaseDetails extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            title: '',
            data: '',
            id: this.props.navigation.getParam('id', ''),
            headertitle: this.props.navigation.getParam('headertitle', ''),
            selectedIndex: 0,
            isLoading: true

        }

        this.buttonInactive = false

    }

    componentDidMount() {

        //I18nManager.forceRTL(true)
        this.getKey()

        //SplashScreen.hide()
    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');
            const lang = await AsyncStorage.getItem('LANGUAGE')

            if (value !== null) {
                // We have data!!
                console.log(" KEY = " + value)

                NetInfo.isConnected.fetch().done((isConnected) => {
                    if (isConnected) {
                        fetchData2(value, this.state.id, lang).then(res => {

                            console.log("RESPONSE ==  " + JSON.stringify(res))

                            if (res.status == '1') {
                                this.setState({ data: res.data[0].description, title: res.data[0].title,isLoading:false })

                            }
                            else if(res.status == '5'){
                                this.setState({isLoading:false})
                                Toast.show({
                                    text: res.message,
                                    buttonText: 'okay', duration: 3000
                                })
                            }
                            else{
                                this.setState({isLoading:false})
                            }

                        })
                    } else {
                        Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
                    }
                })
            } else {
                // if (Platform.OS == 'ios') {
                //     SplashScreen.hide()
                // } else {
                //     setTimeout(() => SplashScreen.hide(), 500)
                // }

                this.setState({isLoading:false})

            }
        } catch (error) {
            // Error retrieving data
            this.setState({isLoading:false})
        }
    }

    selectItem = (index) => {
        console.log("SELECTED" + index + "WOW")

        this.setState({ selectedIndex: index })
    }



    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>

                {this.state.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1,
                    }}
                    source={require('../../assets/BackgroundImages/default_backdrop.png')}
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} />

                    <View style={{
                        flexDirection: 'row', marginTop: 20, marginBottom: 20,
                        width: width * .9,
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('UnderstandingDisease')}
                            style={{justifyContent: 'center',marginLeft:20, alignSelf:'center'}}>
                            <Image style={{
                                width: 50, height: 30,
                                alignSelf: 'center'
                            }}
                                source={require('../../assets/Icons/back.png')} />

                            <Text style={{
                                color: Colors.black, fontSize: 16,
                                alignSelf: 'center', fontFamily: 'BRANDING-MEDIUM',
                                position: 'absolute', left: 0, marginLeft: 12, paddingBottom: 2
                            }}>Back</Text>
                        </TouchableOpacity>

                        <Text 
                        numberOfLines={2}
                        style={{flex:1,
                            fontSize: 30, color: Colors.textColor,marginLeft:10,
                            fontFamily: 'BRANDING-MEDIUM', textAlign: languages.getLanguage() == 'ar' ? 'right':'left', alignSelf:'center'
                            
                        }}>{this.state.headertitle}</Text>

                        {/* <View style={{width:50}}></View> */}
                    </View>

                    <View 
                    style={{ flexDirection: languages.getLanguage() == 'ar' ? 'row-reverse': 'row', paddingLeft: 30, paddingRight: 30 }}>

                        <View>

                            <Text style={{
                                color: '#63AFAA', 
                                textAlign:languages.getLanguage() == 'ar' ? 'right': 'left',
                                //writingDirection: 'rtl',
                                fontSize: 24, fontFamily: 'BRANDING-SEMIBOLD',
                            }}>{this.state.title.trim()}</Text>

                            <View style={{ }}>
                                <HTML html={this.state.data}
                                    baseFontStyle={{ fontSize: 18,color:Colors.textColor, lineHeight: 18, fontFamily: 'BRANDING-MEDIUM', textAlign:languages.getLanguage() == 'ar' ? 'right': 'left' }}
                                    classesStyles={{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize: 22 } }}
                                />
                            </View>
                        </View>

                        <View style={{ width: 2, backgroundColor: '#63AFAA',marginRight:10, marginLeft:5 }}></View>


                    </View>




                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

    shadowView1: {
        flexDirection: 'row',
        backgroundColor: Colors.yellowish,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        paddingLeft: 10,
        padding: 15,
        // paddingTop: 3, paddingBottom:3

    },
    shadowView2: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        paddingLeft: 10,
        padding: 15,

    },
    shadowView3: {
        flexDirection: 'row',
        backgroundColor: '#E6E7E8',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        padding: 5

    }
});
