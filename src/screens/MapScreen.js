import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <style>
                  html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                  }
                  #map {
                    height: 100%;
                    width: 100%;
                  }
                </style>
              </head>
              <body>
                <div id="map"></div>
                <script>
                  var map = L.map('map').setView([40.7128, -74.0060], 13);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: ''
                  }).addTo(map);
                </script>
              </body>
            </html>
          `,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
