CREATE DATABASE Maintenance;
CREATE DATABASE Payment;
CREATE DATABASE Property;
CREATE DATABASE Users;

CREATE USER mainLogin WITH ENCRYPTED PASSWORD 'ncw7:!ZPM3A)A4"b';
GRANT ALL PRIVILEGES ON DATABASE Maintenance TO mainLogin;
GRANT ALL PRIVILEGES ON DATABASE Payment TO mainLogin;
GRANT ALL PRIVILEGES ON DATABASE Property TO mainLogin;
GRANT ALL PRIVILEGES ON DATABASE Users TO mainLogin;


\c property;
-- Table: Property
CREATE SEQUENCE Property_seq;

CREATE TABLE Property (
    id int PRIMARY KEY  NOT NULL DEFAULT NEXTVAL ('Property_seq'),
    landOwnerID int  NOT NULL,
    tenantsID int  NOT NULL,
    Address varchar(255)  NOT NULL,
    PostalCode varchar(255)  NOT NULL,
    City varchar(255)  NOT NULL,
    Country varchar(255)  NOT NULL,
    Rent decimal(7,2)  NOT NULL,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP);


\c maintenance; 
-- tables
-- Table: Contract
CREATE SEQUENCE Maintenance_seq;

CREATE TABLE Maintenance (
    id int PRIMARY KEY NOT NULL DEFAULT NEXTVAL ('Maintenance_seq'),
    landOwnerID int  NOT NULL,
    contractorID int  NOT NULL,
    tenantsID int  NOT NULL,
    estimation decimal(7,2)  NOT NULL,
    cause varchar(255)  NOT NULL,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP
);


\c users;
-- Table: Contractor_Type
CREATE SEQUENCE Contractor_Type_seq;

CREATE TABLE Contractor_Type (
    id int PRIMARY KEY  NOT NULL DEFAULT NEXTVAL ('Contractor_Type_seq'),
    type varchar(255)  NOT NULL
);

-- Table: Contractors
CREATE SEQUENCE Contractors_seq;

CREATE TABLE Contractors (
    id int PRIMARY KEY NOT NULL DEFAULT NEXTVAL ('Contractors_seq'),
    Contractor_Type_id int  NOT NULL,
    Email varchar(255)  NOT NULL,
    Password varchar(255)  NOT NULL,
    Name varchar(255)  NOT NULL,
    Phonenumber varchar(255)  NOT NULL,
    Address varchar(255)  NOT NULL,
    PhoneVerification boolean NOT NULL DEFAULT FALSE,
    AdminVerification boolean NOT NULL DEFAULT FALSE,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);

-- Table: Land Owners
CREATE SEQUENCE LandLords_seq;

CREATE TABLE LandLords (
    id int PRIMARY KEY  NOT NULL DEFAULT NEXTVAL ('LandLords_seq'),
    Firstname varchar(255)  NOT NULL,
    Lastname varchar(255)  NOT NULL,
    Phonenumber varchar(255)  NOT NULL,
    Email varchar(255)  NOT NULL,
    Password varchar(255)  NOT NULL,
    PhoneVerification boolean NOT NULL DEFAULT FALSE,
    AdminVerification boolean NOT NULL DEFAULT FALSE,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);


-- Table: Tenants
CREATE SEQUENCE Tenants_seq;

CREATE TABLE Tenants (
    id int PRIMARY KEY NOT NULL DEFAULT NEXTVAL ('Tenants_seq'),
    Firstname varchar(255)  NOT NULL,
    Lastname varchar(255)  NOT NULL,
    Phonenumber varchar(255)  NOT NULL,
    Email varchar(255)  NOT NULL,
    Password varchar(255)  NOT NULL,
    PhoneVerification boolean NOT NULL DEFAULT FALSE,
    AdminVerification boolean NOT NULL DEFAULT FALSE,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contractor_type (type) VALUES ('Electrician');
INSERT INTO contractor_type (type) VALUES ('Plumber');
INSERT INTO contractor_type (type) VALUES ('Inspector');
INSERT INTO contractor_type (type) VALUES ('Plumber');
INSERT INTO contractor_type (type) VALUES ('Snow Remover');




\c payment;
-- Table: Transaction_Rent
CREATE SEQUENCE transactionRent_seq;

CREATE TABLE transactionRent (
    id int PRIMARY KEY  NOT NULL DEFAULT NEXTVAL ('transactionRent_seq'),
    Property_id int  NOT NULL,
    tenantsID int  NOT NULL,
    Amount decimal(7,2)  NOT NULL,
    IsPaid boolean  NOT NULL,
    Paid_at timestamp(0)  NOT NULL,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP);

-- Table: Transactions
CREATE SEQUENCE transactionContract_seq;

CREATE TABLE transactionContract (
    id int PRIMARY KEY  NOT NULL DEFAULT NEXTVAL ('transactionContract_seq'),
    Contract_id int  NOT NULL,
    Payment_type varchar(255)  NOT NULL,
    Amount decimal(7,2)  NOT NULL,
    Note varchar(255)  NOT NULL,
    IsPaid boolean  NOT NULL,
    created_at timestamp(0)  DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(0) DEFAULT CURRENT_TIMESTAMP);

