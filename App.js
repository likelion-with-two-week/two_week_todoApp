import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity,View, Image,ScrollView, StatusBar,Alert } from 'react-native';
import { MaterialIcons ,MaterialCommunityIcons} from '@expo/vector-icons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import * as ImagePicker from 'expo-image-picker';

import TodoItem from './component/TodoItem';
import AddTodo from './component/AddTodo';
import MainScreen from './component/MainScreen';
import TodoListScreen from './component/TodoListScreen';
import Todocomplete from './component/Todocomplete';
import { SplashScreen } from 'expo';
import { AsyncStorage } from 'react-native';

// const MainBottomNavi = createBottomTabNavigator(
//   {
//     TodoList: {
//       screen: TodoListScreen,
//     navigationOptions : {
//         tabBarIcon: ({ tintColor }) => (
//           <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }} />
//         )
//       }
//   },
//   },
//   {
//     tabBarOptions: {
//       showLabel: false
//     },
//   }
//   )


const AddNavi = createStackNavigator(
  {
    // Todo:{
    //   screen: MainBottomNavi
    // },
    MainScreen: {
      screen: MainScreen
    },
    AddScreen: {
      screen: AddTodo
    },
    TodoListScreen:{
      screen : TodoListScreen
    }, 
    Todocomplete:{
      screen: Todocomplete
    },

  },
   

  {
    headerMode: 'none',
    initialRouteName: 'MainScreen', 
  }
)

const MainNavi = createAppContainer(AddNavi)


export default class App extends React.Component {

  _storeData = async () => {
    await AsyncStorage.setItem('@todolove:state', JSON.stringify(this.state))
  }

  _getData = async () => {
    const mystate = await AsyncStorage.getItem("@todolove:state")
    if (mystate !== null) {
      this.setState(JSON.parse(mystate))
      // console.log(mystate)
    }
  }
//클리어도 하나 넣어주자 .clear()

  async componentDidMount() {
    await this._getData()
    this._checkScore()
    // this._checkTime()
    console.log("*********************************************************************************")
    setInterval(this._overTimer,20000)
  }


  constructor(props){
    super(props)
    this.state={
      random_flag : 0,
      ////아래 Reacy는 splash때문에 넣어준거임
      inputname :'',
      username :'',
      MainScore : 50,  //Todo List의 check를 해서 score를 누적시켜서 우리가 하고자하는 사진과의 crop을 설정한다

      imageUri:'',  //우리가 main 얼굴로 넣을 image를 선정한다

      inputTodo : '',
      todos:[
       
      ],
      success_todos:[

      ],

      hate_imageUri:'',
      normal_mention:[
        '씨 반가워요! 우리 같은 팀이죠? 잘 부탁해요. 오늘 할 일은 뭔가요?',
        '씨 오늘 할 일 하셨어요?? 모두 완료하시려면 서둘러야겠어요!',
        '씨 오늘 할 일은 더 없는 거예요? 수고 많으셨어요!!',
      ],
      good_mention:[
        '! 오늘도 좋은 하루야, 오늘 할 일 나랑 같이할래?',
        '! 오늘 할 일 빨리하고 내 거 좀 도와주라♡ 응???',
        '! 오늘 할 일 빨리 끝내고 나랑 놀러 가자~',
      ],
      bad_mention:[
        ' 오늘부터 같이 일하게 된 제 친구예요', '너 진짜 성실하다~?                    ', '남은 할 일 좀 빨리해주세요         ',
      ],
      bad_mention_two:[
        '아.. 안녕하세요...?', '에이 뭐 이런걸가지고', '우리 빨리 가야 한단 말이에요!',
      ],
    
    }
  }

  //input창 내에 Text가 체인지 되는것을 실시간으로 반영해주기 위한 부분
  _changeText = (value) => {
    this.setState({ inputTodo:value})
    // console.log(value)
  }

  //입력된 Todo의 값을 State에 반영
  _saveTodo = () =>{
    const prevTodo = [...this.state.todos]
    // console.log(prevTodo.length) // 이때 0 1 2 가 뜨는것은 PrevTodoList이기때문에 0개부터 시작해서 012 가 뜨는 것이다.
    if (prevTodo.length <= 2){
        if (this.state.inputTodo !== '') {
          const tempdate = new Date()
          // console.log(tempdate.getHours())
          // console.log(tempdate.getMinutes())
          // console.log(tempdate)
          // console.log(tempdate.getTime())
          const newTodo = { title: this.state.inputTodo, iscomplete: false, deadline: tempdate.getTime(), start_hour:tempdate.getHours(), start_minutes : tempdate.getMinutes()}
          this.setState({
            inputTodo: '',
            todos: prevTodo.concat(newTodo)
          }, this._storeData)
        }
        else {
          alert('내용을 입력해주세요!')
        }
    }
    else{
      alert("TODOlist는 3개까지만 등록가능합니다!")
      this.setState({
        inputTodo: '',
      })
    }
   
  }
  _checkScore= () =>{
    if (this.state.MainScore >=75){
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 4 },this._storeData)   // 75 이상은 4 5 6
    }
    else if(this.state.MainScore >= 26){
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 1 }, this._storeData)   // 75~25은 1,2,3
    }
    else{
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 7 }, this._storeData)   // 25이하는 7 8 9
    }
  }
  _overTimer = () =>{
    const overchecktime = new Date()
    let plus_score =0 
    let minus_score = 0 
    let success_item = 0
    let fail_item = 0
    let next_flag = false
    let update_todos = [...this.state.todos]
    
    for (const i of this.state.todos) {
      if (i.deadline + 20000 <= overchecktime.getTime()  ){
        if (i.iscomplete === true) {
          console.log("얘는 성공한 애입니다", i)
          delete_success_index = update_todos.findIndex((element)=>{ return element.deadline === i.deadline})
          plus_score = plus_score + 2
          success_item = success_item + 1
          update_todos.splice(delete_success_index,1)

        }
        else { //86400000이 하루 기준 초
          console.log("얘는 실패한 애입니다", i.title)
          console.log(update_todos, "index찾아오는 todolist입니다")
          delete_fail_index = update_todos.findIndex((element) => { return element.deadline === i.deadline })
          console.log("그래서 실패한 애의 index를 찾고있습니다", delete_fail_index)
          minus_score = minus_score +2
          fail_item = fail_item +1
          update_todos.splice(delete_fail_index, 1)
          console.log(update_todos,"@@@@@@@@@@@@얘는 사삭제하고 난 뒤에 @@@@@@@@@@@@@@@")
        }
        next_flag = true
      }
      
    }
    if (next_flag){
      alert("성공한 " + (success_item).toString() + "개의 Todo," + "실패한 " + (fail_item).toString() + "개의 Todo 가 삭제되었습니다."
        + " 호감도 " + (plus_score - minus_score).toString() + " 가 증가(감소)하였습니다.")
      this.setState({ todos: update_todos, MainScore: this.state.MainScore - minus_score }, this._storeData)
      this._checkScore()
    }
  }
  //TodoList를 만들어주는 method 주 용도는 TodoItem component에 넘겨주기 위함이다
  _makeTodoList = ({index,item}) =>{
    return(
      // console.log(item),
      // console.log(index),
    // console.log("maketodoList method내부 확인" , item.title),
    <TodoItem 
      name={item.title}
      starthour={item.start_hour}
      startminutes = {item.start_minutes}
      isComplete = {item.iscomplete}
      changeComplete={()=>{
        const nowtime = new Date()

        const reverseTodo = [...this.state.todos]
        const prevSuccess = [...this.state.success_todos]
        if ((nowtime.getTime() - item.deadline) <= 10000) { //24시간을 환산하면 86400000
          
          reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete
          
          alert("축하합니다! 호감도 +2  (리스트는 등록후 24시간 뒤에 자동 삭제됩니다) ");
          // Alert.alert(
          //   '오늘의 ToDo를 했나요?',
          //   '',

          //   [{ text: '', onPress: () => console.log('Ask me later pressed') },

          //     {
          //       text: '못했어요',
          //       onPress: () => console.log('Cancel Pressed'),
          //       style: 'cancel',
          //     },
          //     {
          //       text: '했어요!', onPress: () => {
          //         reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete

          //         this.setState({ success_todos: prevSuccess.concat(reverseTodo[index]), MainScore: this.state.MainScore + 3 }, this._storeData) //성공리스트 넘기고, 호감도 +3
          //         reverseTodo.splice(index, 1)} 
          //     },
              
          //   ],
          //   { cancelable: false },
          // );
          this.setState({ success_todos: prevSuccess.concat(reverseTodo[index]), MainScore: this.state.MainScore + 2 }, this._storeData) //성공리스트 넘기고, 호감도 +3
          //순간 체크하는거
          // reverseTodo.splice(index, 1)

          // 
          this._checkScore()
        } else { 

          alert("24시간이 지나 실패했습니다! 호감도 -2")
          this.setState({ MainScore: this.state.MainScore - 2 }, this._storeData) 
          reverseTodo.splice(index, 1);
          this._checkScore()

        }

        this.setState({ todos: reverseTodo }, this._storeData)
        // console.log(this.state.MainScore)
      }}
      deleteItem={()=>{
        const deleteTodo = [...this.state.todos]
        deleteTodo.splice(index,1)
        this.setState({ todos: deleteTodo }, this._storeData)
      }}
    />
    )
  }
////////////////////////////////////////
//그런데 좀더 본질적으로 이러한 과정이 꼭 필요한 과정인지 그냥 들어왓을때 삭제가 되는것보다 추가시에 문제가 되지 않을지 생각해보자
////////////////////////////////////////

  // _checkTime = () =>{
  //   const checktime = new Date()
  //   console.log("checktime")
  //   const timecheck = [...this.state.todos]
  //   const tempScore = this.state.MainScore
  //   for(const i of this.state.todos){
  //     if (checktime.getTime() - i.deadline < 86400000){
  //     //  console.log(i) 
  //     console.log("in if floop")
  //       deleteIndex = timecheck.findIndex((item) => { return item.deadline === i.deadline })
  //       console.log(deleteIndex)

  //       timecheck.splice(deleteIndex, 1)
  //       alert("24시간 초과로 Todo < " + (i.title).toString()  +  " > 를 실패했습니다")
  //       tempScore = tempScore - 3
  //       this.setState({todos : timecheck , MainScore : tempScore})
  //       console.log(this.state.MainScore)
  //       console.log(this.state.todos)
  //     }
  //   }
  // }
  //이부분에 아이콘을 누르면 method가 실행되게 하는데 해당 emthod는 우리의 TodoItem으로 method를 전달해주는 역할을 하는 애가 되면 될것 같다



  //image첨부 함수
  _selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri }, this._storeData);
    }
  };
  _hateselectImage = async () => {

    let result2 = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result2.cancelled) {
      this.setState({ hate_imageUri: result2.uri }, this._storeData);
    }
  };
  _changename = (value) =>{
    this.setState({inputname:value})
  }
  _saveName = () =>{
    if (this.state.inputname !== ''){
      this.setState({username : this.state.inputname},this._storeData)
    }else{
      alert('빈칸없이 입력해주세요!')
    }
    if (this.state.imageUri ==="" || this.state.hate_imageUri === ""){
      alert('빈값없이 입력해주세요!')
    }
  }
  render(){
    /////////this.state.isReady) {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <Image
    //         source={require('./assets/splash2.gif')}
    //         onLoad={this._cacheResourcesAsync}
    //       />
    //     </View>
    //   );
    // }
    /////////////////////////////
    // console.log("state가 가진 todo check" , this.state.todos)
    // console.log(this.state.MainScore)
    console.log(this.state.MainScore)
    return (

      <SafeAreaView style = {styles.main_background}>
        <StatusBar hidden={true} backgroundColor="blue" barStyle="light-content" />

        <MainNavi
          screenProps={{
            listData: this.state.todos,
            renderMethod: this._makeTodoList,
            addMethod: this._addMethod,
            displayvalue: this.state.inputTodo ,
            changemethod: this._changeText ,
            savemethod: this._saveTodo ,
            selectImage : this._selectImage,
            mainImageUri : this.state.imageUri,
            hateImageUri : this.state.hate_imageUri,
            selectHateImage: this._hateselectImage,
            myusername : this.state.username,
            changeNameMethod: this._changename,
            inputname : this.state.inputname,
            saveName : this._saveName,
            userName: this.state.username,
            normal_mention: this.state.normal_mention,
            bad_mention : this.state.bad_mention,
            bad_mention_two: this.state.bad_mention_two,
            good_mention : this.state.good_mention,
            Main_score : this.state.MainScore,
            random_flag: this.state.random_flag,
        
          }}
            />
      </SafeAreaView>
    );
  }
/////////////////////loading창 코드구분//////////
  // _cacheSplashResourcesAsync = async () => {
  //   const gif = require('./assets/splash2.gif');
  //   return Asset.fromModule(gif).downloadAsync();
  // };

  // _cacheResourcesAsync = async () => {
  //   SplashScreen.hide();
 

  //   this.setState({ isReady: true });
  // };
  
}
/////////////////////////////////////////
const styles = StyleSheet.create({
  //Main 화면의 background작업을 하기위한
  main_background:{
    flex:1,
  },
 
  //캐릭터 부분이 뜨는 공간
  // character_area: {
  //   flex: 3,
  //   backgroundColor: '#fff',
  //   alignItems:'center',
  //   justifyContent:'center',

  //   borderWidth:5,
  //   borderColor: 'blue',

  // },

  // //Todo설정과 관련한 부분이 뜨는 부분
  // todo_area: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   borderWidth: 5,
  //   borderColor:'red',
  // },
  // //Todo 지역 내의 Todo List가 랜더링 되는 부분을 구분하는 box
  // todo_list_box:{
  //   borderWidth:3,
  //   borderColor:'green',
  //   marginBottom:5,
  //   flex:3,
  // },


  //Todo 지역 내의 add 관련 기능을 담당하고 있음

  // todo_add_box: {
  //   borderWidth: 3,
  //   borderColor: 'purple',
  //   flexDirection: 'row',
  //   flex:1,
  //   justifyContent:'space-between',
  // },
  // //직접적으로  Text 입력창의 스타일
  // todo_inputBox:{
  //   borderBottomWidth:1,
  //   width:200,
  // },


});
