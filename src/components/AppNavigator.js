import React from 'react'
import { Text, AsyncStorage,Image } from 'react-native'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import WelcomeScreen from '../containers/WelcomeScreen'
import SecondScreen from '../containers/SecondScreen'
import LoginScreen from '../containers/LoginScreen';
import RegisterScreen from '../containers/RegisterScreen';
import HomeScreen from '../containers/HomeScreen';
import ErbituxScreen from '../containers/ErbituxScreen';
import DosageCalculator from '../containers/DosageCalculator';
import CalculatorResult from '../containers/CalculatorResult';
import SideEffectManagement from '../containers/SideEffectManagement';
import Precautions from '../containers/Precautions';
import UnderstandingDisease from '../containers/UnderstandingTheDisease/UnderstandingDisease';
import DiseaseDetails from '../containers/UnderstandingTheDisease/DiseaseDetails';

import { NavigatorHeader } from './NavigationHeader'
import ForgotPassword from '../containers/ForgotPassword';
import ChangeLanguage from '../containers/ChangeLanguage';
import SideNavigation from './SideNavigation';
import { View } from 'native-base';

import SplashScreen from 'react-native-splash-screen'



export default class AppNavigator extends React.Component {

    constructor() {
        super()
        this.state = {
            auth: null
        }

    }

    componentDidMount() {
       SplashScreen.hide()
    }

  

    render() {
        return (
            <Container></Container>


        )
    }
}


class Hidden extends React.Component {

    render() {
        return null;
    }
}

class Navigator extends React.Component {

    render() {
        return <Container></Container>;
    }
}


const LoggedInDrawer = createDrawerNavigator({

    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }

    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }

    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }
    },

    HomeScreen: {
        screen: SideNavigation,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }

    },
    ChangeLanguage: {
        screen: ChangeLanguage,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }
    },
    CRC: {
        screen: "CRC",
        navigationOptions: {
            drawerLabel: 
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row', padding:5, paddingLeft:30}}>
                 <Image style={{ width: 20, height: 20, marginRight:10 }}
                    resizeMode='contain'
                    source={require('../assets/Icons/crc_sidenav.png')}></Image>
                 <Text style={{fontFamily:'BRANDING-LIGHT', color:'#fff', fontSize:18, marginRight:20}}>CRC</Text>   
                </View>
                <View style={{flex:1, height:1, backgroundColor:'#EB6A24',marginTop:8, marginLeft:25, marginRight:25}}></View>
            </View>
        }
    },
    HeadNeckCancer: {
        screen: 'HeadNeckCancer',
        navigationOptions: {
            drawerLabel: 
            <View style={{flex:1, flexDirection:'column', paddingTop:10}}>
                <View style={{flex:1, flexDirection:'row', padding:5, paddingLeft:30}}>
                 <Image style={{ width: 20, height: 20, marginRight:10 }}
                    resizeMode='contain'
                    source={require('../assets/Icons/cancer_sidenav.png')}></Image>
                 <Text style={{fontFamily:'BRANDING-LIGHT', color:'#fff', fontSize:18, marginRight:20}}>{'Head & Neck Cancer'}</Text>   
                </View>
                <View style={{flex:1, height:1, backgroundColor:'#EB6A24',marginTop:8, marginLeft:25, marginRight:25}}></View>
            </View>

        }
    },
    ErbituxScreen: {
        screen: ErbituxScreen,
        navigationOptions: {
            drawerLabel: 
            <View style={{flex:1, flexDirection:'column', paddingTop:10}}>
                <View style={{flex:1, flexDirection:'row', padding:5, paddingLeft:30}}>
                 <Image style={{ width: 20, height: 20, marginRight:10 }}
                    resizeMode='contain'
                    source={require('../assets/Icons/erbitux_sidenav.png')}></Image>
                 <Text style={{fontFamily:'BRANDING-LIGHT', color:'#fff', fontSize:18, marginRight:20}}>Erbitux</Text>   
                </View>
                <View style={{flex:1, height:1, backgroundColor:'#EB6A24',marginTop:8, marginLeft:25, marginRight:25}}></View>
            </View>

        }
    },
    // DosageCalculator: {
    //     screen: DosageCalculator,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // SideEffectManagement: {
    //     screen: SideEffectManagement,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // Precautions: {
    //     screen: Precautions,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // UnderstandingDisease: {
    //     screen: UnderstandingDisease,
    //     // navigationOptions: {
    //     //     drawerLabel: <Hidden></Hidden>
    //     // }
    // },
    // DiseaseDetails: {
    //     screen: DiseaseDetails,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // CalculatorResult: {
    //     screen: CalculatorResult,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // ForgotPassword: {
    //     screen: ForgotPassword,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // RegisterScreen: {
    //     screen: RegisterScreen,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // },
    // WelcomeScreen: {
    //     screen: WelcomeScreen,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }

    // },
    // SecondScreen: {
    //     screen: SecondScreen,

    // },
    // Logout: {
    //     screen: "Logout",
    //     navigationOptions: {
    //         drawerLabel: 
    //         <View style={{flex:1, flexDirection:'row',justifyContent:'flex-end' }}>
    //              <Image style={{ width: 20, height: 20, marginRight:10 }}
    //                 resizeMode='contain'
    //                 source={require('../assets/Icons/logout.png')}></Image>
    //              <Text style={{fontFamily:'BRANDING-LIGHT', color:'#fff', fontSize:16, marginRight:20}}>Logout</Text>   
    //         </View>


    //     }
    // },
    // LoggedOut: {
    //     screen: Navigator,
    //     navigationOptions: {
    //         drawerLabel: <Hidden></Hidden>
    //     }
    // }

},
    {
        unmountInactiveRoutes: true,
        contentComponent: NavigatorHeader,
        contentOptions: {
            labelStyle: {
                marginLeft: 0,
                fontFamily: 'BRANDING-LIGHT',
                fontSize: 16,
                color: '#fff',
               
            },
            activeTintColor: "null",  
            inactiveTintColor: null,
            iconContainerStyle: {
                opacity: 1
            }

        },
        drawerLockMode:'locked-closed'
    })

const LoggedOutDrawer = createDrawerNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }

    },
    LoginScreen: {
        screen: LoginScreen,
        // navigationOptions: {
        //     drawerLabel: <Hidden></Hidden>
        // }

    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }
    },
    HomeScreen: {
        screen: LoggedInDrawer,
        navigationOptions: {
            drawerLabel: <Hidden></Hidden>
        }

    },
},
    {
        unmountInactiveRoutes: true,
        contentComponent: NavigatorHeader,
    })

const Container = createAppContainer(LoggedInDrawer)


