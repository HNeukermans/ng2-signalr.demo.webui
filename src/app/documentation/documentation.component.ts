import { Component } from '@angular/core';
import { SignalRConnection, ConnectionStatus, BroadcastEventListener } from 'ng2-signalr';
import { ActivatedRoute } from '@angular/router';
import { Parameters } from './parameters';
import { ChatMessage } from './chat.message';
import { BroadcastEvents } from './BroadcastEvents';
import { Subscription } from 'rxjs/Subscription';
import Rx from 'rxjs/Rx';

@Component({
  selector: 'documentation',
  providers: [],
  styleUrls: ['./documentation.component.css'],
  templateUrl: './documentation.component.html'
})
export class DocumentationComponent {
  localState = { value: '' };
  speakers: string[] = [];
  members: string[] = [];
  errors: any[] = [];
  statuses: ConnectionStatus[] = [];
  message: string = '';
  subscription: Subscription = null;
  subscription2: Subscription = null;
  subscription3: Subscription = null;
  chatMessages: ChatMessage[] = [];
  chatMessagesWithStatus: [ChatMessage, ConnectionStatus][] = [];
  connection: SignalRConnection;

  constructor(
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.connection = this.route.snapshot.data['connection'];

    if (this.connection == null)
      throw new Error('Failed to initialize HomeComponent. Connection is null');
  }

  getSpeakers(): void {
    this.connection.invoke('GetNgBeSpeakers').then((data: string[]) => {
      this.speakers = data;
    });
  }

  getCoreTeam(): void {
    this.connection.invoke('GetNgBeCoreTeam', new Parameters()).then((data: string[]) => {
      this.members = data;
    });
  }

  invokeFailingMethod(): void {
    this.connection.invoke('ThrowException').catch((error) => {
      console.log(error);
    });
  }


  stop(): void {
    this.connection.stop();
  };

  start(): void {
    this.connection.start();
  };

  chat(): void {
    this.connection.invoke('Chat', new ChatMessage('Hannes', this.message))
      .then((data) => {
      });
  };

  listenForMessages(): void {
    if (this.subscription != null) this.subscription.unsubscribe();
    // create listener
    let onMessageSent$ = new BroadcastEventListener<ChatMessage>(BroadcastEvents.ON_MESSAGE_SENT);
    // register the listener
    this.connection.listen(onMessageSent$);

    // subscribe to event
    this.subscription = onMessageSent$.subscribe((chatMessage: ChatMessage) => {
        this.chatMessages.push(chatMessage);
    });
  };

  observeStatus(): void {
    if (this.subscription2 != null) this.subscription2.unsubscribe();

    this.subscription2 = this.connection.status.subscribe((status: ConnectionStatus) => {
      this.statuses.push(status);
    });
  };

  observeErrors(): void {
    if (this.subscription3 != null) this.subscription2.unsubscribe();

    this.subscription3 = this.connection.errors.subscribe((error: any) => {
      this.errors.push(error);
    });
  };

}
