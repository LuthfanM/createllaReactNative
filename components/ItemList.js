import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';

import axiosService from '../helpers/axiosService';
import themes from '../themes/index';
import styles from './styles';
import Items from '../instances/Items';
import LoadingScreen from '../screens/LoadingScreen';
import Ads from '../components/Ads';
import {
    apiProduct, FilterProduct
} from '../constants/index';

export default class ItemLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            page: 1,
            error: null,
            refreshing: false,
            loadingMore: false,
            isAds: false,
            linkAds: "",
            storeNum: [],
            endOfLane: false,
        }
    }

    componentDidMount(){
        this.fetchDatas();
    }

    
  fetchDatas=()=>{
    const { page } = this.state;
    const URL = apiProduct+'_page='+page+'&_limit=10';
    
    axiosService.request({
      url: URL,
      method: 'GET'
    })
    .then(response => {
      
        if(response.data.length!=0){  
      this.setState((prevState, nextProps) => ({
        isLoading: false,
        loadingMore: false,
        // storeNum: [],
        data:
          page === 1
            ? Array.from(response.data)
            : [...this.state.data, ...response.data],
      }));

        }else{
            this.setState({
                endOfLane: true,
                // loadingMore: false,
                isLoading: false,
            })
        }
    }
    
    )
    .catch(error => {
      this.setState({ error, isLoading: false, endOfLane: false });
    });
  }

  fetchMoreDatas = () => {
    if (this.state.loadingMore){
      return null;
    }
  
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true
        }),
        () => {
          this.fetchDatas();
        }
      );

    }

    renderFooter = ()=>{

        if(this.state.endOfLane)
        {
            return  <Text style={{textAlign: 'center', color: 'white', marginBottom: 10, marginTop: 10}}>~ end of catalogue ~</Text>;
        }

        if (this.state.loadingMore){
          return (<View style={{marginBottom: 20, marginTop: 10}}>
            <Text style={{textAlign: 'center', color: 'white', marginBottom: 10, marginTop: 10}}>Loading...</Text>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>);
        }else{
            return null;
        }
      }

      selectFilter=()=>{
        this.props.navigation.navigate('FilterScreen');
      }

      sortProductByService(searchId){
        const URL = apiProduct+'_page=1&_limit=10&_sort='+searchId.toLowerCase();
    
        axiosService.request({
          url: URL,
          method: 'GET'
        })
        .then(response => {
          this.setState((prevState, nextProps) => ({
            isLoading: false,
            loadingMore: false,
            // storeNum: [],
            page: 1,
            data:Array.from(response.data)
          }));
        })
        .catch(error => {
          this.setState({ error, isLoading: false, endOfLane: false });
        });
      }
    
     componentDidUpdate(prevProps, prevState) {
       if(prevProps.route.params.dataKey!=this.props.route.params.dataKey){
          this.setState(
            {
                isLoading: true,
                endOfLane: false,
            },  this.sortProductByService(this.props.route.params.dataKey)
          )
       }
     }


    displayData() {        
        const {data} = this.state;

        let dataArray = data;

          let arr = [];
        if (this.props.searchText != "" )
        {            
            for (var x = 0; x < dataArray.length; x++) {
                if (dataArray[x].face.toLowerCase().includes(this.props.searchText.toLowerCase())) {
                    arr.push(dataArray[x])
                }
            }
            return arr;  
        }else{
            return dataArray;
        }
        
    };

    render() {
        return (
            <View style={themes.height}>
            <TouchableOpacity
            onPress={this.selectFilter}
            >
              <Text style = {styles.textButton}>
                 {FilterProduct}
              </Text>
           </TouchableOpacity>
           <Text>Filter as : {this.props.route.params.dataKey}</Text>
          {
            this.state.isLoading ?
              <LoadingScreen /> :
              <FlatList
                  style={styles.flatlistHeight}
                  data={this.displayData()}
                  renderItem={({ item, index }) => 
                  <View>
                          <Items data={item}  />
                          {
                            (index+1)%20==0? <Ads />:null
                          }
                          </View>
                        }
                  keyExtractor={(item, index) => item.id.toString()+index}
                  onEndReached={()=>this.fetchMoreDatas()}
                  onEndReachedThreshold={0.5}
                  initialNumToRender={10}
                  ListFooterComponent={this.renderFooter}
                  refreshing={this.state.loadingMore }
              />
               }
              </View>
        );
    }

}