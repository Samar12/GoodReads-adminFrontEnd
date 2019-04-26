import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import UpperNavBar from "./components/Navbar/upperNav";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import AdminHome from "./components/Admin/Home/adminHome";
import { categories, myBooks, authors } from "./data/data";

export const MyContext = React.createContext();
class App extends React.Component {
  state = {
    Categories: {
      header: ["ID", "Name", "Action"],
      body: categories
    },
    Authors: {
      header: ["ID", "Photo", "Name", "DateOfBirth", "Action"],
      body: authors
    }
  };
  deleteCategory = id => {
    const deletedCat = this.state.Categories.body.filter(c => c.id !== id);
    this.setState({ Categories: { header: ["ID", "Name", "Action"], body: deletedCat } });
  };

  addCategory = Category => {
    const { body } = this.state.Categories;
    this.setState({
      Categories: {
        ...this.state.Categories,
        body: body.concat(Category)
      }
    });
  };
  EditCategory = (CatID, CatN) => {
    const category = this.state.Categories.body.find(c => c.id === CatID);
    category.name = CatN;
  };
  searchCategory = name => {
    const { Categories } = this.state;
    let result = false;
    for (var i = 0; i < Categories["body"].length; i++) {
      if (Categories.body[i].name.toLowerCase() === name.toLowerCase()) {
        result = true;
      }
    }
    return result;
  };

  // //////////////////////////////////////////////////////////////////////////////////////////

  deleteAuthor = id => {
    const deletedAuthorId = this.state.Authors.body.filter(a => a.id !== id);
    this.setState({ Authors: { header: ["ID", "Photo", "Name", "DateOfBirth", "Action"], body: deletedAuthorId } });
  };

  addAuthor = author => {
    const { body } = this.state.Authors;
    this.setState({
      Authors: {
        ...this.state.Authors,
        body: body.concat(author)
      }
    });
  };
  editAuthor = (id, name) => {
    const author = this.state.Authors.body.filter(e => e.id != id);
    author[0].name = name;
  };

  searchAuthor = name => {
    const { Authors } = this.state;
    let result = false;
    for (var i = 0; i < Authors.length; i++) {
      if (Authors.body[i].name.toLowerCase()) {
        result = true;
      }
    }
    return result;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const value = {
      state: this.state,
      addCategory: this.addCategory,
      deleteCategory: this.deleteCategory,
      editCategory: this.EditCategory,
      searchCategory: this.searchCategory,
      addAuthor: this.addAuthor,
      deleteAuthor: this.deleteAuthor,
      editAuthor: this.editAuthor,
      searchAuthor: this.searchAuthor,
      MyCategories: categories,
      myBooks: myBooks,
      authors: authors
    };

    return (
      <MyContext.Provider value={value}>
        <div className="App" id="App">
          <Router>
            <UpperNavBar />
            <>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />

                <Route path="/admin" exact component={AdminHome} />
              </Switch>
            </>
          </Router>
        </div>
      </MyContext.Provider>
    );
  }
}

export default App;
