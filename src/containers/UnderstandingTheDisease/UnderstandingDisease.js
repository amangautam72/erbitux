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
    NetInfo,
    FlatList
} from 'react-native'

import Colors from '../../Colors/Colors'
const width = Dimensions.get('window').width;

import { Toast } from 'native-base'
import { AppHeader } from '../../components/AppHeader';
import { fetchData } from '../../services/requests'
import languages from '../../languages'
import { Loader } from '../../components/Loader'


const backgroundColor = [Colors.yellowish,]

export default class UnderstandingDisease extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            data: [],
            selectedIndex: 0,
            isLoading: true

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
            const lang = await AsyncStorage.getItem('LANGUAGE')

            if (value !== null) {
                // We have data!!
                console.log(" KEY = " + value)

                NetInfo.isConnected.fetch().done((isConnected) => {
                    if (isConnected) {
                        fetchData(value, 'Understanding the Disease', lang).then(res => {

                            console.log("RESPONSE ==  " + JSON.stringify(res))

                            if (res.status == '1') {
                                this.setState({ data: res.data, isLoading:false })
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
                        this.setState({isLoading:false})
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

    selectItem = (id, index) => {
        console.log("SELECTED" + index + "WOW")

        this.setState({selectedIndex: index})

        this.props.navigation.navigate('DiseaseDetails', {id: id, headertitle:languages.understandDisease})
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

                    <Text style={{width:width*.8,
                        fontSize: 30, color: Colors.textColor, lineHeight: 30,alignSelf:'center',
                        fontFamily: 'BRANDING-MEDIUM', textAlign: languages.getLanguage() == 'ar' ? 'right':'left', marginTop: 20, marginBottom: 20
                    }}>{languages.understandDisease}</Text>

                    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, }}>

                        <FlatList
                            extraData={this.state.selectedIndex}
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity 
                                onPress = {() => this.selectItem(item.id, index)}
                                style={this.state.selectedIndex === index ? styles.shadowView1: styles.shadowView2}>
                                    <Image
                                        style={{
                                           alignSelf:'center',
                                            width: 20, height: 20
                                        }}
                                        resizeMode='contain'
                                        source={require('../../assets/Icons/rightArrow.png')}>
                                    </Image>

                                    <Text style={{
                                        flex: 1, fontSize: 20,alignSelf:'center',
                                        textAlign: 'center',position:'absolute',left:0, right:0,
                                        color: Colors.textColor,paddingLeft:25,paddingRight:20,
                                        fontFamily: 'BRANDING-MEDIUM',
                                    }}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}>

                        </FlatList>




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
        padding:15,
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
        padding:15,

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
