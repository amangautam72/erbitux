import { Toast } from 'native-base'


const SERVER_ADDRESS = "https://erbituxapi.mdcyt.com/"
//const SERVER_ADDRESS = "http://192.168.1.151:8081/"

export const loginRequest = (username,password) => {
    var params = {
        email: username,
        password: password,
        // device_type:'ios'
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS == " + JSON.stringify(formBody))

    return fetch(SERVER_ADDRESS+"applogin", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}


export const RegisterRequest = (fname,lname,hospitalId,city, telephone,email,country,usertype) => {
    var params = {
        fname: fname,
        lname: lname,
        country: country,
        email: email,
        city: city,
        hospital: hospitalId,
        mobile: telephone,
        usertype: usertype,
        device_type: 'ios'
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS == " + JSON.stringify(formBody))

    return fetch(SERVER_ADDRESS+"register", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const fetchData = (auth,slugName,language) => {
    var params = {
        auth: auth,
        slug_name: slugName,
        language:language
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS == " + JSON.stringify(formBody))

    return fetch(SERVER_ADDRESS+"apislugdata", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const fetchData2 = (auth,id,language) => {
    var params = {
        auth: auth,
        id: id,
        language:language
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS == " + JSON.stringify(formBody))

    return fetch(SERVER_ADDRESS+"appslugdataid", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}




export const calculator = (authKey,userid,age,gender,height,weight,ft_level,suspected) => {

    let params = {
        user_id: parseInt(userid),
        login_token: authKey,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        ft_level: ft_level,
        suspected: suspected
    }

    var formData = new FormData();
    
    for (var k in params) {
        formData.append(k, params[k]);
    }
    console.log("PARAMS == " + JSON.stringify(formData))


    return fetch(SERVER_ADDRESS+"calculator", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
        body: formData
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}


export const callApi = (url, authKey, caseId) => {


    let params = {}
    if(caseId !=null){
        params = {
            login_token: authKey,
            caseid: caseId
        }
    }else{
        params = {
            login_token: authKey,
        }
    }
    

    var formData = new FormData();
    
    for (var k in params) {
        formData.append(k, params[k]);
    }
    console.log("PARAMS == " + JSON.stringify(formData))

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
          },
        // body: JSON.stringify({
        //     login_token: authKey,
        //   }),
        body: formData  
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error("ERROR ===  = "+error);
        });
}

export const forgotPassword = (email) => {

    var params = {
        email: email,
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS == " + JSON.stringify(formBody))


    return fetch(SERVER_ADDRESS+'forgot', {
        method: "POST",
        headers: {
            //Accept: 'application/json',
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        // body: JSON.stringify({
        //     email: email,
        //   }),
        body: formBody
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error("ERROR ===  = "+error);
        });
}

export const hospitals = () => {

    return fetch(SERVER_ADDRESS+'hospital', {
        method: "GET",
        // headers: {
        //     Accept: 'application/json',
        //     //'Content-Type': 'application/json',
        //     // 'Content-Type': 'multipart/form-data'
        //   },
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error("ERROR ===  = "+error);
        });
}


export const calDisclaimer = (url, authKey) => {

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
          },
        body: JSON.stringify({
            login_token: authKey,
          }),
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error("ERROR ===  = "+error);
        });
}

export const appDisclaimer = (url) => {

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
          },
        // body: JSON.stringify({
        //     login_token: authKey,
        //   }),
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error("ERROR ===  = "+error);
        });
}


