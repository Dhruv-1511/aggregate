<?php
// $server = "sql301.epizy.com";
// $username = "epiz_33441775";
// $password = "wHtAYbENYKFO";
// $database = "epiz_33441775_XXX";

$server = "localhost";
$username = "root";
$password = "";
$database = "aggrotech";

// $con = mysqli_connect($server,$username,$password,$database);


// if(!$con){
//     die("Database connection error");
// }

// $server = "sql212.epizy.com";
// $username = "epiz_33494886";
// $password = "b2MjTdBOX7gC38";
// $database = "epiz_33441775_aggregate";



$con = mysqli_connect($server,$username,$password,$database);


if(!$con){
   die("Database connection error");
}

?>