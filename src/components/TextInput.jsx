import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input:{
    borderWidth:2,
    marginTop:20,
    fontSize:25,
    borderRadius:5,
    padding:5,
    borderColor:'#D3D3D3',
  },
  errorStyle:{
    borderColor:'#d73a4a'
  }
});

const TextInput = ({ style,error, ...props }) => {
  const textInputStyle = [style,styles.input,error && styles.errorStyle ];

  return <NativeTextInput style={textInputStyle} placeholderTextColor="#D3D3D3"  {...props} />;
};

export default TextInput;