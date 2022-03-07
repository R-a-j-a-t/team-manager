import React, { Component } from "react";

export default class StatusSort extends Component {
    state = {
        showSortOptions: false,
        sortOptions: ['Active', 'Closed']
    };

    handleShowStatus = () => {
        this.setState(state => ({
            showSortOptions: !state.showSortOptions
        }));
    }

    render() {
        let statusSortList = this.state.sortOptions.map((elem, idx) => {
            return (
                <li key={idx} className="list-group-item">
                    <button className="btn btn-sm" onClick={this.props.onStatusSort} id={'sort-' + elem}>{elem}</button>
                </li>
            );
        })

        return (
            <div id="status-sort" className="col-auto">
                <button className="btn btn-outline-secondary"
                        onClick={this.handleShowStatus}>Status</button>
                { this.state.showSortOptions && <ul className="position-absolute list-group">{statusSortList}</ul> }
            </div>
        );
    }
}