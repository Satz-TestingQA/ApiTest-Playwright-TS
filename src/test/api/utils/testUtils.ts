import { APIRequestContext, APIResponse, expect, request as playwrightRequest } from '@playwright/test';
import * as fs from 'fs';
import { testConstants } from '../constants/constants';
import { BaseClass } from '../base/baseClass';
import { ProdData, QaData } from '../testData/testData';

let bookingId: string;
let request: APIRequestContext;
let response: any;
let config: any;
let data: any;
let token: string;
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });


export class Utils extends BaseClass {

    public async beforeAll() {
        try {
            if (process.env.RUN_ENV = testConstants.QaEnvironment) {
                config = JSON.parse(fs.readFileSync(testConstants.QaConfigFilePath, testConstants.Encoding));
                data = QaData;
            }
            else if (process.env.RUN_ENV = testConstants.ProdEnvironment) {
                config = JSON.parse(fs.readFileSync(testConstants.ProdConfigFilePath, testConstants.Encoding));
                data = ProdData;
            }
            request = await playwrightRequest.newContext();
            console.log(`Environment setup is completed`)
        }
        catch (error) {
            console.error('Error in beforeAll setup:', error)
        }

    }

    public async afterAll() {
        try {
            this.disposeRequest();
            console.log(`After all clean up is completed`)
        }
        catch (error) {
            console.error('Error in After all clean up:', error)
        }
    }

    public async postApiCallToCreateBooking() {
        try {
            response = await request.post(config.apiUrl, {
                data: config.requestBody,
                headers: config.headers
            });
            console.log(`Post call to create booking is completed`)
        }
        catch (error) {
            console.error('Error in creating booking:', error)
        }

    }

    public async verifyStatusAndStatusCode(response: APIResponse, statusCode: number) {
        try {
            expect(response.status()).toBe(statusCode);
            expect(response.ok()).toBeTruthy();
            console.log(`Validation on status code and status text is completed`)
        }
        catch (error) {
            console.error('Error in validation on status code and status text:', error)
        }

    }

    public async validateCreatedBooking() {
        await this.verifyStatusAndStatusCode(response, 200)
    }

    public async fetchBookingId() {
        try {
            bookingId = (await response.json()).bookingid;
            console.log(`After all clean up is completed and the booking is ${bookingId}`)
        }
        catch (error) {
            console.error('Error in fetching booking id:', error)
        }
    }

    public async retrieveDataOfCreatedBooking() {
        try {
            response = await request.get((config.apiUrl + bookingId));
            await this.verifyStatusAndStatusCode(response, 200)
            response = await response.json();
            console.log(`Retrieving the data of created booking is completed`)
        }
        catch (error) {
            console.error('Error in retrieving the data of created booking:', error)
        }
    }

    public async validateDataOfCreatedBooking() {
        try {
            expect(response).toHaveProperty(data.FirstName, data.FullName);
            expect(response).toHaveProperty(data.LastName, data.Surname);
            expect(response).toHaveProperty(data.AdditionalNeeds, data.AddNeeds);
            expect(response.bookingdates).toHaveProperty(data.CheckInDate, data.DateCheckIn);
            expect(response.bookingdates).toHaveProperty(data.CheckIOutDate, data.DateCheckout);
            console.log(`Validation of retrieving the data of created booking is completed`)
        }
        catch (error) {
            console.error('Error in validation of retrieving the data of created booking:', error)
        }

    }

    public async generateToken() {
        try {
            response = await request.post(config.tokenUrl, {
                headers: config.headers,
                data: config.tokenbody
            });
            console.log(`Generating access token is completed`)
        }
        catch (error) {
            console.error('Error in generating access token:', error)
        }

    }

    public async fetchingToken() {
        try {
            await this.verifyStatusAndStatusCode(response, 200)
            token = (await response.json()).token;
            console.log(token)
            console.log(`Validating token generation is completed and the token is ${bookingId}`)
        }
        catch (error) {
            console.error('Error in validating token generation:', error)
        }

    }

    public async updateDataOfCreatedBooking() {
        // Put api call to update the created booking
        response = await request.put((config.apiUrl + bookingId), {
            headers: this.buildHeaders(),
            data: config.putRequestBody
        });

        // Validateing status and status code of the put api call
        await this.verifyStatusAndStatusCode(response, 200)
    }

    public async validateUpdatedDataOfBooking() {
        // Validating the properties of the updated booking
        response = await response.json();
        expect(response).toHaveProperty(data.FirstName, data.UpdateFullName);
        expect(response).toHaveProperty(data.LastName, data.UpdateSurname);
        expect(response).toHaveProperty(data.AdditionalNeeds, data.UpdateAddNeeds);
    }

    public async partiallyUpdateBooking() {
        // Patch api call to partially update the created booking
        response = await request.patch((config.apiUrl + bookingId), {
            headers: this.buildHeaders(),
            data: config.patchRequestBody
        });
    }

    public async validatePartiallyUpdateBooking() {
        // Validating the properties of the partially updated booking
        await this.verifyStatusAndStatusCode(response, 200)
        response = await response.json();
        expect(response).toHaveProperty(data.FirstName, data.PatchFullName);
        expect(response).toHaveProperty(data.LastName, data.PatchSurname);
        expect(response).toHaveProperty(data.AdditionalNeeds, data.PatchAddNeeds);
    }

    public async deleteCreatedBooking() {
        // Delete api call to create a booking
        response = await request.delete((config.apiUrl + bookingId), {
            headers: this.buildHeaders()
        });
    }

    public async validateDeletedBooking() {
        await this.verifyStatusAndStatusCode(response, 201)
    }

    public async getDeletedBookingDetails() {
        // Get api call to retrive the data of deleted booking
        response = await request.get((config.apiUrl + bookingId));
    }

    public async validateDeletedBookingDetails() {
        await this.negativeScenarioStatusValidation(response, 404, data.NotFound)
    }

    public async createBookingWithInvalidHeaders() {
        response = await request.post(config.apiUrl, {
            headers: config.invalidHeaders,
            data: config.invalidRequestBody
        });
    }

    public async validateBookingWithInvalidHeaders() {
        await this.negativeScenarioStatusValidation(response, 500, data.ServerError)
    }

    public async updateCreatedBookingWithoutAccessToken() {
        // Put api call to update the created booking
        response = await request.put((config.apiUrl + bookingId), {
            headers: config.headers,
            data: config.requestBody
        });
    }

    public async validateCreatedBookingWithoutAccessToken() {
        await this.negativeScenarioStatusValidation(response, 403, data.Forbidden)
    }

    public async negativeScenarioStatusValidation(response: APIResponse, statusCode: number, statusText: string) {
        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(statusText);
    }

    public buildHeaders() {
        return {
            'Content-Type': 'application/json',
            "Cookie": `token=${token}`
        };
    }

    public async postRequestBody(jsonBody: any, firstName: string, lastName: string, extraBenefits: string) {
        return await this.stringFormat(JSON.stringify(jsonBody), firstName, lastName, extraBenefits);
    }

    public async stringFormat(str: string, ...args: any[]) {
        str.replace(/{(\d+)}/g, (match: any, index: any | number) => args[index].toString() || "");
    }
}
