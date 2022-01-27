import { StyleSheet, Text, View,Image, SafeAreaView, Platform, Pressable } from 'react-native';
import React from 'react';
import moment from 'moment';

export type MovieComponentProps = {
  movieDetails:{
    title: string;
    days_until: number;
    poster_url: string;
    type: string;
    release_date: string;
    overview: string;
  },
  // function to call the API again with the next date
  onPress: () => void;
}

const MovieComponent = (props: MovieComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
        {/* movie title */}
      <Text style={styles.title}>{props.movieDetails.title}</Text>

      {/* days until */}
      <Text style={styles.daysLeft}>
        releases in  <Text style={styles.type}>{props.movieDetails.days_until}</Text>  days!
      </Text>

      {/* poster image */}
      <Pressable 
        onPress={props.onPress} 
        android_ripple={{
          color: "#ED6363"
        }}
        style={{padding: 10}}
      >
        <Image
          source = {{
            uri: props.movieDetails.poster_url
          }}
          style={styles.poster}
        />
      </Pressable>
      

      {/* show or movie */}
      <Text style={styles.type}>{props.movieDetails.type}</Text>

      {/* release date */}
      <Text style={styles.date}>{moment(props.movieDetails.release_date).format("Do MMMM YY")}</Text>

      {/* overview */}
      <Text style={styles.overview} adjustsFontSizeToFit allowFontScaling>
        {props.movieDetails.overview}
      </Text>
      
    </SafeAreaView>
  );
};

export default MovieComponent;

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: "#003545",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
   
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#ED6363",
    marginTop: Platform.OS === "android" ? 50 : 0
  },
  daysLeft:{
    fontSize: 20,
    color: "#EEEEEE"
  },
  poster:{
    width: 250,
    height: 350,
    borderRadius: 20,
    borderColor: "#ED6363",
    borderWidth: 2
  },
  type:{
    fontSize: 25,
    fontWeight: "bold",
    color: "#ED6363"
  },
  date:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#ED6363",
  },
  overview:{
    textAlign: "center",
    fontSize: 17,
    paddingHorizontal: 20,
    color: "#fff",
    fontWeight: "500",
    width: "100%"
  }
  
});
