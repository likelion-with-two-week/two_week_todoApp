import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TextInput, FlatList, TouchableOpacity,Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
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
            
            <ImageBackground source={require('../assets/Mainpage/MainPage그림.png')} style={styles.image_background}>

                <SafeAreaView style={styles.character_area}>

                    <TouchableOpacity
                        onPress = {() => {
                            this.props.screenProps.selectImage()
                        }}>
                        { this.props.screenProps.mainImageUri ? 
                            <Image source={{ uri: this.props.screenProps.mainImageUri }} style={styles.cropimage_style}/> : 
                            <MaterialCommunityIcons name={"account-box-outline"} size={100} color="white" />}
                    
                    </TouchableOpacity>
                {/* { this.state.fontLoaded ? 
                            <Text style={{ color:"white", fontSize: 50, fontFamily: 'DungGeunMo', }}> Main Page가 될 예정입니다.</Text>
                    : null
                } */}

                </SafeAreaView>
            </ImageBackground>
            <SafeAreaView style = {styles.mainpagebottom}>
                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.screenProps.addMethod
                            this.props.navigation.navigate('TodoListScreen')
                        }}>

                        {this.state.fontLoaded ?
                            <View style = {styles.mainbottomtext_container}>
                                <Text style={styles.mainbottom_lefttext}>> ToDo</Text> 
                                <Text style={styles.mainbottom_righttext}> List</Text>
                            </View>
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

                    <AntDesign name="plussquareo" size={35} color="white" />
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
    image_background:{
        flex:1,
    },
    //캐릭터 부분이 뜨는 공간
    character_area: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 5,
        // borderColor: 'blue',
    },
    cropimage_style:{
        width: 180, 
        height: 180, 
        borderRadius: 400 / 2,
        marginTop:160,
        marginLeft:10,
    },
    mainpagebottom:{
        height:70,
        backgroundColor:"#454552",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
    },
    mainbottomtext_container:{
        flexDirection:'row',
    },
    mainbottom_lefttext:{
        fontSize: 50, 
        fontFamily: 'DungGeunMo', 
        color:'#e85a71',
    },
    mainbottom_righttext:{
        fontSize: 50,
        fontFamily: 'DungGeunMo', 
        color:'white',
    }

});
