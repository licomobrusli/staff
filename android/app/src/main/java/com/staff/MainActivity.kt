package com.staff

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView
import android.os.Bundle

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "staff"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null) // Correct this line, ensure onCreate is properly closed
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }
    }
}
