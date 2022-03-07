import React, { Component } from "react";

export default class Table extends Component {

    state = {
        selectAll: false,
        selectCount: 0,
        checked: []
    };

    handleSelectAll = () => {
        let {checked, selectAll, selectCount} = this.state;
        let len = checked.length;
        selectAll = !selectAll;

        for (let i = 0; i < len; i++) {
            checked[i] = selectAll;
        }

        selectCount = 0;
        if (selectAll) {
            selectCount = len;
        }

        this.setState({
            checked,
            selectAll,
            selectCount
        });
    }

    handleSelectOne = (e) => {
        let len = this.props.members.length;
        let {selectCount, selectAll} = this.state;
        let {checked} = this.state;
        let elemChecked = e.target.checked;
        let id = e.target.id;
        
        if (checked.length !== len) {
            for (let i = 0; i < len; i++) {
                if (checked[i] === undefined) {
                    checked[i] = false;
                }
            }
        }

        if (elemChecked) {
            selectCount++;
            if (id === 'table-select-all' || selectCount === len) {
                selectCount = len;
                selectAll = true; // Must set all elem.checked to true;
                for (let i = 0; i < len; i++) {
                    checked[i] = true;
                }
            }
            else {
                id = +( id.match(/[0-9]+/)[0] ); // Must set elem.id's elem.checked to true
                selectAll = false; // Redundant?
                checked[id] = true;
            }
        }
        else {
            selectAll = false;
            selectCount--;
            if (id === 'table-select-all') {
                selectCount = 0; // Must set all elem.checked to false
                for (let i = 0; i < len; i++) {
                    checked[i] = false;
                }
            }
            else {
                id = +( id.match(/[0-9]+/)[0] ); // Must set elem.id's elem.checked to false
                checked[id] = false;
            }
        }
        
        this.setState({
            selectAll,
            selectCount,
            checked
        });
    }

    buildTableList = (elem, idx) => {
        return (
            elem.visible &&
            <tr key={idx}>
                <td>
                    <input type="checkbox" id={'entry-' + elem.id}
                        checked={this.state.selectAll || (this.state.checked[elem.id] === undefined ? false : this.state.checked[elem.id])}
                        onChange={this.handleSelectOne} />
                </td>
                <td>{elem.name}</td>
                <td>{elem.company}</td>
                <td>{elem.active ? 'Active' : 'Closed'}</td>
                <td>{elem.lastUpdated}</td>
                <td>{elem.notes}</td>
                <td><button className="btn btn-close" id={'delete-'+elem.id} onClick={this.onDeleteEntry}></button></td>
            </tr>
        );

    }

    onDeleteEntry = (e) => {
        let len = this.props.members.length;
        let {checked, selectCount} = this.state;
        let id = + e.target.id.split('-')[1];

        if (checked.length !== len) {
            for (let i = 0; i < len; i++) {
                if (checked[i] === undefined) {
                    checked[i] = false;
                }
            }
        }
        
        if (e.target.checked) {
            selectCount--;
        }
        checked = [...checked.slice(0, id), ...checked.slice(id + 1)];
        
        this.setState({
            checked,
            selectCount
        });
        // Call to delete elem from this.props.members and set elems'id after elem to id--
        let payload = {
            id
        };
        this.props.onDelete(payload);
    }

    render() {
        let len = this.props.members.length;
        let tableList = len > 0 ? this.props.members.map(this.buildTableList) : <tr></tr>;

        return (
            <div id="table" className="row">
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="table-select-all"
                                       checked={this.state.selectAll}
                                       onChange={this.handleSelectAll}/>
                            </th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{tableList}</tbody>
                </table>
            </div>
        );
    }
}