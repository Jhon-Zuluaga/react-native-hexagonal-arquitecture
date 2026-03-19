import { StyleSheet } from "react-native"

export const registerStyle = StyleSheet.create({

  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
    },

    title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1a1a2e',
    marginBottom: 8 
    },

    subtitle: 
    { fontSize: 16, 
        color: '#666', 
        marginBottom: 32 
    },

    input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    padding: 14, 
    fontSize: 16, 
    marginBottom: 12 
    },

    error: { 
    color: '#e74c3c', 
    marginBottom: 12, 
    textAlign: 'center' 
    },

    button: { 
    backgroundColor: '#534AB7', 
    borderRadius: 12, 
    padding: 16, 
    alignItems: 'center', 
    marginTop: 8 
    },

    buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
    },
    
    link: { 
    textAlign: 'center', 
    color: '#534AB7', 
    marginTop: 16, 
    fontSize: 15 
    },
})