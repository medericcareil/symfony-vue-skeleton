import { MiddlewareContext } from "../middleware-type";

/**
 * An exemple of guard method
 * @param {MiddlewareContext} context 
 */
export default function exempleGuard(context: MiddlewareContext): void {
    // Some logic here
    console.log('Your guard logic');
}
