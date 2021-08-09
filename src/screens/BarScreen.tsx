import React, {Component, useState} from 'react';
import {View,StyleSheet,Image, Text ,Dimensions, FlatList,TouchableOpacity, ActivityIndicator,} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Bar from '../components/BarChart';
import {BarChart } from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler';
import { images, icons, COLORS, SIZES } from '/Users/lkm/reactNativeProject/src/constants';

//export default class Detail extends Component {
const BarScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    var header = []
    var data = []
    var feedback: any[] = []
    console.log("----------is coach--------")
    console.log(route.params.isCoach)
    console.log("----------is coach--------")
    if (route.params.type === 'competition readiness') {
        data.push(route.params.userdata['competition jump'])
        header.push('Target')
    }
    const [type, setType] = useState<any>(route.params.type);

    function renderCategoryData(data:any) {
        var books: any[] = data
            

        const renderItem = ({ item }:{item:any}) => {
            return (
                <View style={styles.button}>
                    <Text style={styles.btnText}>{ item.id}: {item.feedback}</Text>

    
                </View>
            )
        }

        return (
            <View style={{  paddingLeft: SIZES.padding, height:150  }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    style={{borderColor:'black'}}
                />
            </View>
        )
    }
    for (let i = route.params.data.length-1; i >= 0; i--){
        header.push(route.params.data[i].id)
        if (route.params.type === 'peak jump') {
            data.push(route.params.data[i]['peak jump height'])
        }
        if (route.params.type === 'performance rating') {
            data.push(route.params.data[i]['average jump height'])
            feedback.push({"feedback":route.params.data[i]['performance enhancement feedback'],"id":route.params.data[i].id})
        }
        if (route.params.type === 'competition readiness') {
            data.push(route.params.data[i]['total jumps'])
            feedback.push({"feedback":route.params.data[i]['competition readiness feedback'],"id":route.params.data[i].id})
        }
        if (route.params.type === 'injury management') {
            data.push(route.params.data[i]['total jumps'])
            feedback.push({"feedback":route.params.data[i]['injury management feedback'],"id":route.params.data[i].id})
        }
        
    }

        return(
            <View style={styles.page}>
                <View style={styles.headContainer}>
                    <View style={styles.humContainer}>
                        <Icon 
                            name="md-remove"
                            size={26}
                        />
                        <Icon
                            name="md-remove"
                            size={26}
                            style={styles.hum}
                        />
                    </View>
                    <View style={styles.profileContainer}>
                        {/* <Image
                            source={require('../images/1.jpeg')}
                            style={styles.profile}
                        /> */}
                    </View>
                </View>
                <View style={styles.optionCard}>
                     {/* <View style={styles.optionCol}>
                        <Text style={styles.textLinear}>Time(Week) </Text>
                    </View> */}
                    <Text style={styles.textLogarthimic}>Time(Week)</Text>
                    <Text style={styles.textLogarthimic}>vs</Text>
                    <Text style={styles.textLogarthimic}>{type === 'competition readiness' ? "Total Jumps" : ""}
                        {type === 'injury management' ? "Total Jumps" : ""}
                        {type === 'peak jump' ? "Peak Jumps" : ""}
                        {type === 'performance rating' ? "Average Jumps" : ""}
                    </Text>
                    
                </View>
                <View style={styles.locationContainer}>

                    
                </View>


                <View >
                    <ScrollView
                        horizontal={true}
                    >

                    
               <BarChart
                            data={{
                                labels: header,
                                datasets: [
                                    {
                                        data: data,
                                        
                                    },
                                ]
                            }}
                            width={500}
                            height={320}
                            yAxisLabel=""
                            xAxisLabel=""
                            yAxisSuffix={ type==='competition readiness'||type==='injury management'?'':'cm'}
                            yAxisInterval={1}
                            fromZero={true}
                    chartConfig={{
                        backgroundColor:"#FFF",
                        backgroundGradientFrom:"#FFF",
                        backgroundGradientTo:"#FFF",
                        decimalPlaces:1,
                        color:(opacity = 0) => `rgba(255,0,0, ${opacity})`,
                        labelColor:(opacity = 0) => `rgba(0,0,0, ${opacity})`,
                        style:{
                            borderRadius:16
                        },
                    
                    }}
                    
                        style={{
                        
                        marginVertical:8,
                        borderRadius:16
                    }}
                    
                        />
                        </ScrollView>
            </View>
                {route.params.isCoach ?
                <View style={styles.bottomCard}>
                <View style={styles.bottomCol}>
                    <Text style={styles.textSymptoms}>Feedback</Text>
                    <View style={styles.infoContainer}>
                        <Text style={{color:"#FFF"}}>i</Text>
                    </View>
                </View>
                <View >
                { renderCategoryData(feedback)}
                </View>
                {/* <View style={styles.button}>
                    <Text style={styles.btnText}>See more graphs</Text>
                </View> */}

                    </View> : <View style={styles.bottomCard}>
                    <View style={styles.bottomCol}>

<Image
    source={icons.page_icon}
    style={{
        marginLeft: SIZES.radius,
        width: 20,
        height: 20,
        tintColor: COLORS.lightGray
    }}
/>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Weekly Jump Count: {route.params.userdata["weekly jump count"]}</Text>
</View>
<View style={styles.bottomCol}>

<Image
    source={icons.page_icon}
    style={{
        marginLeft: SIZES.radius,
        width: 20,
        height: 20,
        tintColor: COLORS.lightGray
    }}
/>
<View>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Injury Management Rating:</Text>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>{route.params.userdata["injury management rating"]}</Text>
</View>

</View>
<View style={styles.bottomCol}>

<Image
    source={icons.page_icon}
    style={{
        marginLeft: SIZES.radius,
        width: 20,
        height: 20,
        tintColor: COLORS.lightGray
    }}
/>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Average Jump Height: {route.params.userdata["average jump height"]}</Text>
</View>
<View style={styles.bottomCol}>

<Image
    source={icons.page_icon}
    style={{
        marginLeft: SIZES.radius,
        width: 20,
        height: 20,
        tintColor: COLORS.lightGray
    }}
/>
<View>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Performance Enhancement Rating:</Text>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>{route.params.userdata["performance enhancement rating"]}</Text>
</View>

</View>
<View style={styles.bottomCol}>

<Image
    source={icons.page_icon}
    style={{
        marginLeft: SIZES.radius,
        width: 20,
        height: 20,
        tintColor: COLORS.lightGray
    }}
/>
<Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Peak Jump Height: {route.params.userdata["peak jump height"]}</Text>
                        </View>
                    </View>}
                
            </View>
        )
    
}
export default BarScreen;
const styles = StyleSheet.create({
    page:{
        backgroundColor:"#FFF",
        flex:1
    },
    headContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        marginTop:40
    },
    humContainer:{
        width:"50%"
    },
    hum:{
        marginTop:-20,
        marginLeft:5
    },
    profileContainer:{
        width:"50%",
        alignItems:"flex-end"
    },
    profile:{
        width:40,
        height:40,
        borderRadius:20
    },
    optionCard:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:80,
    },
    optionCol:{
        backgroundColor:"#000",
        paddingVertical:2,
        paddingHorizontal:5,
        borderRadius:2
    },
    textLinear:{
        color:"#FFF",
        fontSize:12,
        fontWeight:"bold"
    },
    textLogarthimic:{
        color:"#b8b8aa",
        fontWeight:"bold",
        fontSize:12,
        marginLeft:15
    },
    locationContainer:{
        alignSelf:"center",
        flexDirection:"row",
        paddingHorizontal:30,
        marginTop:40,
        alignItems:"center"
    },
    textGlobal:{
        fontWeight:"bold",
        fontSize:16,
        color:"red"
    },
    textRussia:{
        fontWeight:"bold",
        fontSize:16,
        color:"#6a706e",
        paddingHorizontal:30
    },
    reloadContainer:{
        backgroundColor:"#FFF",
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:50,
        elevation:3
    }, 
    bottomCard:{
        backgroundColor:"#1c2732",
        height:250,
        marginTop:0,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    bottomCol:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        marginTop:10
    },
    textSymptoms:{
        color:"#FFF",
        fontSize:12,
        fontWeight:'bold'
    },
    infoContainer:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:"red",
        alignItems:"center",
        justifyContent:'center',
        marginLeft:10,
    },
    button:{
        borderRadius:15,
        borderColor:'red',
        borderWidth:1,
        marginHorizontal:30,
        paddingHorizontal:20,
        paddingVertical:15,
        alignItems:'center',
        marginTop:5,
        marginBottom: 10
        
    },
    btnText:{
        color:"red",
        fontSize:16,
        fontWeight:'bold'
    }


})