import React from 'react'

import {
    StyleSheet, Text, View, SafeAreaView,
    ScrollView, Image, AsyncStorage, Alert, TouchableOpacity
} from 'react-native'
import { DrawerItems } from 'react-navigation'

import Colors from '../Colors/Colors'

export const NavigatorHeader = props => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.sideNav, flexDirection: 'row' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.sideNav }}>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('HomeScreen')}
                style={{ alignSelf: 'baseline', paddingLeft: 30, paddingTop:40, paddingBottom:40 }}>
                    <Image 
                        source={require('../assets/Icons/app_logo_sidenav.png')}
                        resizeMode='contain'
                        style={{ height: 35, width: 145 }}
                        ></Image>

                </TouchableOpacity>
                <ScrollView >

                    <DrawerItems
                        labelStyle={{fontFamily:'BRANDING-LIGHT',fontSize:18, fontWeight:'500', color:'#fff'}}
                        {...props}
                        onItemPress={
                            (route) => {
                                if (route.route.routeName !== "HeadNeckCancer" && route.route.routeName !== 'CRC') {
                                    props.onItemPress(route);
                                    // this.props.navigation.navigate(route.route.routeName)
                                    return;
                                } else {
                                    console.log("logged out")
                                   
                                }

                            }
                        }
                    />

                </ScrollView>

               
               
                <TouchableOpacity 
                onPress={() =>   Alert.alert(
                    '',
                    'Do you really want to logout from the app?',
                    [

                        {
                            text: 'Yes',
                            onPress: () => {
                                console.log('Cancel Pressed')
                                AsyncStorage.clear()
                                props.navigation.navigate('LoginScreen')
                            },
                            style: 'cancel',
                        },
                        { text: 'No', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                )}
                style={{ flexDirection: 'row', justifyContent: 'flex-end', position:'absolute', bottom:20, right:20}}>
                    <Image style={{ width: 20, height: 20, marginRight: 10 }}
                        resizeMode='contain'
                        source={require('../assets/Icons/logout.png')}></Image>
                    <Text style={{ fontFamily: 'BRANDING-LIGHT', color: '#fff', fontSize: 16,  }}>Logout</Text>
                </TouchableOpacity>
            

            </SafeAreaView>
            <View style={{ width: 5, backgroundColor: Colors.sideNavLine }}>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    modal: {
        marginLeft: 50, marginRight: 50, marginTop: 60, marginBottom: 60,
        backgroundColor: '#fff', padding: 15, paddingLeft: 20, paddingRight: 20
    },
})
