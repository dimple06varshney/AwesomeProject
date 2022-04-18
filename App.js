/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
const App = () => {
const countries = ['Select your country','India','Australia','Japan','Nepal']
const [name, setName] = useState("")
const [contact, setContact] = useState("")
const [country, setCountry] = useState("Select Country")
const [gender, setGender] = useState("male")
const handleSubmit = ()=>{
  if(name==="" || contact===""|| country==="Select your country" || gender==="") {
    Alert.alert('Error', 'Please fill all details')
  }
  else{
  const data = {name,contact, country,gender}
  console.log(data);
  axios.post(`https://users-details-app.herokuapp.com/users`,data)
  .then((res)=> console.log(res,36)).then(Alert.alert('Success', 'Successfully registered'))
  }
 
}

var radio_props = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'not to disclose', value:'not to disclose'}
];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create your Account</Text>
      <TextInput placeholder="Enter your name" keyboardType='ascii-capable'  style={styles.input} value={name} onChangeText={setName}/>
      <TextInput  placeholder= "Enter Contact Number" keyboardType="numeric"  style={styles.input} value={contact} onChangeText={setContact}/>
      <View style={styles.buttonContainer}>     
     <SelectDropdown data={countries} defaultValueByIndex= {0} buttonStyle={styles.select}
	  onSelect={(selectedItem, index) => {
    setCountry(selectedItem)
	}}
  /> 
  <RadioForm
  radio_props={radio_props}
  initial={'male'}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  onPress={(value) => {setGender(value)
  console.log(gender);
  }}
/>

  <Pressable style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.text}>Submit</Text>
        </Pressable> 
    </View>
    </SafeAreaView>   
  );
};

const styles = StyleSheet.create({  
  container:{
    margin: 12,
  },
  header:{
    width:'100%',
    margin:'auto',
    textAlign:'center',
    backgroundColor:'lightpink',
    fontSize: 20,
    padding:10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn:{
    backgroundColor:'#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  select: {
   width: '100%',
   margin: 'auto',
   textAlign:'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
