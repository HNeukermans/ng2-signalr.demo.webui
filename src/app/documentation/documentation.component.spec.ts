import { inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { DocumentationComponent } from './documentation.component';
import { Title } from './title';
import { Observable } from 'rxjs/Observable';
import { SignalRConnectionMock } from 'ng2-signalr';
import { MockActivatedRoute } from './activated.route.mock';
import { Parameters } from './parameters';
import { BroadcastEvents } from './BroadcastEvents';

describe('Documentation', () => {

  let connectionMock = new SignalRConnectionMock();
  let activatedRouteMock = new MockActivatedRoute();
  activatedRouteMock.snapshot.data = { 'connection': connectionMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentationComponent,
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });
  });

  beforeEach(inject([DocumentationComponent], (documentation: DocumentationComponent) => {
    documentation.ngOnInit();
  }));

  it('init should observe connection errors and status',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      expect(connectionMock.errors$.observers.length).toBe(1);
      expect(connectionMock.status$.observers.length).toBe(1);
    }));

  it('getSpeakers() should invoke getCoreTeam',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

      component.getSpeakers();

      expect(connectionMock.invoke).toHaveBeenCalledWith('GetNgBeSpeakers');
    }));

  it('getSpeakers() should bind data to speakers',
    fakeAsync(inject([DocumentationComponent], (component: DocumentationComponent) => {

        const data = ['Igor'];
        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(data));

        component.getSpeakers();
        tick();
        expect(component.speakers).toBe(data);
      })));

  it('getCoreTeam() should invoke GetNgBeCoreTeam',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(['Jurgen']));

      component.getCoreTeam();

      expect(connectionMock.invoke)
        .toHaveBeenCalledWith('GetNgBeCoreTeam', jasmine.any(Parameters));
    }));

  it('getCoreTeam() should bind data to members',
    fakeAsync(inject([DocumentationComponent], (component: DocumentationComponent) => {

        const data = ['Jurgen'];
        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(data));

        component.getCoreTeam();
        tick();
        expect(component.members).toBe(data);
      })));

  it('invokeFailingMethod() should invoke ThrowException',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

        component.invokeFailingMethod();

        expect(connectionMock.invoke).toHaveBeenCalledWith('ThrowException');
      }));

  it('invokeFailingMethod() should log to console upon reject',
    fakeAsync(inject([DocumentationComponent], (component: DocumentationComponent) => {

        spyOn(connectionMock, 'invoke').and.returnValue(Promise.reject({}));
        spyOn(console, 'log');

        component.invokeFailingMethod();
        tick();

        expect(console.log).toHaveBeenCalled();
      })));

  it('chat() should invoke Chat with message',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

      component.message = 'My message';
      component.chat();

      expect(connectionMock.invoke)
        .toHaveBeenCalledWith('Chat', jasmine.objectContaining({ content: component.message }));
    }));

  it('stop() should stop the connection',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      spyOn(connectionMock, 'stop').and.callThrough();

      component.ngOnInit();
      component.stop();

      expect(connectionMock.stop).toHaveBeenCalled();
    }));

  fit('listenForMessages() should listen for broadcast event',
    inject([DocumentationComponent], (component: DocumentationComponent) => {

      spyOn(connectionMock, 'listen').and.callThrough();

      component.listenForMessages();

      expect(connectionMock.listen)
        .toHaveBeenCalledWith(jasmine.objectContaining({ event: BroadcastEvents.ON_MESSAGE_SENT }));

      expect(connectionMock.listeners[BroadcastEvents.ON_MESSAGE_SENT].observers.length)
        .toBe(1);

    }));

});
