import { eventType } from '../interface/options';
export declare function bindEvent(target: Element | Window, eventName: eventType, cb: any): void;
export declare function unbindEvent(target: Element | Window, eventName: eventType, cb: any): void;
