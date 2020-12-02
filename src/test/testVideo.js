let page, browser;
const Recorder = require("../recorder/record");
const puppeteer = require("puppeteer");
let record = new Recorder("videoTest","C:/Users/Owner/Desktop/yoni/e2e-tests-video-recorder/results");
        
beforeAll(() => {
    record.start();
});
afterAll(()=> {
    record.stop();
});

describe("Video test", () => {
    it("should get the page", async () => {
        browser = await puppeteer.launch({executablePath: "", h});
        page = await browser.newPage();
        await page.goto('https://example.com');
    });

    it("Should fail", async () => {
        
    });

    it("Should fail", async () => {
        
    });
});