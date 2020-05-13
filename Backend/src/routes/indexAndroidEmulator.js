const wdio = require("webdriverio");
var spawn = require('child_process').spawn;
 
// async function run(cmd, env, callback) {
//     if (!cmd) return callback();
//     var p = spawn('sh', ['-c', cmd], {
//         env: env,
//         stdio: 'inherit'
//     });
//     p.on('close', function (code) {
//         if (code !== 0) return callback(new Error('Command failed', code, cmd));
//         callback();
//     });
// }
 



const opts = {
   path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "8",
      deviceName: "Android Emulator",
      app: "/home/ec2-user/appium_test/ApiDemos-debug.apk",
      appPackage: "io.appium.android.apis",
      appActivity: ".view.TextFields",
      automationName: "UiAutomator2"
    }
  };


  process.on('message', (msg) => {
    console.log('Message from parent:', msg);
   main(msg)
   
  });
  
  async function main (msg) {
 
    setTimeout(() => {
      console.log('Data from parent',msg)
   
      // let res = await run('emulator -avd pixel2')
      const client = await wdio.remote(opts);
      
      const field = await client.$("android.widget.EditText");
      await field.setValue("Hello World!");
      const value = await field.getText();
      console.log('My reuslt is', assert.equal(value,"Hello World!"));
      
      setTimeout(() => {
        await process.send({ text: 'test done' });      
        await client.deleteSession();
      }, 15000);


    }, 1000);
  }
  
  