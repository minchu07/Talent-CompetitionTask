import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Button, Label, Icon, Grid } from 'semantic-ui-react';
import moment from 'moment';
import { JobsDisplay } from './JobsDisplay.jsx';

export class JobSummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: 3 };
    this.selectJob = this.selectJob.bind(this);
  }

  selectJob(id) {
    var cookies = Cookies.get('talentAuthToken');
    //url: 'http://localhost:51689/listing/listing/closeJob',
  }

  render() {
    return (
      // <div class="ui cards">
      // <div class="ui card ">
      //   <div class="content ">
      //     <a class="ui black ribbon label small left">
      //       <i aria-hidden="true" class="user icon"></i>0
      //     </a>
      //     <div class="header">{this.props.header}</div>
      //     <div class="meta">{this.props.metaData}</div>
      //     <div class="description">{this.props.description}</div>
      //   </div>
      //   <div class="extra content">
      //     <div class="ui two buttons">
      //       <button class="ui green basic button ">Approve</button>
      //       <button class="ui red basic button ">Decline</button>
      //     </div>
      //   </div>
      // </div>

      <Card style={{ height: '300px', width: '400px' }}>
        <Card.Content>
          <Card.Header>{this.props.header}</Card.Header>
          <Label ribbon="right" color="black">
            <Icon name="user"></Icon>0
          </Label>
          <Card.Meta>{this.props.metaData}</Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Button compact floated="left" color="red">
              Expired
            </Button>
            <Button.Group compact basic color="blue" floated="right">
              <Button>
                <Icon name="dont" />
                Close
              </Button>
              <Button>
                <Icon name="edit outline" />
                Edit
              </Button>
              <Button>
                <Icon name="copy outline" />
                Copy
              </Button>
            </Button.Group>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
