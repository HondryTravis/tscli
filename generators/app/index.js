'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require("mkdirp");
const path = require("path");

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the mind-blowing local ${chalk.rgb(30,144,255)('tscli')} generator!`)
    );
    // Inquiry module
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please input you project name:',
        default: 'example'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input you project description:',
        default: 'a simple typescript project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please input your\'s Name:',
        default: 'example'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Please input your\'s Email:',
        default: 'example@outlook.com'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Please input you project init version',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'structure',
        message: 'Please input you project structure tools:',
        default: 'gulp/webpack/rollup'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\n Your generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }
  // wirting somthing
  writing() {
    this.log('\nWriting...\n');
    this._loadConfig();
    this._loadPackage();
    this._loadIndexTemplate();
    this._loadSource();
    this._loadTsconfig();
    this._loadReadMe();
    this._loadEditorConfig();
    this._loadGitIgnoreFile();
    this._loadGitAttrFile();
  }
  _loadConfig() {
    this.fs.copyTpl(
      this.templatePath(`config/${this.props.structure}`),
      this.destinationPath(`config/${this.props.structure}`)
    );
  }
  _loadPackage() {
    let devDependencies = {}
    devDependencies.gulp = [
      "gulp",
      "gulp-cli",
      "gulp-watch",
      "gulp-less",
      "del",
      "pump",
      "browser-sync",
      "rollup",
      "rollup-plugin-typescript",
      "rollup-plugin-typescript2",
      "typescript"
    ];
    devDependencies.rollup = [
      "rollup",
      "rollup-plugin-typescript",
      "rollup-plugin-typescript2",
      "typescript"
    ];
    devDependencies.webpack = [
      "clean-webpack-plugin",
      "html-webpack-plugin",
      "uglifyjs-webpack-plugin",
      "mini-css-extract-plugin",
      "typescript",
      "webpack",
      "webpack-cli",
      "webpack-dev-server",
      "webpack-merge",
      "css-loader",
      "style-loader",
      "node-sass",
      "sass-loader",
      "ts-loader",
      "file-loader"
    ]
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
        version: this.props.version,
      }
    );

    this.npmInstall(devDependencies[this.props.structure], {
      'save-dev': true
    })
  }
  _loadIndexTemplate() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`index.html`),
      {
        name: this.props.name
      }
    );
  }
  _loadSource () {

      this.fs.copyTpl(
        this.templatePath(`src`),
        this.destinationPath(`src`)
      );

  }
  _loadTsconfig() {
    this.fs.copyTpl(
      this.templatePath(`tsconfig.json`),
      this.destinationPath(`tsconfig.json`)
    );
  }
  _loadReadMe() {
    this.fs.copyTpl(
      this.templatePath(`README.md`),
      this.destinationPath(`README.md`)
    );
  }
  _loadEditorConfig() {
    this.fs.copyTpl(
      this.templatePath(`.editorconfig`),
      this.destinationPath(`.editorconfig`)
    );
  }
  _loadGitIgnoreFile() {
    this.fs.copyTpl(
      this.templatePath(`.gitignore`),
      this.destinationPath(`.gitignore`)
    );
  }
  _loadGitAttrFile() {
    this.fs.copyTpl(
      this.templatePath(`.gitattributes`),
      this.destinationPath(`.gitattributes`)
    );
  }
  install() {
    this.npmInstall();
  }
  end() {
    this.log('everything is already~ :D')
  }
};
