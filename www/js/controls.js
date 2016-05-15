/**
 * @fileoverview Configuration file for keyboard controls.
 */

var ace = ace || {};

/** Maps controller buttons to one or more keyboard keys */
ace.controls = {
    'A': ['x', 'l', ace.KEY_SPACE],
    'B': ['z', 'k'],
    'Start': [ace.KEY_ENTER],
    'Left': ['a', ace.KEY_LEFT],
    'Right': ['d', ace.KEY_RIGHT],
    'Up': ['w', ace.KEY_UP],
    'Down': ['s', ace.KEY_DOWN],
    'ToggleCamera': ['c'],
    'TurnLeft': ['i'],
    'TurnRight': ['o'],
};
