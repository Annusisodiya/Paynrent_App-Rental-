import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Modal,
    TextInput,
    Alert,
    Image
} from 'react-native';
import { postData } from '../Services/FetchNodeServices';
import Input from '../UiComponents/Common/Input';
import AppButton from '../UiComponents/Common/Button';
import { storeData } from '../Storage/AsyncStorage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const { width, height } = Dimensions.get('window')

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({ mobileEmail: '', enteredOtp: '' })
    const [error, setError] = useState({})
    const validate = () => {
        var isValid = true

        if (!inputs.mobileEmail) {
            handleErrors("Pls Enter your Mobile Number", "mobileEmail")
            isValid = false
        }
        return isValid
    }

    const [userDetails, setUserDetails] = useState([])
    const [generatedOtp, setGeneratedOtp] = useState("")
    const [enteredOtp, setEnteredOtp] = useState("")

    const checkUser = async (mobileNumber) => {
        var response = await postData("user/checkuser", { mobileno: mobileNumber });
        setUserDetails(response)
    }

    const handleOtpClick = async () => {
        if (validate()) {
            if (inputs.mobileEmail.length === 10) {
                checkUser(inputs.mobileEmail)

                let otp = parseInt(Math.random() * 899999) + 100000
                setGeneratedOtp(otp)
                console.warn(otp)
                setModalVisible(true)
            }
            else {
                alert("Mobile Number shouls be of 10 Digits")
            }
        }
        else {
            alert("Please Enter your Mobile Number to Continue...")
        }
    }

    const handleLoginClick = async () => {
        let tempOtp = await parseInt(enteredOtp)

        if (generatedOtp === tempOtp) {
            //console.log(userDetails)
            setModalVisible(false)

            if (userDetails.status) {
                var result = await postData('user/checkuser', { mobileno: inputs.mobileEmail })

                if (result.status) {
                    storeData('UserData', result.data)
                    navigation.navigate("Home")

                    Alert.alert('Success', 'Logged In Successfully...');
                }
                else {
                    alert("Error")
                }
            }
            else {
                alert("You are not registered, Sign Up to Continue...")
                navigation.navigate("Register")
            }
        }
        else {
            alert("Invalid Otp!")
        }
    }
    const handleValues = (txt, attr) => {
        setInputs(prevStates => ({ ...prevStates, [attr]: txt }))
    }
    const handleErrors = (txt, attr) => {
        setError(prevStates => ({ ...prevStates, [attr]: txt }))
    }

    const [modalVisible, setModalVisible] = useState(false);

    function otpModal() {
        return (
            <>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('City Selected!');
                            setModalVisible(!modalVisible);
                        }} >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <Text style={{ fontSize: 24, fontWeight: 500, color: "#000", }}>
                                    Enter Otp to Continue...
                                </Text>

                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                                    <View style={styles.otpContainer}>
                                        <Icon name={'cellphone-key'} style={{ fontSize: 22, color: "#000", marginRight: 4, }} />
                                        <TextInput
                                            style={{ fontSize: 16, color: "#000" }}
                                            placeholder={'Enter Otp'}
                                            keyboardType={'number-pad'}
                                            placeholderTextColor="#000"
                                            maxLength={6} onChangeText={(txt) => setEnteredOtp(txt)}
                                            value={enteredOtp}
                                        />
                                    </View>

                                    <AppButton onPress={handleLoginClick} btnWidth={0.54} buttonText={'Sign In'} bgColor='#2980b9' borderRadius={24} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        )
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={{ marginLeft: width * 0.21 }}>
                    <Image
                        style={{ width: 164, height: 72, resizeMode: 'contain' }}
                        source={require('../Assets/Rentals1.png')}
                    />
                </View>
                <Text style={styles.loginTxt}>
                    Login
                </Text>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Input iconName="phone" placeholder="Mobile Number" keyboardType="numeric" error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />

                    <AppButton onPress={handleOtpClick} btnWidth={0.78} buttonText={'Get Otp'} bgColor='#2980b9' borderRadius={24} />
                </View>
            </View>
            {otpModal()}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 24,
        height: height * 0.32,
        width: width * 0.84,
        borderRadius: 16,
        marginTop: '32%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#f2f2f2',
        opacity: modalVisible ? 0.1 : 1,
    },

    loginTxt: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        marginBottom: 4,
    },

    centeredView: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },

    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: height * 0.36,
        width: width * 0.72,
    },

    otpContainer: {
        width: width * 0.48,
        backgroundColor: '#fff',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#3498db',
        padding: 10,
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        marginLeft: 12,
    },
});

export default Login;
