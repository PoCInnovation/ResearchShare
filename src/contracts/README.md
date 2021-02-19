# README - truffle

## Introduction

Truffle suite has been configured in order to test efficiently these contracts.

It has been configured in order to work with a local ganache network deployed on [http://localhost:8545](http://localhost:8545)

This file contains all the instruction which will allow you to test them yourself, on your own computer.

However we'll assume you already installed [Docker](https://docs.docker.com/engine/install/) ,[Docker Compose](https://docs.docker.com/compose/install/) and [Truffle Suite](https://www.trufflesuite.com/docs/truffle/getting-started/installation). If you have not already done so, please follow previous links to their respective installation instructions.

*N.B. : You don't need to install [ganache-cli](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) since we'll use a docker container (container info can be found [here](https://hub.docker.com/r/trufflesuite/ganache-cli/))*

## Instructions

First of all, you need to bring up ganache-cli container on your computer. In order to do that go to the root of the repository and enter the following commands :

```bash
docker-compose up --build -d ganache
```

*Launch ganache-cli container in background (be patient, it can take a while)*

```bash
cd src/contracts &&
truffle migrate
```

*Compile and deploy the contract to the local block-chain on localhost:8545*

Congratulation, you launched a local ganache chain and deploy our contract on it.

### Automated testing :`truffle test`

In order to run our truffle unit tests run the following command in your terminal :

```bash
truffle test
```

Truffle will look for change from last compilation and deployement and run the tests, displaying results.

### Manual testing :  `truffle console`

For more specific purpose, you can directly use ganache-cli instruction on your local blockchain. In this case run the command below in your terminal :

```test
truffle console
```

*<u>N.B. :</u> truffle develop will run a new local blockchain instead of connect to the one we previously created*

### Local created an account

In order to make your life easier we created an account full of test ETH in our local blockchain. His credentials may be found in `\<repository root>/src/contracts/account.json`, or just below :




```json
key: "e39c22ec859238b22a03b090a06b35185e2013f8c6ebbe50a7d112a391f421a7",
address: "0x1459ef1e422315b3772333E044F37BEed2FCeb02"
```

## Authors