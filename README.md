This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This guide explains: 

- Setup development environment for cloud database application 
- Compile and run the application
- Build the application 
- Deploy the application 
- FAQs

## Table of Contents

- [Instructions](#instructions)
- [Setup Dev Environment](#setup-dev-environment)
- [Compile and run the application](#compile-run)
- [Build the application](#deploy)
- [FAQs](#faq)

## Instructions

- Setup development environment for cloud database application 
- Compile and run the application
- Build the application 
- Deploy the application 
- FAQs
  

## Setup Dev Environment

1) Install <b>NodeJS v14.18 (32-bit)</b> specifically. 

    <i>Note: 32-bit is required because CapnoTrainer 5.0 DLL are compiled for 32 bit and won't work with x64-bit. Also this limits the Node process to 2-GB memory usage as oppose to 64-bit that can go as high as 16 GB (or more possibily, not that your process should consume 16GB).</i>

2) You may also need to install the <b>vue-cli v4.5.9</b>
3) Please note that <b> ElectronJS </b> is downloaded locally using the npm package.

4) For ease-of-coding, you should also download VSCode, its Github extension, and Vuetr within the VS Code extensions for code-highligthing the <i>.vue</i> files in VS Code.

5) You also need to install <b> node-gyp v8.2.0 </b> using the npm globally (system-wise) as follows: 

```node
$ npm install node-gyp@8.2.0 -g 
```

5) Test the environment. Open the terminal / powershell / cmd and type the following: 

```bash
$ node -v
v14.18.1

$ npm -v 
6.14.17 

$ node-gyp.cmd -v # On Mac/Linux, use `node-gyp -v`
v8.2.0 
```