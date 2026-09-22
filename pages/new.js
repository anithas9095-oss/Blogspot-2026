const { expect } = require('@playwright/test');

class newPage{

    constructor(page){
        this.page = page;
        this.heading = page.locator('#header h1');
        this.txtName = page.getByPlaceholder('Enter Name');
        this.radioFemale = page.getByLabel('Female');
        this.btnSimpleAlert = page.locator('#alertBtn');
        this.btnConfirmAlert = page.getByRole('button',{name:'Confirmation Alert'});
    }

    async fillForm(data){
        const headingText = await this.heading.textContent();
        await this.txtName.fill(data.name);
        await this.radioFemale.check();
    }
    async validateAlert() {
        // Set up listener before triggering the event
        this.page.on('dialog', async dialog => {
            console.log(`Dialog message: ${await dialog.message()}`);
            expect(await dialog.message()).toBe('I am an alert box!');
            await dialog.accept();
        });
        // Trigger the dialog
        await this.btnSimpleAlert.click();
        
    }
    
}
module.exports = {newPage};