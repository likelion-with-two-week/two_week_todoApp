import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity,View, Image,ScrollView, StatusBar } from 'react-native';
import { MaterialIcons ,MaterialCommunityIcons} from '@expo/vector-icons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import * as ImagePicker from 'expo-image-picker';

import TodoItem from './component/TodoItem';
import AddTodo from './component/AddTodo';
import MainScreen from './component/MainScreen';
import TodoListScreen from './component/TodoListScreen';


import { SplashScreen } from 'expo';

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
  },
  {
    headerMode: 'none',

    initialRouteName: 'MainScreen', 
  }
)

const MainNavi = createAppContainer(AddNavi)


export default class App extends React.Component {


/////////이것도 스플래쉬때문에 넣어준거

  componentDidMount() {
    SplashScreen.preventAutoHide();
    this._checkTime()
  }




  constructor(props){
    super(props)
    this.state={
      ////아래 Reacy는 splash때문에 넣어준거임
      isReady: false,

      MainScore : 50,  //Todo List의 check를 해서 score를 누적시켜서 우리가 하고자하는 사진과의 crop을 설정한다

      imageUri:'',  //우리가 main 얼굴로 넣을 image를 선정한다

      inputTodo : '',
      todos:[
        {title : 'haha'},
      ],
      success_todos:[

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
    console.log(prevTodo.length) // 이때 0 1 2 가 뜨는것은 PrevTodoList이기때문에 0개부터 시작해서 012 가 뜨는 것이다.
    if (prevTodo.length <= 2){
        if (this.state.inputTodo !== '') {
          const tempdate = new Date()
          // console.log(tempdate)
          // console.log(tempdate.getTime())
          const newTodo = { title: this.state.inputTodo, iscomplete: false, deadline: tempdate.getTime()}
          this.setState({
            inputTodo: '',
            todos: prevTodo.concat(newTodo)
          })
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

  //TodoList를 만들어주는 method 주 용도는 TodoItem component에 넘겨주기 위함이다
  _makeTodoList = ({index,item}) =>{
    return(
      // console.log(index),
    // console.log("maketodoList method내부 확인" , item.title),
    <TodoItem 
      name={item.title}
      isComplete = {item.iscomplete}
      changeComplete={()=>{
        const nowtime = new Date()

        const reverseTodo = [...this.state.todos]
        const prevSuccess = [...this.state.success_todos]
        if ((nowtime.getTime() - item.deadline ) <= 86400000) { //24시간을 환산하면 86400000
          
          reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete
          
          alert("오늘의 ToDo를 완료했습니다");
          this.setState({ success_todos: prevSuccess.concat(reverseTodo[index]), MainScore: this.state.MainScore + 3 }) //성공리스트 넘기고, 호감도 +3
          reverseTodo.splice(index, 1)

        } else { 

          alert("24시간이 지나 실패했습니다")
          this.setState({ MainScore: this.state.MainScore - 3 }) 
          reverseTodo.splice(index, 1);
        }

        this.setState({ todos: reverseTodo })
        // console.log(this.state.MainScore)
      }}
      deleteItem={()=>{
        const deleteTodo = [...this.state.todos]
        deleteTodo.splice(index,1)
        this.setState({todos:deleteTodo})
      }}
    />
    )
  }

  _checkTime = () =>{
    const checktime = new Date()
    for(const i of this.state.todos){
      console.log(i)
      console.log()
    }
  }
  //이부분에 아이콘을 누르면 method가 실행되게 하는데 해당 emthod는 우리의 TodoItem으로 method를 전달해주는 역할을 하는 애가 되면 될것 같다



  //image첨부 함수
  _selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });
    }
  };
  render(){
    ///////////////////////
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash2.gif')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    /////////////////////////////
    // console.log("state가 가진 todo check" , this.state.todos)
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
            }}
            />
      </SafeAreaView>
    );
  }
/////////////////////loading창 코드구분//////////
  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/splash2.gif');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
 

    this.setState({ isReady: true });
  };
  
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
