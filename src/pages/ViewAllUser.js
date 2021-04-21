import React, {useState, useEffect} from 'react';
import {FlatList, Text, View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from "lodash";


const ViewAllUser = () => {

  const [ columns, setColumns ] = useState([
    "name",
    "contact",
    "id",
    "age"
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [listData, setListData] = useState([]);
  const [column, setColumn] = useState("name");

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then((querySnapshot) => {
        let temp = [];
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          console.log('user Id: ', documentSnapshot.id);
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails['id'] = documentSnapshot.id;
          temp.push(userDetails);
          setListData(temp);
          console.log(temp);
        });
      });
  }, []);

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(listData, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setListData(sortedData)
  }

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <Icon
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  return (
           <View style={styles.container}>
             <Text>Click Any Table Header Filled To Show Filtering</Text>
              <FlatList 
                data={listData}
                style={{width:"90%"}}
                keyExtractor={(item, index) => index+""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({item, index})=> {
                  return (
                    <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#c1e1ec" : "white"}}>
                      <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.name}</Text>
                      <Text style={styles.columnRowTxt}>{item.contact}</Text>
                      <Text style={styles.columnRowTxt}>{item.id}</Text>
                      <Text style={styles.columnRowTxt}>{item.age}</Text>
                    </View>
                  )
                }}
              />
            </View>
  );
};

export default ViewAllUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2e64e5",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"24.5%",
    textAlign:"center",
    justifyContent: "space-evenly",
  }
});