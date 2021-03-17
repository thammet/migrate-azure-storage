#! /usr/bin/env node

const { program } = require('commander');
const create = require('./commands/create');
const migrate = require('./commands/migrate');

program
    .command('create [filename]')
    .option('-js', 'Create a javascript file', false)
    .description('create a new migration file')
    .action((filename, options) => create(filename, options.Js));

program
    .command('migrate')
    .description('run migrations')
    .action(() => migrate());

program.parse(process.argv);