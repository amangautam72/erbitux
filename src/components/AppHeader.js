import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,SafeAreaView} from 'react-native';



export const AppHeader = (props) => {

    console.log("WHAT :  " + props.hideMenu)

    return (

        <SafeAreaView style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row', margin: 10,  }}>
                
                { props.hideMenu === undefined && 
                
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}
                    style={{ justifyContent: 'center' }}>
                    <Image
                        style={{ width: 24, height: 14, alignSelf: 'center',marginLeft:10 }}
                        resizeMode='contain'
                        source={require('../assets/Icons/sidemenu.png')}>
                    </Image>
                </TouchableOpacity>
                }
                
                <Image style={{ width: 140, height: 35,marginTop:5, alignSelf:'center',marginLeft:10 }}
                resizeMode='contain'
                source={require('../assets/Icons/app_logo.png')}>

                </Image>

            </View>
        </SafeAreaView>
    )
}