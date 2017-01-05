/* jslint node: true, strict:implied, esversion: 6 */

const tape = require('tape'),
    onError = require('mk-log/lib/mk-on-error'),
    path = require('path'),
    testDir = path.join(path.resolve('./', 'test/playground')),
    listDir = require('../index');


tape('list all files without pattern', function(t) {

    async function run() {

        t.plan(2);

        let result = await listDir(testDir);

        t.equal('success', result.status);
        t.equal(3, result.files.length);

        t.end();

    }

    run().catch(onError);

});

tape('list all files by wildard', function(t) {

    async function run() {

        t.plan(2);

        let result = await listDir(testDir, '*.*');

        t.equal('success', result.status);
        t.equal(3, result.files.length);

        t.end();

    }

    run().catch(onError);

});

tape('lista doc files', function(t) {

    async function run() {

        t.plan(2);

        let result = await listDir(testDir, '*.doc');

        t.equal('success', result.status);
        t.equal(1, result.files.length);

        t.end();

    }

    run().catch(onError);

});

tape('lista doc and csv files', function(t) {

    async function run() {

        t.plan(2);

        let result = await listDir(testDir, '*.doc,*.csv');

        t.equal('success', result.status);
        t.equal(2, result.files.length);

        t.end();

    }

    run().catch(onError);

});
