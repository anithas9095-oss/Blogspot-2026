const { expect } = require('@playwright/test');
const path = require('path');
const filePath = path.resolve(__dirname, '../Files');

class BlogSpotPage{

    constructor(page){
        this.page = page;
        this.name = page.getByPlaceholder('Enter Name');
        this.email = page.getByPlaceholder('Enter EMail');  
        this.phone = page.locator(`#phone`);
        this.address = page.getByRole('textbox', { name: 'Address' });
        this.tableheader = page.getByText('Static Web Table');

    }

    selectGender(gender){
       return this.page.locator(`input[value="${gender}"]`);
    }

    async selectDays(days){
        for(var i=0; i<days.length; i++){
            await this.page.locator(`input[value="${days[i]}"]`).check();
        }
    }  
    
    async validateSelectedDays(days){
        for(var i=0; i<days.length; i++){
            await expect(this.page.locator(`input[value="${days[i]}"]`)).toBeChecked();
        }
    }

    async selectCountry(country){
        await this.page.locator('select#country').selectOption({ label: country });
    }   

    async selectColor(color){
        await this.page.locator('select#colors').selectOption({ label: color });
    }

    async uploadSingleFile(fileName){
        console.log("File Path: "+path.join(filePath, fileName));
        await this.page.setInputFiles('#singleFileInput', path.join(filePath, fileName));
    }   

    async uploadMultipleFiles(fileName1, fileName2){
        console.log("File Path 1: "+path.join(filePath, fileName1));
        console.log("File Path 2: "+path.join(filePath, fileName2));
        await this.page.setInputFiles('#multipleFilesInput', [path.join(filePath, fileName1), path.join(filePath, fileName2)]);
    }

    async enterDetails(data){
        await this.name.fill(data.name);
        await this.email.fill(data.email);
        await this.phone.fill(data.phone);
        await this.address.fill(data.address);
        await this.selectGender(data.gender).check();  
        await expect(this.selectGender(data.gender)).toBeChecked()
        await this.selectDays(data.days);
        await this.validateSelectedDays(data.days);
        await this.selectCountry(data.country);
        expect(await this.page.locator('select#country').inputValue()).toBe(data.country.toLowerCase());
        await this.selectColor(data.color);
        await expect(await this.page.locator('select#colors').inputValue()).toBe(data.color.toLowerCase());
        await this.uploadSingleFile(data.fileName);
        await this.uploadMultipleFiles(data.fileName1, data.fileName2);
        await this.shadowDomValidation(data.fileName);
    }

    async staticTableValidation(header,data){
        expect(await this.tableheader.isVisible()).toBeTruthy();
        expect(await this.tableheader.textContent()).toBe('Static Web Table'); 
        await this.tableHeadersValidation(header);
        await this.tableRowDataValidation(data);
    }
    
    async tableHeadersValidation(header){
        for(var i=0; i<header.length; i++){
            const headerText = await this.page.locator(`table[name='BookTable'] tr th`).nth(i).textContent();
            console.log("Header Text: "+headerText);
            expect(headerText).toBe(header[i]);
        }
    }

    async tableRowDataValidation(data){
        const rowCount = await this.page.locator(`table[name='BookTable'] tr`).count();
        console.log("Row Count: "+rowCount);
       
        for(var i=1; i<rowCount; i++){
            const rowData = await this.page.locator(`table[name='BookTable'] tr`).nth(i).locator('td');
            const rowDataCount = await rowData.count();
            console.log("Row Data Count: "+rowDataCount);
                console.log("1st loop index: "+i);

                const cellData = await this.page.locator(`table[name='BookTable'] tr`).nth(i).locator('td');
                
                const BookName = await cellData.nth(0).textContent();
                console.log("Book Name: "+BookName);
                expect(BookName).toEqual(data[i-1].BookName);

                const Author = await cellData.nth(1).textContent();
                console.log("Author: "+Author);
                expect(Author).toEqual(data[i-1].Author);

                const Subject = await cellData.nth(2).textContent();
                console.log("Subject: "+Subject);   
                expect(Subject).toEqual(data[i-1].Subject);

                const Price = await cellData.nth(3).textContent();
                console.log("Price: "+Price);
                expect(Price).toEqual(data[i-1].Price);  
        }
    }

    async shadowDomValidation(fileName){
        await this.page.locator("input[type='file'] ").last().setInputFiles(path.join(filePath, fileName));
    }
    

}

module.exports = {BlogSpotPage};