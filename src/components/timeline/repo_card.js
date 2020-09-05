import * as React from 'react';
import * as moment from 'moment';

export function RepoCard({ props }) {
    let trimmed_name = (name) => {

        if(name.length > 18) {
            return name.toLowerCase().slice(0, 15)+"...";
        }
        return name.toLowerCase().slice(0, 18)
    }
  return (
        <li id={props.id}>
          <div className={props.className}>
            <div className="flag-wrapper">
              <span className="flag">{trimmed_name(props.name)}</span>
              <span className="time-wrapper"><span className="time">{moment(props.created_at).format("MMM-YY")} - {moment(props.updateded_at).format("MMM-YY")}</span></span>
            </div>
            <div className="desc">{props.description}</div>
          </div>
        </li>
    );
}
