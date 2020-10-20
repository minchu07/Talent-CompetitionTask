import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';

import {
  Pagination,
  Icon,
  Dropdown,
  Checkbox,
  Accordion,
  Form,
  Segment,
  Table,
  Card,
  Grid,
  Container,
  Label,
} from 'semantic-ui-react';
import { JobsDisplay } from './JobsDisplay.jsx';

export default class ManageJob extends React.Component {
  constructor(props) {
    super(props);
    let loader = loaderData;
    loader.allowedUsers.push('Employer');
    loader.allowedUsers.push('Recruiter');
    //console.log(loader)
    this.state = {
      loadJobs: [],
      loaderData: loader,
      //   activePage: 1,
      sortBy: {
        date: 'desc',
      },
      filter: {
        showActive: true,
        showClosed: false,
        showDraft: true,
        showExpired: true,
        showUnexpired: true,
      },
      filterOptions: [
        {
          key: 'Choose filter',
          text: 'Choose filter',
          value: 'Choose filter',
        },
        {
          key: 'showActive',
          text: 'showActive',
          value: 'showActive',
        },
        {
          key: 'showClosed',
          text: 'showClosed',
          value: 'showClosed',
        },
        { key: 'showExpired', text: 'showExpired', value: 'showExpired' },
      ],
      sortOptions: [
        {
          key: 'Newest first',
          text: 'Newest first',
          value: 'Newest first',
        },
        {
          key: 'Oldest first',
          text: 'Oldest first',
          value: 'Oldest first',
        },
      ],
      totalPages: 1,
      activeIndex: '',
      page: 1,
      itemsPerPage: 1,
    };
    this.loadData = this.loadData.bind(this);
    this.init = this.init.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    this.updateWithoutSave = this.updateWithoutSave.bind(this);
    this.setPageNum = this.setPageNum.bind(this);

    //your functions go here
  }

  setPageNum(event, { activePage }) {
    this.setState({ page: activePage });
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData }); //comment this

    //set loaderData.isLoading to false after getting data
    //this.loadData(() =>
    //    this.setState({ loaderData })
    //)

    //console.log(this.state.loaderData)
  }

  componentDidMount() {
    var cookies = Cookies.get('talentAuthToken');
    console.log('auth token' + cookies);
    this.loadData();
    // this.init();
  }

  loadData() {
    var cookies = Cookies.get('talentAuthToken');
    $.ajax({
      // url: 'http://localhost:51689/listing/listing/GetEmployerJobs',
      url:
        'https://talentservicetalent.azurewebsites.net/listing/listing/GetEmployerJobs',
      headers: {
        'Authorization': 'Bearer ' + cookies,
        'Content-Type': 'application/json',
      },
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res) {
        let jobs = null;
        if (res.myJobs) {
          jobs = res.myJobs;
          //console.log("employerData", employerData)
        }
        this.updateWithoutSave(jobs);
        console.log(res);
      }.bind(this),
      error: function (res) {
        //  console.log(res.status);
        console.log(res);
      },
    });
    this.init();
  }
  updateWithoutSave(newData) {
    //let newSD = Object.assign({}, this.state.loadJobs, newData);
    this.setState({
      loadJobs: newData,
    });
    console.log(this.state.loadJobs);
  }
  loadNewData(data) {
    var loader = this.state.loaderData;
    loader.isLoading = true;
    data[loaderData] = loader;
    this.setState(data, () => {
      this.loadData(() => {
        loader.isLoading = false;
        this.setState({
          loadData: loader,
        });
      });
    });
  }

  render() {
    //   const leftTags = this.props.data.map(x => this.buildNavElement(x))
    console.log(this.state.loadJobs);
    console.log('testing new app load');

    var data = this.state.loadJobs;
    const itemsPerPage = 2;
    const { page } = this.state;
    const totalPages = data.length / itemsPerPage;
    const items = data.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );
    console.log('items ' + items);

    const paginateddata =
      items == null
        ? null
        : items.map((x) => (
            <JobSummaryCard
              key={x.id}
              header={x.title}
              metaData={`${x.location.city} , ${x.location.country}`}
              description={x.summary}
            />
          ));
    console.log(paginateddata);

    return (
      <BodyWrapper loaderData={this.state.loaderData} reload={this.loadData}>
        <section>
          <div className="ui container">
            <div className="ui container">
              <div className="profile">
                <Grid>
                  <Grid.Row>
                    <h2>List of Jobs</h2>
                  </Grid.Row>
                  <div>
                    <Icon name="filter" />
                    Filter:
                    <Dropdown
                      inline
                      search
                      defaultValue={this.state.filterOptions[0].value}
                      options={this.state.filterOptions}
                    />
                    <Icon name="calendar alternate" />
                    Sort by date:
                    <Dropdown
                      inline
                      search
                      defaultValue={this.state.sortOptions[0].value}
                      options={this.state.sortOptions}
                    />
                  </div>
                  <Grid.Row>
                    {data === [] ? (
                      'No jobs Found'
                    ) : (
                      <JobsDisplay>{paginateddata}</JobsDisplay>
                    )}
                  </Grid.Row>
                  <Grid.Row centered>
                    <Pagination
                      activePage={page}
                      totalPages={totalPages}
                      siblingRange={1}
                      onPageChange={this.setPageNum}
                    />
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </section>
      </BodyWrapper>
    );
  }
}
