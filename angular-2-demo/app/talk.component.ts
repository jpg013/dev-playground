import {Component} from 'angular2/core';

@Component({
  selector: 'talk-cmp',
  //directives: [FormattedRating, WatchButton, RateButton],
  templateUrl: 'talk.template.html'
})
class TalkCmp {
  //@Input() talk: Talk;
  //@Output() rate: EventEmitter

  onChange(changes) {
    console.log("Some changes here");
  }
}
