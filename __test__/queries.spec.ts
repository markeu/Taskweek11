import supertest from "supertest";
import mongoose from "mongoose";
import server from "../app";

const request = supertest(server);

beforeAll((done) => {
  done();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("Test for query", () => {
  it("it should get all organizations from the database", (done) => {
    request
      .post("/graphql")
      .send({
        query: "{ organizations{ id, organization} }",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.organizations).toBeTruthy();
        expect(res.body.data.organizations.length).toBeGreaterThan(1);
        done();
      });
  });

  it("it should get one organziation from the database", (done) => {
    request
      .post("/graphql")
      .send({
        query: '{ organization(organization: "MTN Togo"){organization, id }}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.organization).toHaveProperty(
          "id",
          "5f6fbbc79234b94e396c7d1b"
        );
        expect(res.body.data.organization).toHaveProperty(
          "organization",
          "MTN Togo"
        );
        done();
      });
  });

  it("It should Login a registered user to the platform", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{loginUser(email: "freshyoo@gmail.com", password: "journals"){lastName, email}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.loginUser).toHaveProperty("lastName", "Herbert");
        expect(res.body.data.loginUser).toHaveProperty(
          "email",
          "freshyoo@gmail.com"
        );
        done();
      });
  });

  it("It should Create/ signup user to the platform", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{signUpUser(email: "charlytty@gmail.com", password: "journals", firstName: "Uche", lastName:"Mark"){lastName, email}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.signUpUser).toHaveProperty("lastName", "Mark");
        expect(res.body.data.signUpUser).toHaveProperty(
          "email",
          "charlytty@gmail.com"
        );
        done();
      });
  });

  it("It should Create a new organization to the platform", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{postOrganization(organization: "MTN Botswana", marketValue: "56%", address:"Lagos, Nigeria", ceo:"Uchay mark", employees: ["Naomi", "Confidence"], products:["shea-butter", "oil"]){address, organization, ceo}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.postOrganization).toHaveProperty(
          "address",
          "Lagos, Nigeria"
        );
        expect(res.body.data.postOrganization).toHaveProperty(
          "organization",
          "MTN Botswana"
        );
        expect(res.body.data.postOrganization).toHaveProperty(
          "ceo",
          "Uchay mark"
        );
        done();
      });
  });

  it("It should update a registered organization on the platform", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{ updateOrganization(organization: "MTN Mali", address:"PH, Nigeria", ceo:"Ikenna mark"){address, organization, ceo}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.updateOrganization).toHaveProperty(
          "address",
          "PH, Nigeria"
        );
        expect(res.body.data.updateOrganization).toHaveProperty(
          "organization",
          "MTN Mali"
        );
        expect(res.body.data.updateOrganization).toHaveProperty(
          "ceo",
          "Ikenna mark"
        );
        done();
      });
  });

  it("It should delete a registered organization on the platform", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{ deleteOrganizationByCompany(organization: "MTN Botswana"){address, organization, ceo}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.deleteOrganizationByCompany).toHaveProperty(
          "address",
          "Lagos, Nigeria"
        );
        expect(res.body.data.deleteOrganizationByCompany).toHaveProperty(
          "organization",
          "MTN Botswana"
        );
        expect(res.body.data.deleteOrganizationByCompany).toHaveProperty(
          "ceo",
          "Uchay mark"
        );
        done();
      });
  });

  it("It should delete a registered user from the database", (done) => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation{ deleteUserByEmail(email: "charlytty@gmail.com",){lastName, email}}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.deleteUserByEmail).toHaveProperty(
          "lastName",
          "Mark"
        );
        expect(res.body.data.deleteUserByEmail).toHaveProperty(
          "email",
          "charlytty@gmail.com"
        );
        done();
      });
  });
});
