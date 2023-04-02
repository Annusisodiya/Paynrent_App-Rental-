import {Dimensions, TouchableOpacity,View,Text } from "react-native"
const {width,height}=Dimensions.get('window')

export default function AppButton({buttonText,btnWidth,bgColor,...props}){
 
    return(
        
            <TouchableOpacity {...props}>
      <View style={{width: width*(btnWidth?btnWidth:1),
      backgroundColor:bgColor?bgColor:'#3498db',
      borderRadius:10,
      borderWidth:0.5,
      borderColor:bgColor,
      padding:10,
      marginTop:10,
      display:'flex',
      alignItems:'center'
}}>
       <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>
        {buttonText}
       </Text>
      </View>
      </TouchableOpacity>
        
    )


}

  