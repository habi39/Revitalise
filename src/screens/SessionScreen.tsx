import firebase from 'firebase';
import React, { useState, useEffect, useContext} from 'react';
import { Image, View, Text,TouchableOpacity, StyleSheet, 
    SafeAreaView,
    FlatList,
    ScrollView,
    ActivityIndicator} from 'react-native';

import { images, icons, COLORS, SIZES } from '/Users/lkm/reactNativeProject/src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usersContext } from '../UsersContext/UserContext';

var navigation: any;
var data: firebase.firestore.DocumentData[] = [];
const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const PlayerScreen = ({ navigation,route }: { navigation: any , route:any}) => {
   
    const [userData, setUserData] = useState<any>();
    const [doneloading, setdoneLoading] = useState<boolean>(false);
    const [isCoach, setIsCoach] = React.useState< boolean>(false);
    const users = useContext(usersContext)
    
    useEffect(() => {
        setUserData(route.params.player)
        loadWeekData(route.params.player.id,route.params.data.id) 
      },[])
    
    async function loadWeekData(playerId: string,weekId: string) {
        data = [];
        var snapshot = await firebase.firestore().collection('users').doc(playerId).collection('trainings').doc(weekId).collection('sessions').get();
        snapshot.forEach((doc) => {
            if (!containsObject(doc.data(), data)) {
                data.push(doc.data())
            }
        });
        setdoneLoading(true);
        
        
    }

    function containsObject(obj:any, list:any) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                
                return true;
            }
        }
    
        return false;
    }
    
    const signOut = () => {
        data = [];
        firebase.auth().signOut();
        setUserData({})
    }    
    const [profile, setProfile] = React.useState(userData);

    function renderHeader(profile:any) {
        
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{  color: COLORS.white }}></Text>
                    </View>
                </View>
                
                <View
                    style={{
                        backgroundColor: COLORS.lightGray4,
                        height: 65,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 5,
                        marginRight: SIZES.radius
                    }}
                >   
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}> Player Name: {profile['name']==='hanbin'?'Declan Ng':profile['name']}</Text>
                </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}>Weekly Jump Count: {profile['weekly jump count']}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}>Average Jump Height: {profile['average jump height']}cm</Text>
                    </View>
                </View>
                {/* Points */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    onPress={signOut}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    

    function renderCategoryData(data:any) {
        var books: any[] = data
            

        const renderItem = ({ item }:{item:any}) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() =>{console.log("Weekly sessions")}}
                    >
                        {/* Book Cover */}
                        

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, color: COLORS.white }}>{item.id}</Text>
                                <Text style={{color: COLORS.lightGray }}>{item.author}</Text>
                            </View>

                            {/* Book Info */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Image
                                    source={icons.page_filled_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Approach Jump Count: {item['approach jump count']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Average Approach Jump Height: {item['average approach jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Average Block Jump Height: {item['average block jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Block Jump Count: {item['block jump count']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Max Approach Block Jump Height: {item['max approach block jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Max Approach Jump Height: {item['max approach jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Peak Jump Height: {item['peak jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Total Average Jump Height: {item['total average jump height']}</Text>
                                
                        
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
        
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>Total Jumps: {item['total jumps']}</Text>
                                
                            </View>
                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {/* {
                                    item.genre.includes("Adventure") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{  color: COLORS.lightGreen }}>Adventure</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Romance") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{  color: COLORS.lightRed }}>Romance</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Drama") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{  color: COLORS.lightBlue }}>Drama</Text>
                                    </View>
                                } */}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity> */}
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    if (!doneloading) {
        return <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#03c6fc"/>  
      </View>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 150}}>
                {renderHeader(userData)}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                   
                    <View>
                        {data.length>0? renderCategoryData(data):<ActivityIndicator size="large" color="#03c6fc"/> }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
}
export default PlayerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
      alignItems: 'center',
    },
    trendingShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    recentContainerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
})

