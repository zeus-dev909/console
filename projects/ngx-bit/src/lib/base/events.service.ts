import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class EventsService {
  private events: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  publish(topic: string, args?: any) {
    if (this.events.has(topic)) {
      const topics = this.events.get(topic);
      topics.next(args !== undefined ? args : null);
    } else {
      this.events.set(topic, new Subject()).get(topic).next(args);
    }
  }

  on(topic: string): Observable<any> {
    if (this.events.has(topic)) {
      return this.events.get(topic);
    } else {
      return this.events.set(topic, new Subject()).get(topic);
    }
  }

  off(topic: string) {
    if (this.events.has(topic)) {
      const topics = this.events.get(topic);
      topics.unsubscribe();
      this.events.delete(topic);
    }
  }
}