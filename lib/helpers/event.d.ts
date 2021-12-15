import { eventType } from '../interface/options';
export declare function stopEvent(event: any): void;
export declare function preventEvent(event: any): void;
export declare function bindEvent(target: Element | Window, eventName: eventType, cb: any): void;
export declare function unbindEvent(target: Element | Window, eventName: eventType, cb: any): void;
