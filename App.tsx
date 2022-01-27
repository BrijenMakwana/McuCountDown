import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import MovieComponent from './components/MovieComponent';

export default function App() {
  // storing data from the API
  const [movieDetails,setMovieDetails] = useState({});
  const [nextDate, setNextDate] = useState("");

  // calling the API https://github.com/DiljotSG/MCU-Countdown
  const getMovieDetails = () => {
    axios.get('https://www.whenisthenextmcufilm.com/api',{
      // giving the date from currently fetched object
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

  // invoke first time when user open the app to populate the data
  useEffect(() => {
    getMovieDetails();

    // notice to the Android users that they can press the image to go to next movie or show
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
  },
});
