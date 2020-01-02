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
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { fetchData } from '../services/requests'
import { Loader } from '../components/Loader'

import languages from '../languages'


const regex = /(<([^>]+)>)/ig;

export default class SideEffectManagement extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title:'',
            data: [],
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
                console.log(" KEY = " + lang)
                languages.setLanguage(lang)

                NetInfo.isConnected.fetch().done((isConnected) => {
                    if (isConnected) {
                        fetchData(value, 'Side Effect Management', lang).then(res => {

                            console.log("RESPONSE ==  " + JSON.stringify(res))


                            if (res.status == '1') {
                                this.setState({ data: res.data, title: res.data[0].title, isLoading:false })
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
                this.setState({isLoading:false})
            }
        } catch (error) {
            // Error retrieving data
            this.setState({isLoading:false})
        }
    }



    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                {this.state.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1
                    }}
                    source={require('../assets/BackgroundImages/login_backdrop.png')}
                    resizeMode='stretch'>

                    <View style={{ flex: 1 }}>

                        <AppHeader navigation={this.props.navigation} />

                        <View style={{
                            flexDirection: 'row', marginTop: 20, marginBottom: 20,
                            width: width * .9, 
                        }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ErbituxScreen')}
                                style={{justifyContent: 'center',marginLeft:30, alignSelf:'center'}}>
                                <Image style={{
                                    width: 50, height: 30,
                                    alignSelf: 'center'
                                }}
                                    source={require('../assets/Icons/back.png')} />

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
                            
                        }}>{this.state.title}</Text>
                        </View>


                        <View style={{ flex: 1, marginLeft: 30, marginRight: 30, paddingBottom: 20 }}>

                            <FlatList
                                style={{ flex: 1 }}
                                data={this.state.data}
                                renderItem={({ item, index }) => (
                                    <View style={{
                                        flexDirection: index % 2 ? 'row-reverse' : 'row',
                                        alignSelf: 'center', marginTop: 5
                                    }}>
                                        <View style={{
                                            width: width * .4 + 6, height: 160,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: index % 2 ? Colors.yellowish : Colors.green
                                        }}>

                                            <Image
                                                style={{ width: 40, height: 40 }}
                                                resizeMode='contain'
                                                source={require('../assets/Icons/crc.png')}
                                            >
                                            </Image>
                                        </View>

                                        <ScrollView style={{
                                            width: width * .4 + 6, height: 160,
                                            padding: 10,
                                            backgroundColor: '#fff'
                                        }}>

                                            <Text style={{
                                                textAlign: languages.getLanguage() == 'ar' ? 'right': 'left',
                                                fontSize: 20,
                                                color: index % 2 ? '#F79352' : '#8AA762',
                                                fontFamily: 'BRANDING-SEMIBOLD'
                                            }}>{item.title.replace(regex, '')}</Text>
                                            <Text style={{
                                                textAlign: languages.getLanguage() == 'ar' ? 'right':'left',
                                                fontSize: 18,
                                                color: Colors.textColor, fontFamily: 'BRANDING-MEDIUM',

                                            }}>{item.description.replace(regex, '')}</Text>
                                        </ScrollView>

                                        <View style={{ width: 3, backgroundColor: index % 2 ? Colors.yellowish : Colors.green }}></View>

                                    </View>

                                )}
                                keyExtractor={(item, index) => index.toString()}>

                            </FlatList>

                        </View>



                    </View>

                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({

});
