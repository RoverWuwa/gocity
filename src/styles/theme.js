/*Base visual global de la app: Define colores, tipografia y tamaños. Permite una coherencia visual consistente en toda
 la aplicación. Se utiliza para mantener la coherencia visual y la experiencia del usuario.*/

export const theme = {
    colors: {
        background: "#121212", //Color de fondo de la app negro mate
        primary: "#D4aF37", //Color primario de la app dorado
        secondary: "#F9F9F9", //Color secundario de la app blanco marfil
        text: "#FFFFFF", //Color de texto de la app blanco
        error: "#FF0000", //Color de error de la app rojo
    },
    spacing: {
        xs: 4, //Espacio pequeño
        sm: 8, //Espacio medio
        md: 16, //Espacio grande
        lg: 24, //Espacio extra grande
        xl: 32, //Espacio extra extra grande
    },
    typography: { 
        fontFamily: "Roboto", //Fuente de texto de la app
        fontSize: {
            small: 12, //Tamaño de texto pequeño
            medium: 16, //Tamaño de texto medio
            large: 24, //Tamaño de texto grande
        }
    },
    defaults: { 
        colors,
        spacing,
        typography,
    }
        
}