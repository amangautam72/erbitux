import LocalizedStrings from 'react-native-localization'

let strings = new LocalizedStrings({
  "en": {
    welcome: "Welcome!",
    welcomeDes: "Are you a \n healthcare physician? ",
    yes: 'yes',
    no: "no",
    selectLanguage: 'Select Language',
    language: 'ENGLISH',
    crc: 'CRC',
    headneck: 'Head & Neck \n Cancer',
    dosageCalculator: "Dosage Calculator",
    understandDisease: 'Understanding the Disease',
    sideEManagement: "Side Effect Management",
    precaution: "Precautions for Erbitux",
    medUpdate: 'Medical Updates'
   
  },
  "ar": {
    welcome: 'أهلا بك!',
    welcomeDes: "मैं ठीक हूँ ?",
    yes: "نعم فعلا",
    no: "لا",
    selectLanguage: 'اختار اللغة',
    language: 'عربى',
    crc: 'ARABCRC',
    headneck: 'Arab Head & Neck \n Cancer',
    dosageCalculator: "Arab Dosage Calculator",
    understandDisease: 'Understanding the Disease AR',
    sideEManagement: "Arab Side Effect Management",
    precaution: "Arab Precautions for Erbitux",
    medUpdate: 'Arab Medical Updates'
  },
  
})


export default strings