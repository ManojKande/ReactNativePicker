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
            selectedValue: "this is our picker bro"
        }
    }

    dropdownMarginBottom = 30;
    dropdownMarginTop = 30;
    dropdownMaxHeight = 0.4 * height;

    updateId = (id) => {
        if (id > -1) {
            this.setState({ selectedValue: this.props.items[id], showDropDown: false })
        }
        else {
            this.setState({ showDropDown: false })
        }
    }

    // getTop = () => {
    //     try {
    //         let maxHeight = this.getMaxHeight();
    //         console.log(maxHeight)
    //         if (maxHeight < height - this.state.layout.y - this.dropdownMarginBottom) {
    //             console.log("bottom");
    //             return this.state.layout.y + this.state.layout.height - 2;
    //         } else {
    //             console.log("top");
    //             if (((0.3 * height) > (this.props.items.length * this.state.layout.height)) + this.props.items.length) {
    //                 console.log("first")
    //                 return (this.state.layout.y - ((this.props.items.length + 1) * this.state.layout.height) + this.state.layout.height);
    //             } else {
    //                 console.log("second")
    //                 return this.state.layout.y - (0.3 * height) + this.state.layout.height + 2;
    //             }
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // getMaxHeight = () => {
    //     console.log("maxHeight", this.dropdownMaxHeight, this.props.items.length, this.state.layout.height)
    //     if (this.dropdownMaxHeight < (this.props.items.length + 1) * this.state.layout.height) {
    //         console.log("dropdownMaxHeight", this.dropdownMaxHeight)
    //         return this.dropdownMaxHeight
    //     } else {
    //         console.log("length * height", this.props.items.length * this.state.layout.height);
    //         return (this.props.items.length + 2) * this.state.layout.height
    //     }
    // }

    getHeight = () => {
        if (this.dropdownMaxHeight < (this.state.layout.height * this.props.items.length)) {
            return this.dropdownMaxHeight;
        } else {
            return this.state.layout.height * this.props.items.length;
        }
    }

    getTop = () => {
        let dropdownHeight = this.getHeight();
        if (dropdownHeight < height - (this.state.layout.y + this.state.layout.height) - this.dropdownMarginBottom) {
            return this.state.layout.y + this.state.layout.height - 4;
        } else {
            
        }
    }

    render() {
        return (
            <View style={[styles.pickerView, this.props.pickerStyle && this.props.pickerStyle]}
                onLayout={view => { const layout = view.nativeEvent.layout; this.setState({ layout: layout }); }}  >
                <TouchableOpacity style={styles.innerView} onPress={() => { this.setState({ showDropDown: true }) }}>
                    <Text >{this.state.selectedValue}</Text>
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
                            width: width,
                            height: height
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
                            maxHeight: this.getMaxHeight(),
                        }]} >
                            <ScrollView style={[{ flex: 1 }]} >
                                {
                                    this.props.items.length > 0 && this.props.items.map((item, key) => {
                                        return <PickerItem id={key} key={key} value={item} updateId={this.updateId}
                                            style={{
                                                backgroundColor: 'white',
                                                justifyContent: 'center',
                                                borderColor: '#CECECE',
                                                borderWidth: 0.5,
                                                borderTopWidth: 0,
                                                backfaceVisibility: 'hidden',
                                                shadowColor: '#CECECE',
                                                shadowOffset: { height: 0.5, width: 1 },
                                                shadowOpacity: 1,
                                            }} />
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



// <View style={[styles.pickerView, this.props.pickerStyle && this.props.pickerStyle]}
// onLayout={view => { const layout = view.nativeEvent.layout; this.setState({ layout: layout }); console.log(layout) }}  >
// <TouchableOpacity style={styles.innerView} onPress={() => { this.setState({ showDropDown: true }) }}>
//     <Text >{this.state.selectedValue}</Text>
//     <Image source={ImgDropDownArrow} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
// </TouchableOpacity>
// {
//     this.state.showDropDown &&
//     // <PickerItem key={1} value="manoj" style={{ height: this.state.layout.height, width: this.state.layout.width }} />
//     <TouchableOpacity
//         style={{
//             position: 'absolute',
//             top: this.state.layout.y * -1,
//             left: this.state.layout.x * -1,
//             flex: 1,
//             width: width, 
//             height: height
//         }}
//         onPress={() => { console.log("pressed"); this.updateId(-1) }}>
//         <ScrollView style={[{
//             height: (this.props.items.length * this.state.layout.height) + 20,
//             shadowColor: '#CECECE', shadowOffset: { height: 1, width: 5 },
//             shadowRadius : 5,
//             shadowOpacity: 1,
//             elevation: 2,
//             position: 'absolute', left: this.state.layout.x,
//             top: this.state.layout.y + this.state.layout.height - 5,
//             maxHeight: height - this.state.layout.y - this.state.layout.height - 30,
//             borderColor : '#CECECE',
//             borderTopWidth: 0.5
//         }]}>
//             {
//                 this.props.items.length > 0 && this.props.items.map((item, key) => {
//                     return <PickerItem id={key} key={key} value={item} updateId={this.updateId}
//                         style={{
//                             backgroundColor: 'white',
//                             width: this.state.layout.width,
//                             justifyContent: 'center',
//                             borderColor: '#CECECE',
//                             borderWidth: 0.5,
//                             borderTopWidth: 0,
//                             backfaceVisibility: 'hidden',
//                             shadowColor: '#CECECE',
//                             shadowOffset: { height: 0.5, width: 1 },
//                             shadowOpacity: 1,
//                         }} />
//                 })
//             }
//         </ScrollView>
//     </TouchableOpacity>
// }
// {
//     console.log(this.state.layout)
// }
// </View>