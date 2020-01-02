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
import { FlatList } from 'react-native-gesture-handler';
import { fetchData } from '../services/requests'
import { Loader } from '../components/Loader'

import languages from '../languages'

const regex = /(<([^>]+)>)/ig;

export default class Precautions extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            title: '',
            data: [],
            isLoading:true
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
                languages.setLanguage(lang)

                NetInfo.isConnected.fetch().done((isConnected) => {
                    if (isConnected) {
                        fetchData(value, 'Precautions for Erbitux', lang).then(res => {

                            console.log("RESPONSE ==  " + JSON.stringify(res))
        
                            if (res.status == '1') {
                                this.setState({ data: res.data, title: res.data[0].title, isLoading:false  })
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
                    }else{
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



    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>

                {this.state.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1,
                    }}
                    source={require('../assets/BackgroundImages/login_backdrop.png')}
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} />

                    <View style={{
                            flexDirection: 'row', marginTop: 20, marginBottom: 20,
                            width: width * .8, justifyContent: 'center', alignSelf: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ErbituxScreen')}
                                style={{ position: 'absolute', left: 0, alignSelf: 'center', justifyContent: 'center' }}>
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
                            style={{width: width*.5,
                                fontSize: 30, color: Colors.textColor,marginLeft:10,
                                fontFamily: 'BRANDING-MEDIUM', textAlign: 'left', 
                                alignSelf: 'center'

                            }}>{this.state.title}</Text>
                        </View>


                    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20,paddingBottom:40 }}>

                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    flex: 1, alignSelf: 'center',
                                    flexDirection: index % 2 ? 'row-reverse' : 'row',
                                    marginTop: 5, paddingBottom: 10
                                }}>
                                    <View style={{ width: 25,marginRight:index % 2 ? 0 : 10  }}></View>
                                    <Text style={{textAlign:languages.getLanguage() == 'ar' ? 'right': 'left',
                                        flex: 1,marginRight:10,
                                        fontSize: 18,
                                        color: Colors.textColor, fontFamily: 'BRANDING-LIGHT',

                                    }}>{item.description.replace(regex, '')}</Text>

                                    <View style={{ alignItems: 'center', marginRight:index % 2 ? 10 : 0
                                    }}>

                                        <View style={{ flex: 1, width: 3, backgroundColor: Colors.green }}></View>
                                        <View style={{
                                            backgroundColor: Colors.green, width: 25, height: 25,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Image
                                                style={{ width: 15, height: 15, }}
                                                resizeMode='contain'
                                                source={require('../assets/Icons/erbitux.png')}>
                                            </Image>
                                        </View>

                                        <View style={{ flex: 1, width: 3, backgroundColor: Colors.green }}></View>
                                    </View>
                                </View>

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

});
