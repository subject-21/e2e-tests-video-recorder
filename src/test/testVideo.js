/** @type {import("puppeteer").Page} */
let page, browser;
const puppeteer = require("puppeteer");
const Recorder = require("../recorder/record");
const rec = new Recorder("videoTest", "C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results");

describe("Video test", () => {
    beforeAll(() => {
        rec.start();
    });
    afterAll(() => {
        //rec.stop();
    })
    it("should get the page", async () => {
        browser = await puppeteer.launch({ executablePath: "C:/Users/Neili/AppData/Local/Google/Chrome/Application/chrome.exe", headless: false });
        const pages = await browser.pages();
        page = await pages[0];
        await page.goto("https://www.google.com");
        await page.waitForSelector("[name='q']");
    });

    it("search", async () => {
        await page.type("[name='q']", "QA");
        await page.keyboard.press("Enter");
        await page.waitForNavigation({waitUntil: "load"});
    });

    it("Should fail", async () => {
        const element = await page.$("#result-stats");
        const text = await page.evaluate(ele => ele.textContent, element);
        expect(text).toContain("cat");
    });
});