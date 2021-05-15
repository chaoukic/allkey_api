-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-05-15 05:52:46.385

-- tables
-- Table: Contract
CREATE DATABASE  IF NOT EXISTS AllKey;
CREATE USER 'mainLogin'@'localhost' IDENTIFIED BY 'ncw7:!ZPM3A)A4"b';
GRANT ALL PRIVILEGES ON AllKey.* TO 'mainLogin';


CREATE TABLE Contract (
    id int NOT NULL,
    Contractors_id int NOT NULL,
    Tenants_id int NOT NULL,
    Estimation decimal(7,2) NOT NULL,
    Cause varchar(255) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    LandLords_id int NOT NULL,
    CONSTRAINT Contract_pk PRIMARY KEY (id)
);

-- Table: Contractor_Type
CREATE TABLE Contractor_Type (
    id int NOT NULL,
    type varchar(255) NOT NULL,
    CONSTRAINT Contractor_Type_pk PRIMARY KEY (id)
);

-- Table: Contractors
CREATE TABLE Contractors (
    id int NOT NULL,
    Contractor_Type_id int NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,
    Phonenumber varchar(255) NOT NULL,
    Addrerss varchar(255) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    CONSTRAINT Contractors_pk PRIMARY KEY (id)
);

-- Table: LandLords
CREATE TABLE LandLords (
    id int NOT NULL,
    Firstname varchar(255) NOT NULL,
    Lastname varchar(255) NOT NULL,
    Phonenumber varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    CONSTRAINT LandLords_pk PRIMARY KEY (id)
);

-- Table: Property
CREATE TABLE Property (
    id int NOT NULL,
    Address varchar(255) NOT NULL,
    PostalCode varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    Country varchar(255) NOT NULL,
    Rent decimal(7,2) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    Tenants_id int NOT NULL,
    LandLords_id int NOT NULL,
    CONSTRAINT Property_pk PRIMARY KEY (id)
);

-- Table: Tenants
CREATE TABLE Tenants (
    id int NOT NULL,
    Firstname varchar(255) NOT NULL,
    Lastname varchar(255) NOT NULL,
    Phonenumber varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    CONSTRAINT Tenants_pk PRIMARY KEY (id)
);

-- Table: Transaction_Rent
CREATE TABLE Transaction_Rent (
    id int NOT NULL,
    Property_id int NOT NULL,
    Tenants_id int NOT NULL,
    Price decimal(7,2) NOT NULL,
    IsPaid boolean NOT NULL,
    Paid_at timestamp NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    CONSTRAINT Transaction_Rent_pk PRIMARY KEY (id)
);

-- Table: Transactions
CREATE TABLE Transactions (
    id int NOT NULL,
    Contract_id int NOT NULL,
    Payment_type varchar(255) NOT NULL,
    Amount decimal(7,2) NOT NULL,
    Note varchar(255) NOT NULL,
    Created_at timestamp NOT NULL,
    Updated_at timestamp NOT NULL,
    CONSTRAINT Transactions_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Contract_Contractors (table: Contract)
ALTER TABLE Contract ADD CONSTRAINT Contract_Contractors FOREIGN KEY Contract_Contractors (Contractors_id)
    REFERENCES Contractors (id);

-- Reference: Contract_LandLords (table: Contract)
ALTER TABLE Contract ADD CONSTRAINT Contract_LandLords FOREIGN KEY Contract_LandLords (LandLords_id)
    REFERENCES LandLords (id);

-- Reference: Contract_Tenants (table: Contract)
ALTER TABLE Contract ADD CONSTRAINT Contract_Tenants FOREIGN KEY Contract_Tenants (Tenants_id)
    REFERENCES Tenants (id);

-- Reference: Contractors_Contractor_Type (table: Contractors)
ALTER TABLE Contractors ADD CONSTRAINT Contractors_Contractor_Type FOREIGN KEY Contractors_Contractor_Type (Contractor_Type_id)
    REFERENCES Contractor_Type (id);

-- Reference: Property_LandLords (table: Property)
ALTER TABLE Property ADD CONSTRAINT Property_LandLords FOREIGN KEY Property_LandLords (LandLords_id)
    REFERENCES LandLords (id);

-- Reference: Property_Tenants (table: Property)
ALTER TABLE Property ADD CONSTRAINT Property_Tenants FOREIGN KEY Property_Tenants (Tenants_id)
    REFERENCES Tenants (id);

-- Reference: Transaction_Rent_Property (table: Transaction_Rent)
ALTER TABLE Transaction_Rent ADD CONSTRAINT Transaction_Rent_Property FOREIGN KEY Transaction_Rent_Property (Property_id)
    REFERENCES Property (id);

-- Reference: Transaction_Rent_Tenants (table: Transaction_Rent)
ALTER TABLE Transaction_Rent ADD CONSTRAINT Transaction_Rent_Tenants FOREIGN KEY Transaction_Rent_Tenants (Tenants_id)
    REFERENCES Tenants (id);

-- Reference: Transactions_Contract (table: Transactions)
ALTER TABLE Transactions ADD CONSTRAINT Transactions_Contract FOREIGN KEY Transactions_Contract (Contract_id)
    REFERENCES Contract (id);

-- End of file.

