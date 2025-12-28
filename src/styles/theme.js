/*Base visual global de la app: Define colores, tipografia y tamaños. Permite una coherencia visual consistente en toda
 la aplicación. Se utiliza para mantener la coherencia visual y la experiencia del usuario.*/

export const theme = {
    colors: {
        background: "#F57C00", //Color de fondo de la app negro mate
        neon: "#C6FF00",
        buttonPrimary: "#F57C00",
        buttonSecondary:"#1C2D4A",
        textPrimary: "#FFFFFF",
        textSecondary: "#AAAAAA", //Color de texto de la app blanco
        inputBackground: "#1A1A1A",
        border:"#333333",
        error: "#FF0000", //Color de error de la app rojo
    },
    spacing: {
        xs: 4, //Espacio pequeño
        sm: 8, //Espacio medio
        md: 16, //Espacio grande
        lg: 24, //Espacio extra grande
        xl: 45, //Espacio extra extra grande
    },
    typography: { 
        fontFamily: "Roboto", //Fuente de texto de la app
        fontSize: {
            small: 12, //Tamaño de texto pequeño
            medium: 16, //Tamaño de texto medio
            large: 24, //Tamaño de texto grande
        }
    },  
    radius: { 
        sm: 6, 
        md: 8, 
        lg: 20, 
    },
}