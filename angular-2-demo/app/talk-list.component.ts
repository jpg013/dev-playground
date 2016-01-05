import {Component} from 'angular2/core';

@Component({
  selector: 'talk-list',
  templateUrl: 'app/talk-list.template.html'
})

export class TalkList {
    public talks = [];

    constructor() {
        this.talks = [
            {name: 'test talksXX'}
        ]
    }
}
