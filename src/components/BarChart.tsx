import React, {Component} from 'react';
import {View,Dimensions} from 'react-native'
import {BarChart } from 'react-native-chart-kit'

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
  
export default class Bar extends Component{
    render(){
        return(
            <View style={{
                marginHorizontal:1,
                marginTop: 0,
                
                
            }}>
               <BarChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul"],
                        datasets: [
                            {
                              data: [20, 45, 28, 80, 99, 43,55]
                            }
                          ]
                    }}
                    width={Dimensions.get('window').width}
                    height={320}
                    yAxisLabel=""
                    yAxisSuffix='k'
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor:"#FFF",
                        backgroundGradientFrom:"#FFF",
                        backgroundGradientTo:"#FFF",
                        decimalPlaces:2,
                        color:(opacity = 0) => `rgba(255,0,0, ${opacity})`,
                        labelColor:(opacity = 0) => `rgba(0,0,0, ${opacity})`,
                        style:{
                            borderRadius:16
                        },
                        propsForDots:{
                            r:'6',
                            strokeWidth:"2",
                            stroke:"red"
                        },
                    }}
                    
                    style={{
                        marginVertical:8,
                        borderRadius:16
                    }}
                    
               />
            </View>
        )
    }
}