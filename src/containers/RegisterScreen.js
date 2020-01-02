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
    NetInfo,ScrollView,KeyboardAvoidingView
} from 'react-native'

import Colors from '../Colors/Colors'
const width = Dimensions.get('window').width;

import { Picker, Toast } from 'native-base'
import { AndroidPicker } from '../components/AndroidPicker'
import { AppHeader } from '../components/AppHeader';
import { RegisterRequest, hospitals } from '../services/requests';
import { Loader } from '../components/Loader'

import languages from '../languages'
// import { Loader } from '../components/Loader'
// import { login } from '../actions/LoginActions'


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const countries = ['Select Country', 'Afghanistan'
    , 'Albania', 'Algeria', 'American Samoa'
    , 'Andorra', 'Angola'
    , 'Anguilla', 'Antarctica'
    , 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria'
    , 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus'
    , 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan'
    , 'Bolivia', 'Bosnia and Herzegovina'
    , 'Botswana', 'Bouvet Island'
    , 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria'
    , 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde'
    , 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile'
    , 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros'
    , 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia (Hrvatska)'
    , 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti'
    , 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador'
    , 'Equatorial Guinea', 'Eritrea', 'Estonia'
    , 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland'
    , 'France', 'France, Metropolitan', 'French Guiana'
    , 'French Polynesia', 'French Southern Territories', 'Gabon'
    , 'Gambia', 'Georgia', 'Germany'
    , 'Ghana', 'Gibraltar', 'Guernsey', 'Greece'
    , 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala'
    , 'Guinea', 'Guinea-Bissau', 'Guyana'
    , 'Haiti', 'Heard and Mc Donald Islands', 'Honduras'
    , 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Isle of Man'
    , 'Indonesia', 'Iran (Islamic Republic of)'
    , 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jersey', 'Jamaica', 'Japan', 'Jordan'
    , 'Kazakhstan', 'Kenya', 'Kiribati', "Korea, Democratic People''s Republic of", 'Korea, Republic of'
    , 'Kosovo', 'Kuwait', 'Kyrgyzstan', "Lao People''s Democratic Republic"
    , 'Latvia', 'Lebanon', 'Lesotho', 'Liberia'
    , 'Libyan Arab Jamahiriya', 'Liechtenstein'
    , 'Lithuania', 'Luxembourg'
    , 'Macau', 'Macedonia'
    , 'Madagascar'
    , 'Malawi'
    , 'Malaysia'
    , 'Maldives'
    , 'Mali'
    , 'Malta'
    , 'Marshall Islands'
    , 'Martinique'
    , 'Mauritania'
    , 'Mauritius'
    , 'Mayotte'
    , 'Mexico'
    , 'Micronesia, Federated States of'
    , 'Moldova, Republic of'
    , 'Monaco'
    , 'Mongolia'
    , 'Montenegro'
    , 'Montserrat'
    , 'Morocco'
    , 'Mozambique'
    , 'Myanmar'
    , 'Namibia'
    , 'Nauru'
    , 'Nepal'
    , 'Netherlands'
    , 'Netherlands Antilles'
    , 'New Caledonia'
    , 'New Zealand'
    , 'Nicaragua'
    , 'Niger'
    , 'Nigeria'
    , 'Niue'
    , 'Norfolk Island'
    , 'Northern Mariana Islands'
    , 'Norway'
    , 'Oman'
    , 'Pakistan'
    , 'Palau'
    , 'Palestine'
    , 'Panama'
    , 'Papua New Guinea'
    , 'Paraguay'
    , 'Peru'
    , 'Philippines'
    , 'Pitcairn'
    , 'Poland'
    , 'Portugal'
    , 'Puerto Rico'
    , 'Qatar'
    , 'Reunion'
    , 'Romania'
    , 'Russian Federation'
    , 'Rwanda'
    , 'Saint Kitts and Nevis'
    , 'Saint Lucia'
    , 'Saint Vincent and the Grenadines'
    , 'Samoa'
    , 'San Marino'
    , 'Sao Tome and Principe'
    , 'Saudi Arabia'
    , 'Senegal'
    , 'Serbia'
    , 'Seychelles'
    , 'Sierra Leone'
    , 'Singapore'
    , 'Slovakia'
    , 'Slovenia'
    , 'Solomon Islands'
    , 'Somalia'
    , 'South Africa'
    , 'South Georgia South Sandwich Islands'
    , 'South Sudan'
    , 'Spain'
    , 'Sri Lanka'
    , 'St. Helena'
    , 'St. Pierre and Miquelon'
    , 'Sudan'
    , 'Suriname'
    , 'Svalbard and Jan Mayen Islands'
    , 'Swaziland'
    , 'Sweden'
    , 'Switzerland'
    , 'Syrian Arab Republic'
    , 'Taiwan'
    , 'Tajikistan'
    , 'Tanzania, United Republic of'
    , 'Thailand'
    , 'Togo'
    , 'Tokelau'
    , 'Tonga'
    , 'Trinidad and Tobago'
    , 'Tunisia'
    , 'Turkey'
    , 'Turkmenistan'
    , 'Turks and Caicos Islands'
    , 'Tuvalu'
    , 'Uganda'
    , 'Ukraine'
    , 'United Arab Emirates'
    , 'United Kingdom'
    , 'United States'
    , 'United States minor outlying islands'
    , 'Uruguay'
    , 'Uzbekistan'
    , 'Vanuatu'
    , 'Vatican City State'
    , 'Venezuela'
    , 'Vietnam'
    , 'Virgin Islands (British)'
    , 'Virgin Islands (U.S.)'
    , 'Wallis and Futuna Islands'
    , 'Western Sahara'
    , 'Yemen'
    , 'Zaire'
    , 'Zambia'
    , 'Zimbabwe']

export default class RegisterScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            hospital: [],
            selectedHospitalId: 0,
            selectedHospital: 'Select Hospital',
            selectedCountry: 'Select Country',
            email: '',
            city: '',
            telephone: '',
            userType: '',
            hospitalVisibility: false,
            isLoading: true,
            countryVisibility: false,
         

        }

        this.buttonInactive = false
    }

    componentDidMount() {

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                //specialities
                hospitals().then(res => {

                    console.log("RES  : " + JSON.stringify(res))

                    var array = []
                    if (res.status == '1') {
                        array = res.data
                        array.unshift({ "id": 0, "name_en": "Select Hospital" })
                        this.setState({ hospital: array, isLoading: false })
                    } else {
                        this.setState({ isLoading: false })
                    }

                })
                    .catch((err) => this.setState({ isLoading: false }))
            }
            else {
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
                this.setState({ isLoading: false })
            }
        })

        
        this.getUserType();

    }

    getUserType = async () => {
        try {
            const usertype = await AsyncStorage.getItem('USERTYPE')

            if (usertype !== null) {
                // We have data!!
                console.log(" KEY = " + usertype)

               this.setState({userType: usertype})

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


    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ username: text })
            return false;
        }
        else {
            this.setState({ username: text })
            console.log("Email is Correct");
        }
    }

    onRegisterClick() {

        let fname = this.state.firstName
        let lname = this.state.lastName
        let city = this.state.city
        let telephone = this.state.telephone
        let email = this.state.email
        let hospital = this.state.selectedHospital
        let hospitalId = this.state.selectedHospitalId
        let country = this.state.selectedCountry
        let userType = this.state.userType

        if (fname === '' || lname === '' || city === '' || telephone === '' ||
            email === '' || country === '' || country === 'Select Country') {
            Toast.show({ text: 'Please fill all the details', buttonText: 'okay', duration: 3000 })
            return;
        }

        if(userType == "2"){
            if(hospital === ''||hospitalId === 0){
                Toast.show({ text: 'Please fill all the details', buttonText: 'okay', duration: 3000 })
                return;
            }
        }

        if (reg.test(email) === false) {
            Toast.show({
                text: 'Please enter valid email address',
                buttonText: 'okay', duration: 3000
            })
            return;
        }

        this.setState({isLoading:true})


        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                RegisterRequest(fname, lname, hospitalId, city, telephone, email, country, parseInt(userType)).then(response => {
                    console.log("RESPONSE  = = = = " + JSON.stringify(response))
                    if (response.status == '1') {
                        Toast.show({ text: 'Successfully Registered, You have received an email to set password', duration: 5000 })
                        this.setState({ isLoading: false })
                        this.props.navigation.navigate('LoginScreen')
                    } else {
                        this.setState({ isLoading: false })
                        Toast.show({ text: response.message, duration: 3000 })
                    }
                }).catch((error) => this.setState({ isLoading: false }))
            } else {
                this.setState({ isLoading: false })
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })

            }
        })



    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                {this.state.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1,

                    }}
                    source={require('../assets/BackgroundImages/default_backdrop.png')}
                    resizeMode='stretch'>


                    <AppHeader navigation={this.props.navigation} hideMenu={true}/>


                    <ScrollView
                        style={{ flex: 1,  }}
                        keyboardShouldPersistTaps='handled'>

                        <KeyboardAvoidingView
                            keyboardVerticalOffset={Platform.OS == 'ios' ? 40 : 0}
                            behavior='padding'
                            style={{ flex: 1, alignItems: 'center', }}>        

                    <View style={{
                        flexDirection: 'row', marginTop: 20, marginBottom: 20,
                        width: width * .8, justifyContent: 'center', alignSelf: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('LoginScreen')}
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

                        <Text style={{
                            fontSize: 30, color: Colors.textColor,
                            fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', alignSelf: 'center'

                        }}>Signup</Text>
                    </View>


                    <View style={styles.inputs}>

                        <TextInput
                            placeholder={'First Name'}
                            autoCapitalize='sentences'
                            placeholderTextColor={Colors.blackColor}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>

                    <View style={styles.inputs}>

                        <TextInput
                            placeholder={'Last Name'}
                            autoCapitalize='sentences'
                            placeholderTextColor={Colors.blackColor}
                            onChangeText={(lastName) => this.setState({ lastName })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    {this.state.userType == "2" && <TouchableOpacity
                        onPress={() => this.setState({ hospitalVisibility: true })}
                    >

                        <View
                            style={styles.hospitalDropDown}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 18,
                                    paddingTop: 8, paddingBottom: 8,
                                    paddingLeft: 10, paddingRight: 10,
                                    fontFamily: 'BRANDING-THIN',
                                    color: Colors.blackColor,
                                }}>{this.state.selectedHospital}</Text>
                            <Image style={{
                                width: 10, height: 10,
                                margin: 10, position: 'absolute', right: 0, alignSelf: 'center'
                            }}
                                source={require('../assets/Icons/dropdown.png')} />
                            <AndroidPicker data={this.state.hospital} register={true}
                                visibility={this.state.hospitalVisibility}
                                visible={(hospitalVisibility) => this.setState({ hospitalVisibility })}
                                callback={(item) => this.setState({ selectedHospitalId: item.id, selectedHospital: item.name_en, hospitalVisibility: false })}>
                            </AndroidPicker>

                        </View>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={() => this.setState({ countryVisibility: true })}
                    >

                        <View
                            style={styles.hospitalDropDown}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 18,
                                    paddingTop: 8, paddingBottom: 8,
                                    paddingLeft: 10, paddingRight: 10,
                                    fontFamily: 'BRANDING-THIN',
                                    color: Colors.blackColor,
                                }}>{this.state.selectedCountry}</Text>
                            <Image style={{
                                width: 10, height: 10,
                                margin: 10, position: 'absolute', right: 0, alignSelf: 'center'
                            }}
                                source={require('../assets/Icons/dropdown.png')} />
                            <AndroidPicker data={countries}
                                visibility={this.state.countryVisibility}
                                visible={(countryVisibility) => this.setState({ countryVisibility })}
                                callback={(item) => this.setState({ selectedCountry: item, countryVisibility: false })}>
                            </AndroidPicker>

                        </View>
                    </TouchableOpacity>


                    <View style={styles.inputs}>

                        <TextInput
                            placeholder={'City'}
                            autoCapitalize='none'
                            placeholderTextColor={Colors.blackColor}
                            onChangeText={(city) => this.setState({ city })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    <View style={styles.inputs}>

                        <TextInput
                            placeholder={'Email'}
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            placeholderTextColor={Colors.blackColor}
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>



                    <View style={styles.inputs}>

                        <TextInput
                            placeholder={'Telephone'}
                            autoCapitalize='none'
                            placeholderTextColor={Colors.blackColor}
                            keyboardType='numeric'
                            onChangeText={(telephone) => this.setState({ telephone })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>
                    </KeyboardAvoidingView>

                  


                    <TouchableOpacity

                        onPress={this.onRegisterClick.bind(this)}
                        style={styles.registerButton}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'BRANDING-MEDIUM',
                                color: '#ffffff',
                                fontSize: 20
                            }}>{'Submit'}</Text>
                    </TouchableOpacity>


            </ScrollView>     



                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        color:Colors.black,
        fontSize: 18,
        fontFamily: 'BRANDING-THIN',
        width: width * .8,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS == 'ios' ? 8 : 5,
        paddingBottom: Platform.OS == 'ios' ? 8 : 5,

    },

    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        marginTop: 20,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1

    },

    hospitalDropDown: {
        width: width * .8,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 20,
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

    registerButton: {
        width: width * .8,
        marginTop: 50,
        marginBottom:20,
        // paddingRight: 60,
        // paddingLeft: 60,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#4D6578',
        alignSelf: 'center'
    }

});
