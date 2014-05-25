import com.canonical.Oxide 1.0
import QtQuick 2.0
import Ubuntu.Components 0.1

/*!
    \brief MainView with a Flickable WebView.
*/

MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "mainView"
    
    // Note! applicationName needs to match the .desktop filename 
    applicationName: "com.ubuntu.developer.danielbeck.greenmahjong"
    
    /* 
     This property enables the application to change orientation 
     when the device is rotated. The default is false.
    */
    automaticOrientation: true
    
    width: units.gu(100)
    height: units.gu(75)
    
    Flickable {
        id: webViewFlickable
        anchors.fill: parent
        
        WebView {
            id: webView
            anchors.fill: parent
            url: "index.html"
        }
    }
}
