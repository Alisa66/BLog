import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./login";
import AdminIndex from "./AdminIndex";
import ArticleList from "./ArticleList";
import AddArticle from "./AddArticle";
import Table from './Table'

function Main() {
    return (
        <Router>
            <Route path='/' exact component={Login}></Route>
            <Route path='/index/' exact component={AdminIndex}></Route>
            <Route path='/index/add' exact component={AddArticle}></Route>
            <Route path='/index/add/:id' exact component={AddArticle}></Route>
            <Route path='/index/list' exact component={ArticleList}></Route>
            <Route path='/index/table' exact component={Table}></Route>

        </Router>

    )
}

export default Main