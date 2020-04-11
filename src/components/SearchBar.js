import React, {Component} from "react";
import TeamItem from "./TeamItem";
//import './Sidebar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: [],
            biobricks : false
        }
        this.master = this.props.master;
        // this.teams = this.props.team_struture;
        // this.biobricks = this.props.biobricks_struture;

        this.handleOnClick = this.handleOnClick.bind(this);
    };

    handleOnClick(e) {
        e.preventDefault();
        console.log("clicked search button " + this.state.search);
        this.master.clickMaster();
    }

    formQuery() {
    }

    onInputChange(event) {
        this.setState({
            search: event.target.value.toString().toLowerCase()
                // .toString().substr(0,20)
        })
        // "name":[{"contain":false, "value": "2"}, {"contain":true, "value": "team"}],
        //     "year":[{"contain":true, "value": "2020"}]
        const query = {
            name:[{contain:false, value: "2"}, {contain:true, value: "team"}],
            year:[{contain:true, value: 2020}]
        }
        console.log("Handling query: " + JSON.stringify(query, ' ', 4))
        fetch("http://localhost:3001/teams/match", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)})
            .then(response => response.json())
            .then(responseData => {
                console.log("Response: " + JSON.stringify(responseData, ' ', 4))
                this.setState({
                    results: responseData.map(item => ({
                        title: item.title,
                        wiki: item.wiki,
                        year: item.year,
                        description: item.abstract,
                    }))
                })
            })
    }

    render() {
        const filteredTeams = this.props.items
            .filter( item => item.toString().toLowerCase().includes(this.state.search.toLowerCase())
            );

        // This function maps TeamItem Component to every search result object
        const teamComponents = filteredTeams.map(item => {
                return (
                    <TeamItem key={item.id} item={item}/>
                )
            }
        );

        // //if (this.state.biobricks) {
        // const biobricks = this.biobricks.map(el => {
        //         return (
        //             <div className="selectName">
        //                 <label>{el} : </label> <input type="checkbox" name={el} checked={true}/>
        //             </div>
        //         )
        //     })
        // //} else {
        // const teams = this.teams.map(el => {
        //         return (
        //             <div className="selectName">
        //                 <label>{el} : </label> <input type="checkbox" name={el} checked={true}/>
        //             </div>
        //         )
        //     })
        // //}
        // const checks = (() => {if(this.state.biobricks) {return biobricks} else {return teams} })();

        return (
            <div>
                <form className="form">
                    <input
                        className="search"
                        type="text"
                        value={this.state.search}
                        placeholder="Search for teams..."
                        onChange={this.onInputChange.bind(this)}/>
                    {/*<div>{checks}</div>*/}
                    <button
                        className="btn-search"
                        type="submit"
                        onClick={this.handleOnClick}>
                        BioBricks
                    </button>
                    <button
                        className="btn-search"
                        type="submit"
                        onClick={this.handleOnClick}>
                        Search
                    </button>
                </form>
                <div>
                    {console.log(this.state.results)}

                    {/*{teamComponents}*/}
                </div>
            </div>
        )
    }

}

export default SearchBar