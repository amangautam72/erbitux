import React from 'react'

import { createStackNavigator } from 'react-navigation'


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


class Hidden extends React.Component {
    render() {
        return null;
    }
}


export default sideNav = createStackNavigator({

    // LoginScreen: {
    //     screen: LoginScreen,
    //     // navigationOptions: {
    //     //     drawerLabel: <Hidden></Hidden>
    //     // }
    //     navigationOptions: {
    //         header: null
    //     }
    // },

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    // ErbituxScreen: {
    //     screen: ErbituxScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    DosageCalculator: {
        screen: DosageCalculator,
        navigationOptions: {
            header: null
        }
    },
    SideEffectManagement: {
        screen: SideEffectManagement,
        navigationOptions: {
            header: null
        }
    },
    Precautions: {
        screen: Precautions,
        navigationOptions: {
            header: null
        }
    },
    UnderstandingDisease: {
        screen: UnderstandingDisease,
        navigationOptions: {
            header: null
        }
    },
    DiseaseDetails: {
        screen: DiseaseDetails,
        navigationOptions: {
            header: null
        }
    },
    CalculatorResult: {
        screen: CalculatorResult,
        navigationOptions: {
            header: null
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: null
        }
    },
   

    // SecondScreen: {
    //     screen: SecondScreen,
        
    // },
    Logout: {
        screen: "Logout",
    },
},
{
    unmountInactiveRoutes: true,
    contentComponent: NavigatorHeader,
})