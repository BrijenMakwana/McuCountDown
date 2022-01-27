import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import MovieComponent from './components/MovieComponent';

export default function App() {
  const [movieDetails,setMovieDetails] = useState({});
  const [nextDate, setNextDate] = useState("");

  const getMovieDetails = () => {
    axios.get('https://www.whenisthenextmcufilm.com/api',{
      params: {
        date: nextDate
      }
    })
   .then( (response)=> {

      setMovieDetails(response.data);
      setNextDate(response.data.release_date)

     
   })
   .catch( (error)=> {
     // handle error
     console.log(error);
   })
   .then(function () {
     // always executed
   });
  }

  useEffect(() => {
    getMovieDetails();
    if(Platform.OS === "android"){
      ToastAndroid.showWithGravityAndOffset(
        "Press on Image to see next movie or show",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    
},[])
  
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <MovieComponent movieDetails={movieDetails} onPress={getMovieDetails}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
