import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    query: "",
  };
  handleQueryChange = (event) => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  handleQuerySubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;

    if (query.trim() === "") {
      return toast.error("введите запрос");
    }

    this.props.onSubmit(query);

    this.setState({ query: "" });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleQuerySubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
