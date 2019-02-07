import React, { Component } from 'react';
import { View, SafeAreaView, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }
    }

    windowHeight = Dimensions.get("window").height;
    windowWidth = Dimensions.get("window").width;

    getScreenFillStyle = () => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.windowWidth,
            height: this.windowHeight,
            backgroundColor: 'red'
        }
    }

    render() {

        return (
            <View style={[styles.pickerView]}>
                <TouchableOpacity style={styles.innerView}
                    onPress={() => { this.setState({ showDropdown: true }) }}>
                    <Text numberOfLines={1} style={{ flex: 1 }}>{this.state.selectedValue}</Text>
                </TouchableOpacity>
                {
                    this.state.showDropdown &&
                    <TouchableOpacity style={this.getScreenFillStyle}>

                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerView: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 2,
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 10
    },
    screenFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: this.windowWidth,
        height: this.windowHeight

    }
})