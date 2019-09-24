import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TextInput, FlatList, TouchableOpacity,Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';


export default class MainScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fontLoaded: false,
        };
    }
   
    async componentDidMount() {
        
            await Font.loadAsync({
                'DungGeunMo': require('../assets/fonts/DungGeunMo.ttf'),
            });
        this.setState({ fontLoaded: true });
      
    }


    render(){
    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),
        <SafeAreaView style = {styles.mainscreen_background}>
            

            <SafeAreaView style={styles.character_area}>
                <ImageBackground source={require('../assets/Mainpage/MainPage그림.png')} style={{ width: '100%', height: '100%' }}>

                <TouchableOpacity
                    onPress = {() => {
                        this.props.screenProps.selectImage()
                    }}>
                    { this.props.screenProps.mainImageUri ? 
                        <Image source={{ uri: this.props.screenProps.mainImageUri }} style={{ width: 100, height: 100,borderRadius: 400/2 }}/> : 
                        <MaterialCommunityIcons name={"account-box-outline"} size={100} color="white" />}
                   
                </TouchableOpacity>
               { this.state.fontLoaded ? 
                        <Text style={{ color:"white", fontSize: 50, fontFamily: 'DungGeunMo', }}> Main Page가 될 예정입니다.</Text>
                 : null
               }
               
                </ImageBackground>

            </SafeAreaView>

            <SafeAreaView style = {styles.mainpagebottom}>
                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.screenProps.addMethod
                            this.props.navigation.navigate('TodoListScreen')
                        }}>

                        {this.state.fontLoaded ?
                            <Text color="black" style={{ fontSize: 50, fontFamily: 'DungGeunMo', }}>ToDo List보러가기.</Text>
                            : null
                        }                
                    </TouchableOpacity>
                </SafeAreaView>

                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.screenProps.addMethod
                            this.props.navigation.navigate('AddScreen')
                        }}>

                    <MaterialCommunityIcons name="plus-circle" size={50} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView> 
            

        </SafeAreaView>
    )

}
}






const styles = StyleSheet.create({
    mainscreen_background:{
        flex:1,
        // borderWidth:10,
        // borderColor:'skyblue',
    },
    //캐릭터 부분이 뜨는 공간
    character_area: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',

        // borderWidth: 5,
        // borderColor: 'blue',

    },
    mainpagebottom:{
        backgroundColor:"skyblue",
        borderRadius: 20,
        flexDirection: 'row',
    }



});
