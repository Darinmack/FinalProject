<?php

namespace app\models;
namespace app\core;

Trait Contact
{
    use Database;
/*
    public function findAll()
    {
        $query = "select * from $this->table";
        return $this->query($query);
    }

    */

// Save a new post
public function saveContact($inputData)
{
    $query = "insert into feed (name, email, feedback) values (:name, :email, :feedback)";
    return $this->queryWithParams($query, $inputData);
}

public function theNewRecipes($inputData)
{
    $query = "insert into newrecipes (name, email, feedback) values (:name, :email, :feedback)";
    return $this->queryWithParams($query, $inputData);
}

public function saveFavoriteRecipe($inputData)
{
    $query = "insert into favorites (name, category) values (:name,  :category)";
    return $this->queryWithParams($query, $inputData);
}


}