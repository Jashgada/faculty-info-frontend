import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    table: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableCol: { 
      // TODO: fix width to be dynamic
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 
    }
  });
  
  const Table = ({header, rows, widths}) => {
    return(
        <View style={styles.table}> 
        {
            Array.isArray(rows) && rows.length>0? rows.map((row, index) => (
                <View style={styles.tableRow} key={index}>
                    {header.map((item, index2) => (
                        <View style={[styles.tableCol, {width:`${widths[index2]}`}]} key={index2}>
                            <Text style={styles.tableCell}>
                                {/* {row[0][item]} */}
                                {row[item]}
                                </Text>
                        </View>
                    ))}
                </View>
            )): null
        } 
        </View>
     
   
    )
  };
  
    export default Table;