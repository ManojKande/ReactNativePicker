import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ImgDropDownArrow from '../assets/images/drop-down-arrow.png'

const { width, height } = Dimensions.get('window')

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            layout: {},
            selectedValue: "this is our picker bro"
        }
        console.log(this.props);
    }

    updateId = (id) => {
        console.log(id, this.props.items[id])
        if (id > -1) {
            this.setState({ selectedValue: this.props.items[id], showDropDown: false })
        }
        else {
            this.setState({ showDropDown: false })
        }
    }

    render() {
        console.log(this.state);
        return (

            <View style={[styles.pickerView, this.props.pickerStyle && this.props.pickerStyle]}
                onLayout={view => { const layout = view.nativeEvent.layout; this.setState({ layout: layout }); console.log(layout) }}  >
                <TouchableOpacity style={styles.innerView} onPress={() => { this.setState({ showDropDown: true }) }}>
                    <Text >{this.state.selectedValue}</Text>
                    <Image source={ImgDropDownArrow} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                </TouchableOpacity>
                {
                    this.state.showDropDown &&
                    // <PickerItem key={1} value="manoj" style={{ height: this.state.layout.height, width: this.state.layout.width }} />
                    <TouchableOpacity style={{ position: 'absolute', top: this.state.layout.y * -1, left: this.state.layout.x * -1, flex: 1, width: width, height: height }} onPress={() => { console.log("pressed"); this.updateId(-1) }}>
                        <ScrollView style={[{
                            height: this.props.items.length * this.state.layout.height,
                            shadowColor: '#FFFFFF', shadowOffset: { height: 1, width: 1 },
                            shadowOpacity: 4, position: 'absolute', left: this.state.layout.x,
                            top: this.state.layout.y
                        }]}>
                            {
                                this.props.items.length > 0 && this.props.items.map((item, key) => {
                                    console.log(key);
                                    return <PickerItem id={key} key={key} value={item} updateId={this.updateId}
                                        style={{ backgroundColor: 'white', width: this.state.layout.width - 40, justifyContent: 'center', borderBottomWidth: 0.5, borderColor: '#CECECE', backfaceVisibility: 'hidden' }} />
                                })
                            }
                        </ScrollView>
                    </TouchableOpacity>
                }
                {
                    console.log(this.state.layout)
                }
            </View>
        )
    }
}

class PickerItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableWithoutFeedback onPress={() => { this.props.updateId(this.props.id) }}>
                    <View style={{ padding: 10 }} >
                        <Text>{this.props.value}</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    innerView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})