import * as test from './globals.js';

function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = join(['Hello', 'webpack'], ' ');

    dodododo.alert('Hmmm, this probably isn\'t a great idea...');

    // test();

    return element;
}

document.body.appendChild(component());
