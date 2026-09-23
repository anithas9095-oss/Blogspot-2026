const {test, expect} = require('@playwright/test');
const {BlogSpotPage} = require('../pages/BlogSpotPage');    
const data = require('../data/BlogSpot.json');

test.describe('BlogSpot', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    });

    test('validate title', async ({ page }) => {         
        await expect(page).toHaveTitle('Automation Testing Practice');
    });
    
    test('fill the form', async ({ page }) => {
        const blogSpotPage = new BlogSpotPage(page);
        await blogSpotPage.enterDetails(data.firstData);
        await blogSpotPage.staticTableValidation(data.StaticTableData.tableHeaders, data.StaticTableData.tableRowData);
    })

});