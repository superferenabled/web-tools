export declare class Strings {
    /**
     * Pads an specified number of characters before a specified mixed var
     * @param  {var}    mixed       String to be padded
     * @param  {number} [count]     number of characters to be inserted before the mixed var
     * @param  {string} [character] character to be inserted
     * @return {string} Mixed var padded with characters at the beginning
     */
    static pad(mixed: any, count: any, character: any): string;
    static repeat(mixed: any, count: any): string;
    /**
     * Clean a string of undesired white spaces at the end and beginning
     * @param  {string} s The string to be processed
     * @return {string}   The clean string
     */
    static clean(s: any): string;
}
