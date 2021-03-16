# Versions

## Table of Content

- [Introduction](#introduction)
- [First Iteration](#first-iteration---proof-of-concept)
- [Second Iteration (going on)](#second-iteration---improving-the-poc)


## Introduction
The goal of this document to retrace the evolution of the project.

Each section will be formatted in the same way, following this pattern:
  - Time period.
  - Contributors.
  - Goals.
  - Work done.
  - Luca's & the team's view on wave (when it's over). 

> **Note**: While the project has the status of Proof of Concept it will not have formal versioning, however as it's 
currently bound to [**PoC**]() we can define a **version** (or **iteration**) as a wave of project.
**PoC** gives projects to its residents by waves of a length of 5 to 6 months, where the residents work in sprints.


## First Iteration - Proof of Concept

  - **Time period**: mid March to the end of August 2021.
  - **Contributors**:
    - [Alexandre Chetrit](https://github.com/chetrit)
    - [Matthis Cusin](https://github.com/Basilarc)
    - [Quentin Veyrenc](https://github.com/VrncQuentin)


  - **Goals**:
    - [x] First drafts of the architecture.
      - [x] Draft of the [users management](./doc/Technical/UsersManagement/UsersManagement.md).
      - [x] Draft of the [submission process](./doc/Technical/SubmissionProcess/SubmissionProcess.md).
      - [x] Draft of the [review system]().
    - [x] Implements said drafts as smart contracts.
    - [x] Implements storage on IPFS.
    - [x] Build a basic front to show what's implemented.


  - **Work done**: 
    - [Draft of the process to submit a paper](doc/Technical/SubmissionProcess/SubmissionProcess.md).
    - [Draft of the Contracts](./doc/ContractsDiagrams).
    - Upload a file to IPFS & save its hash via the contracts.
    - Begin the implementations of the contracts.
      - User registration (linked the to the contracts).
      - Submit/retrieve a paper.
      - Find reviewers (the best algorithm out there: random).
      - Submit a review.
      - Unit tests for every contract.
    - Very basic front proving components for the features we implemented
    - Extensive documentation.


## Second Iteration - Improving the PoC

  - **Time period**: mid March to the end of August 2021. (**going on**) 
  - **Contributors**:
    - [Adina Cazalens]()
    - [Alexandre Monier](https://github.com/ThalusA)
    - [Lucie Philippon](https://github.com/Ersikan)


  - **Goals**:
    - [ ] Define a proper way to select Reviewers for a paper & implement it.
    - [ ] Improve the submission process.
    - [ ] Improve users management.
    - [ ] Possibly, improve the way we use IPFS.
    - [ ] Possibly, improve the front.


  - **Work done**: