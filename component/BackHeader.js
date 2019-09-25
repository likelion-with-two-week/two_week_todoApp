//EditHeader.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet,SafeAreaView,Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

const BackHeader = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.header}>
            <SafeAreaView style={styles.container}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.goBack() }}
                    hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}>
                    <Text style={styles.backheader_text}>↩ 돌아가기 </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'#454552',
        paddingLeft: 20,
        height: 50,
        justifyContent:'center',
        marginBottom:70,
    },
    backheader_text:{
        fontFamily:'DungGeunMo',
        color:'#ff7f80',
        fontSize:30,
    }
})

export default withNavigation(BackHeader);