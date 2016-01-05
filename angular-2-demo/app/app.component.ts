import {Component} from 'angular2/core';
import {TalkList} from './talk-list.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.template.html',
    directives: [TalkList]
})

export class AppComponent {
    constructor() {

    }
}
