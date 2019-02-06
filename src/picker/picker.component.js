import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ImgDropDownArrow from '../assets/images/drop-down-arrow.png'

const { width, height } = Dimensions.get('window');

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            layout: {},
            selectedValue: "this is our picker bro",
            itemHeight: null,
        }
    }
    windowWidth = Dimensions.get('window').width;
    windowHeight = Dimensions.get('window').height;
    dropdownMarginBottom = 30;
    dropdownMarginTop = 30;
    dropdownMaxHeight = 0.4 * this.windowHeight;
    layout = {
        y: 0,
        x: 0,
        height: 0,
        width: 0
    }

    updateId = (id) => {
        if (id > -1) {
            this.setState({ selectedValue: this.props.items[id], showDropDown: false })
        }
        else {
            this.setState({ showDropDown: false })
        }
    }

    getHeight = () => {
        let itemHeight = this.state.itemHeight ? this.state.itemHeight : this.state.layout.height;
        if (this.dropdownMaxHeight < (itemHeight * this.props.items.length)) {
            return this.dropdownMaxHeight;
        } else {
            return itemHeight * this.props.items.length;
        }
    }

    getTop = () => {
        let dropdownHeight = this.getHeight();
        if (dropdownHeight < this.windowHeight - (this.state.layout.y + this.state.layout.height) - this.dropdownMarginBottom) {
            // dropdown to the bottom
            return this.state.layout.y + this.state.layout.height - 4;
        } else if (dropdownHeight < this.state.layout.y - this.dropdownMarginTop) {
            // dropdown to the top
            return this.state.layout.y - dropdownHeight + 4;
        }
    }

    updateItemHeight = (height) => {
        this.setState({ itemHeight: height })
    }

    pickerViewOnLayout = (view) => {
        this.setState({ layout: view.nativeEvent.layout });
    }

    render() {
        this.windowWidth = Dimensions.get('window').width;
        this.windowHeight = Dimensions.get('window').height;
        this.dropdownMaxHeight = 0.4 * this.windowHeight;
        firstItem = true;
        return (
            <View style={[styles.pickerView, this.props.pickerStyle && this.props.pickerStyle]}
                onLayout={this.pickerViewOnLayout}  >
                <TouchableOpacity style={styles.innerView} onPress={() => { this.setState({ showDropDown: true }) }}>
                    <Text numberOfLines={1} style={{ flex: 1 }} >{this.state.selectedValue}</Text>
                    <Image source={ImgDropDownArrow} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                </TouchableOpacity>
                {
                    this.state.showDropDown &&
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: this.state.layout.y * -1,
                            left: this.state.layout.x * -1,
                            flex: 1,
                            width: this.windowWidth,
                            height: this.windowHeight,
                            // backgroundColor : 'black'
                        }}
                        onPress={() => { this.updateId(-1) }}>
                        <View style={[{
                            shadowRadius: 3,
                            shadowOpacity: 0.5,
                            shadowOffset: {
                                height: 1,
                                width: 2
                            },
                            elevation: 2,
                            position: 'absolute',
                            left: this.state.layout.x + 4,
                            width: this.state.layout.width - 8,
                            top: this.getTop(),
                            height: this.getHeight(),
                        }]} >
                            <ScrollView style={[{ flex: 1 }]} showsVerticalScrollIndicator = {true} >
                                {
                                    this.props.items.length > 0 && this.props.items.map((item, key) => {
                                        item = <PickerItem
                                            updateItemHeight={firstItem ? this.updateItemHeight : null}
                                            id={key} key={key}
                                            value={item} updateId={this.updateId}
                                            style={[{
                                                backgroundColor: 'white',
                                                justifyContent: 'center',
                                                borderColor: '#CECECE',
                                                borderWidth: 0.5,
                                                borderTopWidth: 0,
                                                backfaceVisibility: 'hidden',
                                                shadowColor: '#CECECE',
                                                shadowOffset: { height: 0.5, width: 1 },
                                                shadowOpacity: 1,
                                            }]} />

                                        firstItem = false;
                                        return item
                                    })
                                }
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

class PickerItem extends Component {

    render() {

        return (
            <View onLayout={this.props.updateItemHeight ?
                (view) => {
                    this.props.updateItemHeight(view.nativeEvent.layout.height)
                }
                :
                null}
                style={this.props.style}>
                <TouchableWithoutFeedback onPress={() => { this.props.updateId(this.props.id) }}>
                    <View style={{ padding: 10 }} >
                        <Text numberOfLines={1}>{this.props.value}</Text>
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