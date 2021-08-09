import  firebase from '/Users/lkm/reactNativeProject/src/firebase/firebase';
import React, {FC, useState, useContext} from 'react';
import {ActivityIndicator, Image, View, Text,TouchableOpacity, StyleSheet, 
    SafeAreaView,
    FlatList,
    ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images, icons, COLORS, SIZES } from '/Users/lkm/reactNativeProject/src/constants';
import { usersContext } from '../UsersContext/UserContext';


var navigation: any;
var players: any[] = [];
const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}


const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [userId, setUserId] = useState<any>();
    const [userData, setUserData] = useState<any>();
    const [doneloading, setdoneLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [myplayersData, setMyPlayerData] = useState<any>();
    
    const users = useContext(usersContext)
    

    loadUsers();
    async function loadUsers() {
        if (!doneloading) {
           
        AsyncStorage.getItem("userId").then((userId) => {
            if (userId) {
                
                users.forEach((obj: any) => {
                    if (obj.id === userId) {
                        console.log("-------- my profile from home -------")
                        console.log(obj)
                        setUserData(obj)
                        console.log("-------- my profile from home-------")
    
                        
                        
                    }
                })
                
                
            }
             
        }).then(() => {
            for (let i = 0; i < userData.player.length; i++){
                            
                getPlayerData(userData.player[i])
                
            }
        console.log("-------- my player from home -------")
        console.log(players)
        console.log("-------- my player from home-------")
        console.log("-------- all users from home -------")
        console.log(users)
        console.log("-------- all users from home-------")
        setdoneLoading(true);
        })
        
        
        }
        
    }
    
    
    
    const signOut = () => {
        firebase.auth().signOut();
        setUserData({})
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
        
    
    
     function getPlayerData(userId: string) {
   
        
          users.forEach((obj:any) => {
              if (obj.id === userId && !containsObject(obj,players)) {
                players.push(obj)
              }
          })
        
      }

    const bookOtherWordsForHome = {
        id: 1,
        bookName: "Brandon",
        bookCover: images.brandon,
        rating: 4.5,
        pageNo: 341,
        author: "Player",
        genre: [
            "Open Spiker"
        ],
        readed: "12k",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: "#000"
    }

    const bookTheMetropolis = {
        id: 2,
        bookName: " Lee Han Bin",
        bookCover: images.hanbin,
        rating: 4.1,
        
        pageNo: 272,
        author: "Player",
        genre: [
            "Open Spiker"
        ],
        readed: "13k",
        backgroundColor: "rgba(247,239,219,0.9)",
        navTintColor: "#000"
    }

    const bookTheTinyDragon = {
        id: 3,
        bookName: "Kingsley Tay",
        bookCover: images.kingsley,
        rating: 3.5,
        pageNo: 110,
        author: "Player",
        genre: [
            "Open Spiker", "Subset"
        ],
        readed: "13k",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    }

    

    const categoriesData = [
        {
            id: 1,
            categoryName: "All players",
            books: [
                bookOtherWordsForHome, bookTheMetropolis, bookTheTinyDragon
            ]
        },
        {
            id: 2,
            categoryName: "Most Improved",
            books: [
                bookTheMetropolis
            ]
        },
        {
            id: 3,
            categoryName: "Needs Help",
            books: [
                bookTheTinyDragon
            ]
        },
    ]

    const [profile, setProfile] = React.useState(myplayersData);
    const [myBooks, setMyBooks] = React.useState<any>(players);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);

    function renderHeader(profile:any) {
        
        return (
            <View style={{ flex: 5, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' ,paddingTop:  SIZES.padding}}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
    
                        <Text style={{  color: COLORS.white }}></Text>
                    </View>
                </View><View
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

                <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}> Coach Name: {profile['name']}</Text>
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

    function renderButtonSection() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => navigation.navigate('addplayer',userData)}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Image
                                source={icons.plus_icon}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>
                            <Text style={{ marginLeft: SIZES.base,  color: COLORS.white }}>Add player</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* My Card */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("My Card")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.card_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base,  color: COLORS.white }}>My Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderMyBookSection(myBooks:any) {
        const renderItem = ({ item }: { item: any }) => {
            
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft:  SIZES.padding,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate('player',item)}
                >
                    {/* Book Cover */}
                    <Image
                        source={item.name==='hanbin'?images.hanbin:item.name==='Brandon'?images.brandon:item.name==='Declan Ng'?images.declan:item.name==='Dallion Wong'?images.dallion:item.name==='Alysia Chai'?images.alicia:item.name==='dallion2'?images.brandon:images.anon}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 20
                        }}
                    />

                    {/* Book Info */}
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>{item.name==='dallion2'?"Brandon":item.name}</Text>
                    </View>
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Weekly Jump Count: {item.name==='dallion2'?11:item["weekly jump count"]}</Text>
                    </View>
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>

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
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>{item.name==='dallion2'?"Positive Adaptation":item["injury management rating"]}</Text>
                        </View>
                        
                    </View>
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Average Jump Height: {item.name==='dallion2'?28:item["average jump height"]}</Text>
                    </View>
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>

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
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>{item.name==='dallion2'?"Above Average":item["performance enhancement rating"]}</Text>
                        </View>
                        
                    </View>
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5,  color: COLORS.lightGray }}>Peak Jump Height: {item.name==='dallion2'?"37.5":item["peak jump height"]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{  color: COLORS.white }}>My Players</Text>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function renderCategoryHeader() {

        const renderItem = ({ item }:{item:any}) => {
            return (
                <TouchableOpacity
                    style={{ flex: 1, marginRight: SIZES.padding }}
                    onPress={() => setSelectedCategory(item.id)}
                >
                    {
                        selectedCategory == item.id &&
                        <Text style={{ color: COLORS.white }}>{item.categoryName}</Text>
                    }
                    {
                        selectedCategory != item.id &&
                        <Text style={{ color: COLORS.lightGray }}>{item.categoryName}</Text>
                    }
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
            </View>
        )
    }

    function renderCategoryData() {
        var books: any[] = []

        let selectedCategoryBooks = categories.filter((a: { id: any; }) => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            books = selectedCategoryBooks[0].books
        }

        const renderItem = ({ item }:{item:any}) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => {console.log("Not implemented")}}
                    >
                        {/* Book Cover */}
                        <Image
                            source={item.bookCover}
                            resizeMode="cover"
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, color: COLORS.white }}>{item.bookName}</Text>
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
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre.includes("Open Spiker") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{  color: COLORS.lightGreen }}>Open Spiker</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Subset") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{  color: COLORS.lightRed }}>Subset</Text>
                                    </View>
                                }
                                
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
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
                    </TouchableOpacity>
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
            <View style={{ height: 200 }}>
                {renderHeader(userData)}
                {renderButtonSection()}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection(myBooks)}
                </View>

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    <View>
                        {renderCategoryHeader()}
                    </View>
                    <View>
                        {renderCategoryData()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
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

