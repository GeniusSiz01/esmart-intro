import React from "react";
import BottomTabNavigation from "../components/BottomTabNavigation";
import History from "../components/History";

export default class HistoryScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <BottomTabNavigation />
                
                <History />
            </div>
        );
    }
}