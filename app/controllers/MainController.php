<?php

namespace app\controllers;

use app\core\Controller;

class MainController extends Controller
{

    public function homepage()
    {
               // include '../public/assets/views/main/homepage.php';
       $this->view('../public/assets/views/main/homepage.php', true);
    }


    public function browse ()
    {
                include  '../public/assets/views/browse/recipes.php';
                exit();
    }

    public function recipes ()
    {
                include  '../public/assets/views/browse/recipes.php';
                exit();
    }


    public function favorites()
    {
                include '../public/assets/views/browse/favorites.php';
                exit();
    }



    public function newRecipes()
    {
                include '../public/assets/views/browse/newRecipes.php';
                exit();

    }



    public function contacts()
    {
                include '../public/assets/views/contacts/contacts.php';
                exit();
    }


    public function sharing ()
    {
                include '../public/assets/views/share/sharing.php';
                exit();
    }

    public function ingredients()
    {
                include '../public/assets/views/ingredients/ingredients.php';
                exit();
    }

   
/*
    public function notFound()
    {
        include '../public/assets/views/notFound.php';
        exit();
    }
    */

}

?>