import React from "react";

export default class ABOUT extends React.Component {
  // render
  render() {
    return (
      <section id="about" className="py-5 text-center bg-white">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="info-header mb-5">
                <h1 className="text-primary pb-3">
                  About the project
                </h1>
                <p className="lead pb-3 text-secondary">
                  This project includes all original works of team 37 for Assignment 2 (COMP90024 Cluster and cloud computing), which is about building corroboratory instances on Nectar research cloud and based on which we retrieve information from Twitter in cities across Australia. Finally, we would analyse these data combined with data from the AURIN platform, in order to dig out interesting stories, particularly in the scenario of Gluttony, one of the seven deadly sins.
                </p>
              </div>

              <div id="accordion">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0 text-secondary">
                      <div href="#collapse1" data-toggle="collapse" data-parent="#accordion">
                        <i className="fas fa-arrow-circle-down"></i> CouchDB
                      </div>
                    </h5>
                  </div>

                  <div id="collapse1" className="collapse show">
                    <div className="card-body text-secondary">
                      CouchDB is selected for implementing the system, where multi-instances across nectar cloud would work cooperatively to crawl data together. These instances’ couchdbs are in the same cluster and the data are stored in a duplicated way, which means any node’s failing will not influence the safety of the whole system. Also, CouchDB cluster has a natural of transparency, namely application could fetch or upload data on any of the instances, without knowing where exactly the data are stored.
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header text-secondary">
                    <h5 className="mb-0">
                      <div href="#collapse2" data-toggle="collapse" data-parent="#accordion">
                        <i className="fas fa-arrow-circle-down"></i> Tweets Harvester & Processing
                      </div>
                    </h5>
                  </div>

                  <div id="collapse2" className="collapse">
                    <div className="card-body text-secondary">
                    In this part, we plan to harvest tweets which are related to foods (Gluttony) from 4 Australian cities (Sydney, Melbourne, Brisbane and Perth). 4 harvesting programs will be running at 4 instances at the same time.
                    When harvesting tweets, we need to analyse whether it is related to our topic (Gluttony). We assume that only if there is a food related word in text of this tweet, it is a gluttony-related tweet. Following this idea, we built a food list that includes 1100+ food-related words. Furthermore, we processes the original text to achieve a higher accuracy. After recognizing these food-related word, they will be recorded as an list of word and be a new attributes “foods” in this tweet. If there is no food-related words been found, “foods” will be an empty list.
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header text-secondary">
                    <h5 className="mb-0">
                      <div href="#collapse3" data-toggle="collapse" data-parent="#accordion">
                        <i className="fas fa-arrow-circle-down"></i> MapReduce
                      </div>
                    </h5>
                  </div>

                  <div id="collapse3" className="collapse">
                    <div className="card-body text-secondary">
                      We apply mapReduce functions to generate views, in order to retrieve relevant information we demand from couchdb. Map functions is to allocate certain information into database and reduce function is to gather required information and generate a view for front end website to use.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
