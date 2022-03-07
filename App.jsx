import React, { Component } from "react";
import Header from "./Header";
import CompanyFilter from "./CompanyFilter";
import StatusSort from "./StatusSort";
import Table from "./Table";


export default class App extends Component {
    state = {
        id: 0,
        members: [],
        companies: [],
        status: {
            sorted: false,
            prevActive: false,
            nowActive: false
        }
    }

    handleCompanyFilter = (payload) => {
        let {checked} = payload;
        let members = [];
        let allVisible = checked.every(elem => elem === false);
        let visibleCompanies = [];

        if (checked[0] || allVisible) {
            // Set visible: true for all
            this.state.members.forEach((elem, idx) => {
                members[idx] = {
                    ...this.state.members[idx],
                    visible: true
                }
            });
        }
        else {
            this.state.companies.forEach((elem, idx) => {
                if (checked[idx + 1]) {
                    visibleCompanies.push(elem);
                }
            });
            this.state.members.forEach((elem, idx) => {
                members[idx] = {
                    ...this.state.members[idx],
                    visible: false
                }
                if (visibleCompanies.includes(elem.company)) {
                    members[idx].visible = true;
                }
            });
        }

        this.setState({
          members  
        });
    }

    handleDelete = (payload) => {
        let {id} = payload;
        let len = this.state.members.length;
        let members = [];
        let {companies} = this.state;
        let stateId = this.state.id;
        let companyCount = 0;
        let company = '';

        if (len === 1) {
            companies = [];
            this.setState({
                id: 0,
                members,
                companies
            });
        }
        else {
            members = this.state.members.filter(elem => {
                if (elem.id === id) {
                    company = elem.company;
                }
                if (elem.id > id) {
                    elem.id--;
                }
                return elem.id !== id;
            });
            this.state.members.forEach(elem => {
                if (elem.company === company) {
                    companyCount++;
                }
            });
            if (companyCount === 1) {
                let idx = companies.indexOf(company);
                companies = [...companies.slice(0, idx), ...companies.slice(idx + 1)];
            }
        }

        this.setState({
            id: stateId - 1,
            members,
            companies
        });
        
    }

    handleSave = (payload) => {
        let company = [];
        if (!this.state.companies.includes(payload.company)) {
            company.push(payload.company);
        }

        payload.id = this.state.id; // 'entry-' + this.state.id
        payload.visible = true;
        payload.lastUpdated = (new Date()).toLocaleDateString();

        this.setState(state => ({
            id: state.id + 1,
            members: [...state.members, payload],
            companies: [...state.companies, ...company]
        }));
    }

    handleStatusSort = (e) => {
        let len = this.state.companies.length;

        if (len > 0) {
            let type = e.target.id.split('-')[1];
            let {sorted} = this.state.status;
            let prevActive = this.state.status.nowActive;
            let nowActive = type === 'Active';
            let members = [];

            if (sorted && prevActive === nowActive) {
                // Unsort
                sorted = false;
                this.state.members.forEach(elem => {
                    members[elem.id] = {...elem}; // vs members[elem.id] = elem; ?
                })
            }
            else {
                sorted = true;
                let first = true;
                let second = false;
                let counter = 0;

                if (!nowActive) {
                    // Sort by 'Closed'
                    first = false;
                    second = true;
                }
                
                this.state.members.forEach((elem, idx) => {
                    if (elem.active === first) {
                        members[counter] = {...elem};
                        counter++;
                    }
                });
                this.state.members.forEach((elem, idx) => {
                    if (elem.active === second) {
                        members[counter] = {...elem};
                        counter++;
                    }
                }); 
            }

            this.setState({
                members,
                status: {
                    sorted,
                    prevActive: nowActive,
                    nowActive
                }
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header onSave={this.handleSave}/>
                <div id="options" className="row justify-content-start ps-2 py-2 mb-4">
                    <CompanyFilter companies={this.state.companies}
                                   onFilter={this.handleCompanyFilter}
                    />
                    <StatusSort onStatusSort={this.handleStatusSort}
                    />
                </div>
                <Table members={this.state.members}
                       onDelete={this.handleDelete}/>
            </React.Fragment>
        );
    }
}