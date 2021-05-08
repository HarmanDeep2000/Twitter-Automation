const puppy = require("puppeteer");
const id = "bapijap915@httptuan.com";
const password = "gvdbiudiovhiovidlo85965878";
const username = "@bapijap";
const search1 = "#COVID19";

async function main() {
    let browser = await puppy.launch({
        headless : false,
        defaultViewport : false
    
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://twitter.com/login", {waitUntil : "networkidle2"});
    //Entering id and password and clicking login.
    await tab.type('input[name="session[username_or_email]"]',username);
    await tab.type('input[name="session[password]"]',password);
    await tab.click('div[data-testid="LoginForm_Login_Button"]');
    await tab.waitForSelector('input[data-testid="SearchBox_Search_Input"]', {visible : true});
    await tab.type('input[data-testid="SearchBox_Search_Input"]',search1, {delay:20});
    await tab.keyboard.press("Enter");
    //await tab.waitForSelector('a[class="css-4rbku5 css-18t94o4 css-1dbjc4n r-sdzlij r-1loqt21 r-1adg3ll r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg r-13qz1uu"]', {visible : true} );
    //await tab.click('a[class="css-4rbku5 css-18t94o4 css-1dbjc4n r-sdzlij r-1loqt21 r-1adg3ll r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg r-13qz1uu"]');
    
    // Scrolling 
    let authorsSet = new Set()
    try {
        let previousHeight;
        for (let i = 0; i < 5; i++) {
            const elementHandles = await tab.$$("a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-sdzlij.r-1loqt21.r-1adg3ll.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg.r-13qz1uu");
            const propertyJsHandles = await Promise.all(
                elementHandles.map(handle => handle.getProperty("href"))
            );
            const urls = await Promise.all(
                propertyJsHandles.map(handle => handle.jsonValue())
            );

            urls.forEach(item => authorsSet.add(item))

            previousHeight = await tab.evaluate("document.body.scrollHeight");
            await tab.evaluate("window.scrollTo(0, document.body.scrollHeight)");
            await tab.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            
        }
        
    } catch(e) {console.log(e); }
    
    console.log(authorsSet);


    // Visiting different twitter profiles and clicking on follow button and following button
    const urls = Array.from(authorsSet)
    for (let i = 0; i < urls.length; i++) {
        try {
            const url = urls[i];
            console.log(url);
            await tab.goto(`${url}`);

            await tab.waitFor(2000);
            //await tab.waitForSelector('div[class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]', {visible : true});
            await tab.click('div[class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]');
            await tab.click('a[class="css-4rbku5 css-18t94o4 css-901oao r-1fmj7o5 r-1loqt21 r-1qd0xha r-1inkyih r-16dba41 r-hbpseb r-bcqeeo r-qvutc0"]');
            await tab.click('a[class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-oucylx r-rull8r r-wgabs5 r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-uxrrfj r-1777fci r-1ny4l3l r-kq9wsh r-o7ynqc r-6416eg"]');
             // let followingbuttonurl = await tab.evaluate(function(ele){
            //  return ele.getAttribute("href");
            // },followingbutton);
            // await tab.goto(followingbuttonurl);
            //await tab.click('div[role="button"]');
            //await tab.waitForSelector('div[class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]', {visible : true});
           // await tab.waitFor(2000);
            await tab.goBack();

        }
        catch(error) {
            console.log(error);
        }
    }
    browser.close();
}   

main();

