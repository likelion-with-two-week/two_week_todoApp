import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TextInput, FlatList, TouchableOpacity,Image,Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import TodoItem from './TodoItem'
const { height, width } = Dimensions.get('window')

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
            {this.props.screenProps.hateImageUri && this.props.screenProps.mainImageUri? 
            (
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
            
            : (
                // console.log("여긴 거쳐가냐"),
            
            <View style ={styles.mainscreen_background}>

                <SafeAreaView style={styles.firstpic_like}>

                    <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()
                            }}>
                        {this.props.screenProps.mainImageUri?
                            
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.added_photo}></Image>

                        :
                        <Image resizeMode="contain" source={require('../assets/Mainpage/photoadd.png')} style={styles.photoadd_style}></Image>
                        }
                    </TouchableOpacity>

                        {this.state.fontLoaded ?
                            <Text style={styles.photoaddtext}>여러분이 가장 좋아하는 사람의 사진</Text>
                            : null
                        }

                </SafeAreaView>

                <SafeAreaView style={styles.firstpic_hate}>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectHateImage()
                            }}>
                            {this.props.screenProps.hateImageUri ?

                                <Image source={{ uri: this.props.screenProps.hateImageUri }} resizeMode='contain' style={styles.added_photo} ></Image>

                                :
                                <Image resizeMode="contain" source={require('../assets/Mainpage/photoadd.png')} style={styles.photoadd_style}></Image>
                            }                        
                        </TouchableOpacity>

                        {this.state.fontLoaded ?
                            <Text style ={styles.photoaddtext}>여러분이 피하고 싶은 것</Text>
                            : null
                        }

                </SafeAreaView>
                <View style={styles.photopic_bottom}>
                    <TouchableOpacity 
                    onPress ={()=>{
                    }
                    }>
                        <View style = {styles.continue_box}>
                            {this.state.fontLoaded? 
                                <Text style={styles.continue_style}>계속하기 ></Text>
                                : null
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            )
            
            }

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
    },

    firstpic_like:{
        backgroundColor:'#e85a71',
        flex:4,
        justifyContent:'center',
        alignItems: 'center',

    },
    firstpic_hate:{
        backgroundColor: '#4ea1d3',
        flex: 4,
        justifyContent:'center',
        alignItems:'center',
    },
    photopic_bottom:{
        backgroundColor:'#454552',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    continue_style:{
        color:'white',
        fontFamily: 'DungGeunMo',
        fontSize:30,
    },
    continue_box:{
        borderColor:'white',
        borderWidth:2,
        padding:10,
        borderRadius:10,
    },
    photoadd_style:{
        height:height*0.2,
        marginBottom:height*0.05,
    },
    photoaddtext:{
        fontFamily: 'DungGeunMo',
        fontSize:22,
        color:'white'
    },
    added_photo:{
        height:height*0.2,
        width:width*0.35,
        borderRadius:200,
        marginBottom: height * 0.05,

    },
    //#e85a71 
    //#4ea1d3 
});
