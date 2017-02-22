import { Resolve } from '@angular/router';
import { SignalR, SignalRConnection, SignalRConnectionMock } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionResolver implements Resolve<SignalRConnectionMock> {

    constructor(private _signalR: SignalR) {}

    resolve() {
        console.log('HomeRouteResolver. Resolving...');
        return this._signalR.connect();
    }
}
