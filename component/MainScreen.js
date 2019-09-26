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
            inputname : '',
            fontLoaded: false,
        };
    }
   
    async componentDidMount() {
        
            await Font.loadAsync({
                'DungGeunMo': require('../assets/fonts/DungGeunMo.ttf'),
                'Jalnan':require('../assets/fonts/Jalnan.ttf'),
            });
        this.setState({ fontLoaded: true });
      
    }
 
    
    
    render(){
        console.log("넘어오는 random_flag",this.props.screenProps.random_flag)
        const temp_flag = this.props.screenProps.random_flag
        let param_tag 
        // console.log(this.props.screenProps.normal_mention)
        if(temp_flag===1){
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/50퍼1.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded? 
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.normal_mention[Math.floor(Math.random() * 3)]}</Text>
                    :
                        null
                    }
                   
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                    {/* { this.state.fontLoaded ? 
                            <Text style={{ color:"white", fontSize: 50, fontFamily: 'DungGeunMo', }}> Main Page가 될 예정입니다.</Text>
                    : null
                } */}

                </SafeAreaView>
            </ImageBackground>)
        }else if(temp_flag ===2){
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/50퍼2.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.normal_mention[Math.floor(Math.random() * 3)]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        }else if (temp_flag === 3){
            param_tag =  (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/50퍼3.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.normal_mention[Math.floor(Math.random() * 3)]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag===4){
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/75퍼1.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.good_mention[Math.floor(Math.random() * 3)]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag === 5) {
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/75퍼2.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.good_mention[Math.floor(Math.random() * 3)]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag === 6) {
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/75퍼3.png')} style={styles.image_background}>
                <View style={styles.mention_area}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention}>{this.props.screenProps.userName}{this.props.screenProps.good_mention[Math.floor(Math.random() * 3)]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag === 7) {
            let temp_bad_ele = Math.floor(Math.random() * 3)
            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/25퍼1.png')} style={styles.image_background}>
                <View style={styles.mention_area_one}>
                    {this.state.fontLoaded ?
                            <Text style={styles.random_mention_one}>{this.props.screenProps.bad_mention[temp_bad_ele]}</Text>

                        :
                        null
                    }
                </View>
                <View style={styles.mention_area_two}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention_two}>{this.props.screenProps.bad_mention_two[temp_bad_ele]}</Text>
                        :
                        null
                    }
                </View>
               

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.double_inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.left_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectHateImage()

                            }}>
                            {this.props.screenProps.hateImageUri ?
                                <Image source={{ uri: this.props.screenProps.hateImageUri }} resizeMode='contain' style={styles.right_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag === 8) {
            let temp_bad_ele = Math.floor(Math.random() * 3)

            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/25퍼2.png')} style={styles.image_background}>
                <View style={styles.mention_area_one}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention_one}>{this.props.screenProps.bad_mention[temp_bad_ele]}</Text>

                        :
                        null
                    }
                </View>
                <View style={styles.mention_area_two}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention_two}>{this.props.screenProps.bad_mention_two[temp_bad_ele]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.double_inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.left_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectHateImage()

                            }}>
                            {this.props.screenProps.hateImageUri ?
                                <Image source={{ uri: this.props.screenProps.hateImageUri }} resizeMode='contain' style={styles.right_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>)
        } else if (temp_flag === 9) {
            let temp_bad_ele = Math.floor(Math.random() * 3)

            param_tag = (<ImageBackground resizeMode='contain' source={require('../assets/Mainpage/25퍼3.png')} style={styles.image_background}>
                <View style={styles.mention_area_one}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention_one}>{this.props.screenProps.bad_mention[temp_bad_ele]}</Text>

                        :
                        null
                    }
                </View>
                <View style={styles.mention_area_two}>
                    {this.state.fontLoaded ?
                        <Text style={styles.random_mention_two}>{this.props.screenProps.bad_mention_two[temp_bad_ele]}</Text>
                        :
                        null
                    }
                </View>

                <SafeAreaView style={styles.character_area}>


                    <View style={styles.double_inputimage_area}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectImage()

                            }}>
                            {this.props.screenProps.mainImageUri ?
                                <Image source={{ uri: this.props.screenProps.mainImageUri }} resizeMode='contain' style={styles.left_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.screenProps.selectHateImage()

                            }}>
                            {this.props.screenProps.hateImageUri ?
                                <Image source={{ uri: this.props.screenProps.hateImageUri }} resizeMode='contain' style={styles.right_cropimage_style} /> :
                                <MaterialCommunityIcons name={"account-box-outline"} size={width * 0.25} color="white" />}

                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </ImageBackground>)
        }

    return (
        
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),
        <SafeAreaView style = {styles.mainscreen_background}>
            {this.props.screenProps.hateImageUri && this.props.screenProps.mainImageUri && this.props.screenProps.myusername? 
            (
            <SafeAreaView style = {styles.mainscreen_background_image_container}>
                        {param_tag}
            <SafeAreaView style = {styles.mainpagebottom}>
                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('TodoListScreen')
                            
                                      
                        }}>

                        {this.state.fontLoaded ?
                            <View style = {styles.mainbottomtext_container}>
                                <Text style={styles.mainbottom_lefttext}>> ToDo</Text> 
                                <Text style={styles.mainbottom_righttext}> List♥</Text>
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

                    <AntDesign name="plussquareo" size={width*0.09} color="white" />
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
                        <View style={styles.photopic_middle}>
                           


                                <View style={styles.continue_box}>
                                    {this.state.fontLoaded ?
                    
                                        (<View style={styles.inputname_container}>

                                        <TextInput 
                                            placeholder = {'사용자이름을 입력해주세요'}
                                            value={this.props.screenProps.inputname}
                                            onChangeText={this.props.screenProps.changeNameMethod}
                                            maxLength = {10}
                                            style = {styles.myname_input}/>
                                        <TouchableOpacity
                                            onPress = {()=>{
                                                this.props.screenProps.saveName()
                                            }
                                            }>
                                            <Text style={styles.continue_style}>NEXT</Text>
                                        </TouchableOpacity>
                                        </View>
                                        )
                                        : null
                                    }
                                </View>
                            
                        </View>

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
    },
    mainscreen_background_image_container:{
      flex:1,
    },
 
    image_background:{
        flex:1,
    },
    //캐릭터 부분이 뜨는 공간
    character_area: {
        flex:1,
        alignItems: 'center',
        // borderWidth: 5,
        // borderColor: 'blue',
        justifyContent:'flex-end',

    },
    cropimage_style:{
        // borderWidth:5,
        // borderColor:'blue',
        width: height * 0.2, 
        height: height*0.2, 
        borderRadius: 400 / 2,
    },
    inputimage_area:{
        marginLeft:width*0.02,
        marginBottom:height*0.31,
    },
    double_inputimage_area: {
        marginBottom: height * 0.31,
        flexDirection:'row',
    },
    right_cropimage_style:{
        width: height * 0.2,
        height: height * 0.2,
        borderRadius: 400 / 2,
        marginLeft:width*0.02,
    },
    left_cropimage_style:{
        width: height * 0.2,
        height: height * 0.2,
        borderRadius: 400 / 2,
        marginRight: width * 0.02,

    },
    mainpagebottom:{
        height:height*0.1,
        backgroundColor:"#e85a71",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:width*0.05,
    },
    mainbottomtext_container:{
        flexDirection:'row',
    },
    mainbottom_lefttext:{
        fontSize: width*0.12, 
        fontFamily: 'DungGeunMo', 
        color:'#fff',
    },
    mainbottom_righttext:{
        fontSize: width * 0.12,
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
    photopic_middle:{
        backgroundColor:'#444f59',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    continue_style:{
        color:'white',
        fontFamily: 'DungGeunMo',
        fontSize:width*0.08,
    },
    continue_box:{
        borderColor:'white',
        borderWidth:2,
        padding:width*0.03,
        borderRadius:10,
    },
    photoadd_style:{
        height:height*0.2,
        marginBottom:height*0.05,
    },
    photoaddtext:{
        fontFamily: 'DungGeunMo',
        fontSize:width*0.055,
        color:'white',
    },
    added_photo:{
        height:height*0.2,
        width:width*0.35,
        borderRadius:200,
        marginBottom: height * 0.05,
        paddingHorizontal:height*0.05,
    },
    inputname_container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:width*0.9,
    },
    myname_input:{
        color:'white',
        fontFamily: 'DungGeunMo',
        fontSize: width*0.05,
        width:width*0.6,
        marginLeft: width*0.03
    },

    ///////////////////////대사 부분
    random_mention:{
        color:'#444f59',
        fontSize:width*0.06,
        fontFamily:'Jalnan',
        lineHeight: height * 0.04,
        letterSpacing:width*0.02,
    },
    mention_area:{
        // borderWidth:10,
        // borderColor:'black',
        marginTop:height*0.14,
        width: width*0.55,
        marginLeft:width*0.225,
        alignItems:'center'
    },
    random_mention_one: {
        color: '#444f59',
        fontSize: width * 0.04,
        fontFamily: 'Jalnan',
        lineHeight: height * 0.04,
        letterSpacing: width * 0.02,
    },
    random_mention_two:{
        color: '#444f59',
        fontSize: width * 0.05,
        fontFamily: 'Jalnan',
        lineHeight: height * 0.04,
        letterSpacing: width * 0.02,
    },
    mention_area_one:{

        marginTop: height * 0.14,
        width: width * 0.7,
        marginLeft: width * 0.17,
        alignItems: 'center',
        height: height*0.04,
    },
    mention_area_two:{
  
        marginTop: height *0.11,
        width: width * 0.5,
        height: height * 0.04,
        marginLeft: width * 0.40,
        alignItems: 'center'
    },

});
