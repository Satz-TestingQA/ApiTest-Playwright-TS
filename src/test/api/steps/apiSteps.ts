import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { APIRequestContext, expect, request as playwrightRequest } from '@playwright/test';
import * as fs from 'fs';


// import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { Utils } from '../utils/testUtils'
import { BaseClass } from '../base/baseClass';


let apiUrl: string;
let userid: string;
let request: APIRequestContext;
let response: any;
let config: any;

let utils = new Utils();

// Load config data from config.json
BeforeAll(async () => {
    await utils.beforeAll();
});

AfterAll(async () => {
    await utils.afterAll();
});

Scenario: "Performing CRUD operations with POST, GET, PUT, PATCH & DELETE requests using request chaining"

Given('Creating a booking using POST api request', async function () {
    await utils.postApiCallToCreateBooking();
});

Then('Validating the data of created booking', async function () {
    await utils.validateCreatedBooking();
});

Then('Fetching the booking booking id', async function () {
    await utils.fetchBookingId();
});

Given('Retrieving the data of created booking using GET api request', async function () {
    await utils.retrieveDataOfCreatedBooking();
});

Then('Validating the retrieved booking data', async function () {
    await utils.validateDataOfCreatedBooking();
});

Given('Generating access token using POST api request', async function () {
    await utils.generateToken();
});

Then('Validate and fetch the generated token', async function () {
    await utils.fetchingToken()
});

Given('Updating the created booking using PUT api request', async function () {
    await utils.updateDataOfCreatedBooking();
});

Then('Validate the updated booking data', async function () {
    await utils.validateUpdatedDataOfBooking();
});

Given('Updating partially the created booking using PATCH api request', async function () {
    await utils.partiallyUpdateBooking();
});

Then('Validate the partially updated booking data', async function () {
    await utils.validatePartiallyUpdateBooking();
});

Given('Deleting a booking using DELETE api request', async function () {
    await utils.deleteCreatedBooking();
});

Then('Validate the status delete api call', async function () {
    await utils.validateDeletedBooking();
});

Scenario: Negative : "Get details of deleted booking"

Given('Retrieving the data of deleted booking using GET api request', async function () {
    await utils.getDeletedBookingDetails();
});

Then('Validate the status of retrieved deleted booking', async function () {
    await utils.validateDeletedBookingDetails()
});

Scenario: Negative : "Create a new booking with invalid headers"

Given('Creating a booking with invalid booking headers using POST api request', async function () {
    await utils.createBookingWithInvalidHeaders();
});

Then('Validate the status of post api call with invalid headers', async function () {
    await utils.validateBookingWithInvalidHeaders();
});

Scenario: Negative : "Update the created booking without token"

Given('Updating the created booking without token using PUT api request', async function () {
    await utils.updateCreatedBookingWithoutAccessToken();
});

Then('Validate the status of post put call without token', async function () {
    await utils.validateCreatedBookingWithoutAccessToken();
});

