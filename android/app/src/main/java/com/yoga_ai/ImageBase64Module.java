package com.yoga_ai;  // Change this to your actual package name

import android.util.Base64;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class ImageBase64Module extends ReactContextBaseJavaModule {

    public ImageBase64Module(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImageBase64";  // This name will be used in React Native
    }

    @ReactMethod
    public void encodeImageToBase64(String imagePath, Promise promise) {
        try {
            File file = new File(imagePath);
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] imageBytes = new byte[(int) file.length()];
            fileInputStream.read(imageBytes);
            fileInputStream.close();
            
            String base64Image = Base64.encodeToString(imageBytes, Base64.NO_WRAP);
            promise.resolve(base64Image);
        } catch (IOException e) {
            promise.reject("Error encoding image", e);
        }
    }
}
