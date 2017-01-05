/* jslint node: true, strict:implied, esversion: 6 */

const onError = require('mk-log/lib/mk-on-error'),
    fs = require('fs');

function buildMatcher(patterns) {

    let splitted = patterns.split(/\s*,\s*/);
    let matcher = [];

    for (let i = 0, l = splitted.length; i < l; i++) {
        let pattern = splitted[i];
        pattern = pattern.replace('.', '\\.');
        pattern = pattern.replace('*', '.*');
        matcher.push(pattern);
    }

    var result = matcher.join('|');

    return new RegExp(result);

}

/**
 * list files in a directory as promise
 * @param  {String} directory the directory path
 * @param  {String} patterns  the simple search patterns comma separated
 * @return {Promise}          returning a promise resoving to file list
 */
function listDir(directory, patterns) {

    let matcher;

    if (patterns) {
        matcher = buildMatcher(patterns);
    }

    return new Promise(function(resolve, reject) {

        let result = [];

        fs.readdir(directory, function(err, files) {

            if(err) {
                reject(err);
            }

            for (var i = 0, l = files.length; i < l; i++) {

                var file = files[i];

                if (patterns) {

                    if (file.match(matcher)) {
                        result.push(file);
                    }

                } else {
                    result.push(file);
                }

            }

            resolve({status: 'success', files: result});

        });

    }).catch(onError);
}

module.exports = listDir;
