const {test,expect} = require('@playwright/test');
const {newPage} = require('../pages/new');
const data = require('../data/new.json');

test.describe('Automation Practice Suite', () => {
    // test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    })

    test('validations', async ({page}) =>{
        const newpage = new newPage(page);
        await newpage.fillForm(data.personalData);
        await newpage.validateAlert();
    })

    test('validate alert', async ({page}) =>{
        const newpage = new newPage(page);
        await newpage.validateAlert();

    })

})
