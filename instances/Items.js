import React, { Component } from 'react';
import { View, Text } from "native-base";
import styles from './styles';
import themes from '../themes';

export default class Items extends Component {

    constructor(props) {
        super(props);  
    }

    convertAmount(amount){
        return (amount / 100).toLocaleString({style:"currency", currency:"USD"});
    }

    countDateOffset(itemDate)
    {
        var dateNow = new Date;

        var date = new Date(itemDate);
        var one = new Date(date.getFullYear(), date.getMonth(), date.getDate()
        , date.getHours(), date.getMinutes(), date.getSeconds());

        var two = new Date(dateNow.getUTCFullYear(),  dateNow.getUTCMonth(),  dateNow.getUTCDate()
            , dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds());
        var result = new Date(two.getTime() - one.getTime());
        
        if(result.getUTCDate()-1<=7)
        {
            if(result.getUTCDate()-1==0){
                return parseInt(result/36e5)+" Hour(s) ago";
            }
            return result.getUTCDate()-1+" day(s) ago";
        }else{
            return date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear();
        }
    }

    render() {
        const {data} = this.props;

        const sizeFace = {
            fontSize: data.size
        }

        return (          
            <View style={styles.item}> 
                <Text style={themes.bold}>ID Product : {data.id}</Text>    
                <View style={styles.item2}>  
       
                    <View style={styles.contentData}>
                        <Text>{data.face}</Text>
                        <View style={styles.bankRow}>
                        <Text style={themes.bold}>${this.convertAmount(data.price)} </Text>                           
                        </View>
                        <Text>Size : {data.size}</Text>  
                        <Text style={themes.bold}>
                         {this.countDateOffset(data.date)}
                         </Text>    
                    </View>      
                    <View style={styles.smallWindow}>
                        <Text style={[sizeFace, themes.white]}>{data.face}</Text>    
                    </View>              
                </View>            
            </View>
        );
    }

}