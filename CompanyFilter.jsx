import React, { Component } from "react";

export default class CompanyFilter extends Component {
    state = {
        checked: [],
        filterCount: 0,
        showFilters: false,
        selectAll: false
    }

    handleShowFilters = () => {
        let len = this.props.companies.length;
        
        if (len > 0) {
            len += 1;
            let vals = [...this.state.checked];
            
            for (let i = 0; i < len; i++) {
                if (this.state.checked[i] === undefined) {
                    vals[i] = false;
                }
            }
            this.setState(state => ({
                showFilters: !state.showFilters,
                checked: vals
            }));
        }
        else {
            this.setState({
                showFilters: false
            });
        }
    }

    handleFilter = (e) => {
        let {filterCount, selectAll, checked} = this.state;
        let id = +(e.target.id.match(/[0-9]+/)[0]);
        
        if (!e.target.checked) { // Unchecked now
            
            if (selectAll) {
                filterCount--;
            }

            selectAll = false;
            checked[0] = false;
            
            if (id === 0) {
                checked = checked.map(e => false);
                filterCount = 0;
            }
            else {
                checked[id] = false;
                filterCount--;
            }
        }
        else { // Checked now
            checked[id] = true;
            filterCount++;
            selectAll = false;

            if (id === 0 || filterCount === this.props.companies.length) {
                checked = checked.map(e => true);
                selectAll = true;
                filterCount = this.props.companies.length + 1;
            }
            
        }

        let payload = {
            checked: [...checked]
        };
        this.props.onFilter(payload);
        
        this.setState(state => ({
            checked,
            filterCount,
            selectAll
        }));
    }

    buildCompaniesList = (elem, idx) => {
        let {selectAll, checked} = this.state;
        return (
            <li key={idx} className="list-group-item" >
                <input type="checkbox" id={"company-"+elem+"-"+idx}
                       className="form-check-input"
                       onChange={this.handleFilter}
                       checked={selectAll || checked[idx]}
                />&nbsp;&nbsp;
                <label htmlFor={"company-"+elem}>{elem}</label>
            </li>
        );
    }

    render() {
        let len = this.props.companies.length;
        let companiesList = null;

        if (len > 0) {
            companiesList = ['Select All', ...this.props.companies];
            companiesList = companiesList.map(this.buildCompaniesList);
        }

        return (
            <div id="company-filter" className="col-auto">
                <button className="btn btn-outline-secondary"
                        onClick={this.handleShowFilters}>Company({len})</button>
                { this.state.showFilters && <ul className="position-absolute list-group">{companiesList}</ul> }
            </div>
        );
    }
}