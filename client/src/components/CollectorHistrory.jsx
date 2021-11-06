import React from "react";
import { List, Image, Feed, Icon, Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import userAvatar from '../collectorAvatar.jfif';
import HistoryHeader from "./HistoryHeader";
import binAvater from '../esmartbin.png';
import axios from 'axios';

export default class CollectorHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: []
        }
    }

    componentDidMount() {
        // axios.get()
    }

    render() {
        return (
            <div className='container'>
                {/* <HistoryHeader /> */}
                <h5 className='center'>Welcome to history</h5>
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User> <a href="#">Jason Gama</a> </Feed.User> donor
                                <Feed.Date> <span> 1 Hour Ago</span></Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra >
                                {/* Collected 4 bins for Londiwe Biyela */}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Rating icon='star' defaultRating={0} maxRating={5} />
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image={userAvatar} />
                        <Feed.Content>
                            <Feed.Summary>
                                <a href='#'>Sibusiso Nkosi</a> donor <a></a>
                                <Feed.Date>4 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra >
                                {/* Collected 4 bins for Londiwe Biyela */}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Rating icon='star' defaultRating={0} maxRating={5} />
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <Feed.Content>
                            <Feed.Summary>
                                <a href='#'>Mthabiseng Mpapa</a> donor <a></a>
                                <Feed.Date>30 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra >
                                {/* Collected 4 bins for Londiwe Biyela */}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Rating icon='star' defaultRating={0} maxRating={5} />
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/justen.jpg' />
                        <Feed.Content>
                            <Feed.Summary>
                                <a href='#'>Khuzwayo</a> donor <a></a>
                                <Feed.Date>15 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra >
                                {/* Collected 4 bins for Londiwe Biyela */}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Rating icon='star' defaultRating={0} maxRating={5} />
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>

            </div>
        );
    }
}