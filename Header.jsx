import React, { Component } from "react";

export default class Header extends Component {
    state = {
        name: '',
        company: '',
        active: true,
        notes: '',
        showModal: false
    };

    handleShowModal = () => {
        this.setState(state => ({
            showModal: !state.showModal,
            name: '',
            company: '',
            active: true,
            notes: ''
        }));
    }

    handleDismissModal = () => {
        this.setState(state => ({
            showModal: false,
            name: '',
            company: '',
            active: true,
            notes: ''
        }));
    }

    handleSave = (e) => {
        let {name, company, notes, active} = this.state;

        if (!(name.trim() && company.trim() && notes.trim())) {
            e.preventDefault();
        }
        else {
            let payload = {
                name,
                company,
                active,
                notes
            };
            this.props.onSave(payload);
            this.handleDismissModal(); // Is this reachable -> Yes!
        }
    }

    setName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    setCompany = (e) => {
        this.setState({
            company: e.target.value
        });
    }

    setNotes = (e) => {
        this.setState({
            notes: e.target.value
        });
    }

    setStatus = (e) => {
        this.setState({
            active: e.target.value === "true"
        });
    }

    render() {
        return (
            <div id="header" className="row justify-content-start mb-2 ps-2 bg-light">
                <h1 className="col-auto align-self-center py-3 mb-2">Team Manager</h1>
                <div className="col-auto align-self-center">
                    <button className="btn btn-primary btn-sm ps-3 rounded-pill" 
                            onClick={this.handleShowModal}>Add Members +</button>
                </div>
                {
                    this.state.showModal &&
                    <div id="modal" className="position-absolute start-0 bg-dark bg-opacity-75 w-100 vh-100">
                        <div id="modal-form" className="container-fluid bg-white mt-4 py-4 rounded w-75">
                            <div className="row justify-content-around mb-2 py-4">
                                <h5 className="col-8 fs-3">Add Member</h5>
                                <button className="btn btn-close col-1" onClick={this.handleDismissModal}></button>
                            </div>
                            <div className="row justify-content-center mb-2 py-2">
                                <label className="col-2" htmlFor="modal-name">Name: </label>
                                <input className="col-8" type="text" required id="modal-name"
                                    value={this.state.name}
                                    onChange={this.setName}/>
                            </div>

                            <div className="row justify-content-center mb-2 py-2">
                                <label className="col-2" htmlFor="modal-company">Company: </label>
                                <input className="col-8" type="text" required id="modal-company"
                                    value={this.state.company}
                                    onChange={this.setCompany}/>
                            </div>

                            <div className="row justify-content-center mb-2 py-2">
                                <label className="col-2" htmlFor="modal-status">Status: </label>
                                <div className="col-8 px-0">
                                    <select className="form-select text-center" required id="modal-status"
                                            onChange={this.setStatus}>
                                        <option value="true">Active</option>
                                        <option value="false">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row justify-content-center mb-2 py-2">
                                <label className="col-2" htmlFor="modal-notes">Notes: </label>
                                <input className="col-8" type="text" required id="modal-notes"
                                    value={this.state.notes}
                                    onChange={this.setNotes}/>
                            </div>

                            <div className="row justify-content-end mb-2 me-5 py-4">
                                <button className="btn btn-danger col-2 me-2" onClick={this.handleDismissModal}>Cancel</button>
                                <button className="btn btn-success col-2 me-4" onClick={this.handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}