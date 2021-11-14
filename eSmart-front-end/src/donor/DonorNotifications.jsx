import React from "react";
import io from "socket.io-client";

const socket = io.connect('/');
export default class DonorNotifications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        socket.emit("notifications","Hello eSmart");
    }

    render() {
        return (
            <div className='center'>
                <h3>Notifications</h3>
                {/* {this.renderNotifications()} */}
                {/* {this.renderModal()} */}
            </div>
        );
    }
}