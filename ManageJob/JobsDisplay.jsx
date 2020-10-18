import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Container, Grid } from 'semantic-ui-react';
import moment from 'moment';

export class JobsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: 2 };
    this.selectJob = this.selectJob.bind(this);
  }

  selectJob(id) {
    var cookies = Cookies.get('talentAuthToken');
    //url: 'http://localhost:51689/listing/listing/closeJob',
  }

  render() {
    return (
      <section className="page-body">
        <div className="ui container fluid">
          <Grid>
            <Grid.Column>
              <div>
                <Card.Group
                  stackable={true}
                  doubling={true}
                  //   itemsPerRow={this.state.items}
                  //   items={this.props.item}
                >
                  {this.props.children}
                </Card.Group>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </section>
    );
  }
}
