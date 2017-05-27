class Strings {
    /**
     * Pads an specified number of characters before a specified mixed var
     * @param  {var}    mixed       String to be padded
     * @param  {number} [count]     number of characters to be inserted before the mixed var
     * @param  {string} [character] character to be inserted
     * @return {string} Mixed var padded with characters at the beginning
     */
    static pad (mixed, count, character) {
        count = count || 4;
        character = character || '0';
        mixed = "" + mixed;
        var pad = new Array( count + 1 ).join( character );
        return pad.substring(0, pad.length - mixed.length) + mixed;
    }

    static repeat (mixed, count) {
        return new Array( count + 1 ).join( mixed );
    }

    /**
     * Clean a string of undesired white spaces at the end and beginning
     * @param  {string} s The string to be processed
     * @return {string}   The clean string
     */
    static clean (s) {
        return ('string' != typeof s) ? '' : s.trim();
    }
}

module.exports = Strings;