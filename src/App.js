import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import UpperNavBar from "./components/Navbar/upperNav";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import AdminDashBoard from "./components/Admin/Home/AdminDashBoard";
import { categories, myBooks, authors } from "./data/data";
import {AuthorInfo,DeleteAuthorInfo,AddNewAuthor,EditAuthorInfo} from './API/Author';
import {CategoryiesInfo,AddNewCategory,DeleteCategoryInfo,EditCategoryInfo} from './API/Categories';

export const MyContext = React.createContext();
class App extends React.Component {
  state = {
    Categories : {
      th: ['ID', 'Name','Action'],
      tbody: [
        // {ID:1,Name: 'Engineering',deleted:false},
        // {ID:2,Name: 'discover',deleted:false}         
   ]},
   Books : {
    th: ['ID', 'photo','Name','CategoryId','AuthorId','Action'],
    tbody: [
      // {ID:1,photo: 'https://greenido.files.wordpress.com/2017/11/ray-dalio-principles-angled-book-ab1a2ff6c873144e545e21f9827a99a14d71bc635f6505ec17ee17bdf59ec742.png',Name:'Animals',CategoryId:1,AuthorId:1,deleted:false , description: "description Book 111111"},
      // {ID:2,photo: 'https://greenido.files.wordpress.com/2017/11/ray-dalio-principles-angled-book-ab1a2ff6c873144e545e21f9827a99a14d71bc635f6505ec17ee17bdf59ec742.png',Name:'Building',CategoryId:2,AuthorId:2,deleted:false , description: "description Book 2222"},
      // {ID:3,photo: 'https://greenido.files.wordpress.com/2017/11/ray-dalio-principles-angled-book-ab1a2ff6c873144e545e21f9827a99a14d71bc635f6505ec17ee17bdf59ec742.png',Name:'Programming',CategoryId:3,AuthorId:3,deleted:false , description: "description Book 33333"},             
 ]
},
    Authors: {
      th:['ID' , 'photo' , 'FirstName' , 'LastName' , 'DateOfBirth', 'Action'],

      tbody: []
    }
  };
 

//-------------Books------------------------------//

 
//---------------Categories---------------------------//
AddCategory=(Category)=>{
AddNewCategory(Category,this);
}

DeleteCategory=(CategoryID)=>{
DeleteCategoryInfo(CategoryID,this);
}
  
EditCategory=(CategoryID, NewValues)=>{
EditCategoryInfo(CategoryID,NewValues,this);
}



  // -----------Author----------------------------------//


  componentDidMount(){
    CategoryiesInfo(this);
    AuthorInfo(this);
  }
  AddNewAuthor=(Author)=>{
    AddNewAuthor(Author,this)
  }
  
  EditAuthor=(AuthorID, NewValues)=>{
  EditAuthorInfo(AuthorID,NewValues,this);
  }
  
  DeleteAuthor=(AuthorID)=>{
  DeleteAuthorInfo(AuthorID,this);
  }
  
  // /////////////////////////////////////////////////////////////////////////////////////////


  render() {
    const value = {
      state: this.state,
      // addCategory: this.addCategory,
      // deleteCategory: this.deleteCategory,
      // editCategory: this.EditCategory,
      // searchCategory: this.searchCategory,
      
      AddNewAuthor:this.AddNewAuthor,
      EditAuthor:this.EditAuthor,
      DeleteAuthor:this.DeleteAuthor,

     
      AddCategory:this.AddCategory,
      DeleteCategory :this.DeleteCategory,
      EditCategory:this.EditCategory,


      // MyCategories: categories,
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
                <Route path="/Admin" exact component={AdminDashBoard} />

              </Switch>
            </>
          </Router>
        </div>
      </MyContext.Provider>
    );
  }
}

export default App;
