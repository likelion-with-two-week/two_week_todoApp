//EditHeader.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native'
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
                    <Ionicons name="ios-arrow-back" size={25} color={'#7a7171'} />
                </TouchableOpacity>

            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'skyblue',
        paddingLeft: 20,
        height: 50,
        justifyContent:'center',
    },
    container: {
    },

})

export default withNavigation(BackHeader);