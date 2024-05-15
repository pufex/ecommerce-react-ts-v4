const digits = new Array(10).fill(".").map((_, i) => i.toString())
const uppercase = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
const lowercase = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 97 + i ) );

export const digitsWithCharsArray = [...digits, ...uppercase, ...lowercase];